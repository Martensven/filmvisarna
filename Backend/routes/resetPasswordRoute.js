import bcrypt from "bcrypt"
import sendMail from "./../nodemailer/sendMail.js";
import { User } from "./../models/userSchema.js";
import { validateData } from "../middleware/dataValidation.js";
import express from "express";
import crypto from "crypto";


const router = express.Router();
//Router endpoint for forgotten password
router.post("/api/forgotPass", async (req, res) => {
    const {email} = req.body;
    try{
        console.log("Begäran om lösenordsåterställning för:", email);
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({error: "Finns ingen användare med den mailadressen"});

        const firstName = user.firstName

        const generateToken = crypto.randomBytes(32).toString("hex");

        //Save the new token and also make the token expire after 15 min. 
        user.resetPasswordToken = generateToken;
        user.resetPasswordExpire = Date.now()+15*60*1000;
        await user.save();

        const resetPassLink = `http://localhost:5173/forgotPass/${generateToken}`;
        
        await sendMail({
            to: email,
            subject: "Filmvisarna - Återställning av lösenord",
            html: `
               <table align="center" width="600" cellpadding="0" cellspacing="3" style="font-family: Arial, serif; padding:10px;">
              <tr>
                <td style="background-color: #243365; padding:5px; border-radius:5px;" 
                width="600" height="120" align="left">
          
                  <img src="cid:logo" alt="Filmvisarnas logga" width="150" style="margin:10px 20px 2px 20px;" > 
                  <h2 style="color:white; font-size:20px; margin:1px 20px 10px 20px;" align="center">Lösenords återställning</h2>
           
                </td>
              </tr>

              <tr>
                <td style="color:white; text-align:center; padding:5px; background-color: #243365; border-radius:5px;">
                  <h2 style="margin:3px;">Hej ${firstName}! 🙂</h2>
                  <p style="margin-top:1px;">Du har bett om en återställningslänk av ditt lösenord</p>

                  <table align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #9ca6c7ff; border:2px solid #243365; border-radius:5px; margin:20px 20px; padding:10px;">
                    <tr>
                      <td style="color: #0d1325ff; text-align:center; padding:10px;">
                        <h2 style="text-align:center; margin: 0;">Här är din länk:</h2>
                        <a style="text-decoration:none; color:white;" href="${resetPassLink}"></strong>${resetPassLink}<strong></a>
                
         
                        <p>Klicka på den så omdirigeras du till att byta lösenord</p>
                        
                    
                        <p style="font-size:13px;">Kontakta oss om återställningen inte fungerar.</p>
                      </td>
                    <tr>
                  </table>    

                  <table cellpadding="0" cellspacing="0" style="color:white; margin:20px auto 25px auto;" align="center">
                    <tr>
                      <td align="center">
                        <h1 style="font-size:25px; margin:3px;">Filmvisarna</h1>
                        <h3 style="font-size:20px; margin:2px 0px;">Kontakt</h3>
                        <p style="font-size:15px; margin:2px;">Epost: info@filmvisarna.se</p>
                        <p style="font-size:15px; margin:2px;">Telefon: 123-456 78 90</p>
                        <p style="font-size:15px; margin:2px;">Adress: Biogatan 1, 123 45, Filmstaden</p>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>
            </table>
            `,
            attachments: [
          {
            filename: "LoggoMail.png",
            path: "./assets/LoggoMail.png",
            cid: "logo",
          },
        ],
        });
        res.json({message: "Länk för återställning av lösenord har skickats till användaren", email:user.email});
        console.log("mejl har skickats iväg till: ", user.email)
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Kunde inte skicka"})
    }
});

//endpoint for changing password with token 
router.post("/api/forgotPass/:token",
    validateData(["password"], {password:"string"}, 
    "body",{password: (val) => val.length < 8 ? "Lösenordet måste vara minst 8 tecken" : null,}), async (req, res) => {

    const {token} = req.params;
    const { password } = req.body;
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(req.body.password, saltRounds);

    try{
        const user = await User.findOne({
            resetPasswordToken: token, 
        });

        if(!user) return res.status(400).json({error: "Token ogiltig"});

        if(user.resetPasswordExpire < Date.now()) {
          return res.status(400).json({ error: "Återställningslänk har gått ut, begär om en ny länk på <strong>Glömt Lösenord</strong>"})
        }

        user.password = hashedPass;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.json({message: "Lösenordet har ändrats"});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Kunde inte ändra löenordet"})
    }
})

router.get("/api/forgotPass/validate/:token", async (req, res) => {
  const { token } = req.params;

    try{
      const user = await User.findOne({ resetPasswordToken: token });

      if(!user) {
        return res.status(400).json({error: "Ogiltig återställningslänk"});
      }

      if(user.resetPasswordExpire < Date.now()) {
        return res.status(400).json({ error: "Återställningslänken har gått ut. Begär en ny"})
      }

      return res.json({message: "Token är giltig"});
    } catch (err) {
      console.error(err);
      res.status(500).json({error: "Serverfel"})
    }
})

export default router