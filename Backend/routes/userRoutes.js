import {User}  from "../models/userSchema.js";
import express from "express";
import { validateData } from "./../middleware/dataValidation.js";
import bcrypt from "bcrypt";
import sendMail from "../nodemailer/sendMail.js";

const router = express.Router();

// post a new user
router.post(
  "/api/users",
  validateData(
    ["email", "password", "firstName", "lastName", "phoneNumber"],
    {
      email: "string",
      password: "string",
      firstName: "string",
      lastName: "string",
      phoneNumber: "number",
    },
    "body",
    {
      firstName: /^[A-Za-zÅÄÖåäö\s-]+$/,
      lastName: /^[A-Za-zÅÄÖåäö\s-]+$/,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      password: (val) =>
        val.length < 8 ? "Lösenordet måste vara minst 8 tecken" : null,
    }
  ),
  async (req, res) => {
    try {
      // Hashes the passwords in our system
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      // const user = new User({
      //   ...req.body,
      //   password: hashedPassword,
      // });
      const user = new User({
        email: req.body.email,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        role: "user", // 👈 hårdkodat
      });

      await user.save();
      res.status(201).json({
        message: "User created successfully",
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
        },
      });


      //Add automatic mail at registered user - Sara
      await sendMail({
        to: user.email,
        subject: "Bekräftelsemejl",
        text: "Konto-registrering",
        html: 
        `
         <table align="center" width="600" cellpadding="0" cellspacing="3" style="font-family: Arial, serif; padding:10px;">
              <tr>
                <td style="background-color: #243365; padding:5px; border-radius:5px;" 
                width="600" height="120" align="left">
          
                  <img src="cid:logo" alt="Filmvisarnas logga" width="150" style="margin:10px 20px 2px 20px;" > 
                  <h2 style="color:white; font-size:20px; margin:1px 20px 10px 20px;" align="center">Konto-registrering</h2>
           
                </td>
              </tr>

              <tr>
                <td style="color:white; text-align:center; padding:5px; background-color: #243365; border-radius:5px;">
                  <h2 style="margin:3px;">Hej och välkommen ${user.firstName}!🙂</h2>
                  <p style="margin-top:1px;">Vad kul att du har registrerat ett konto hos oss på Filmvisarna i Småstad.</p>

                  <table align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #9ca6c7ff; border:2px solid #243365; border-radius:5px; margin:20px 20px; padding:10px;">
                    <tr>
                      <td style="color: #0d1325ff; text-align:center; padding:10px;">
                        <h2 style="text-align:center; margin: 0;">Dina kontouppgifter</h2>
                        <p>Användarnamn: <strong>${user.email}</strong></p>
                        <p>Förnamn: <strong>${user.firstName}</strong></p>
                        <p>Efternamn: <strong>${user.lastName}</strong></p>
                        <p>Telefonnummer: <strong>${user.phoneNumber}</strong></p>

                      </td>

                  <table align="center" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                      <td style="color: white; text-align: center; padding: 10px;">
                        <p style="padding: 5px; font-size: 15px;">Vi hoppas att du ska finna mycket nöje med vårt utbud av gamla goda klassiker mellan tidigt 1900tal och senare 2000tal.</p>
                        <p style="padding: 2px; font-size: 12px;">Ytterligare information om ditt konto eller behov av lösenords-återställning finns att hämta hos oss vår kundservice.</p>
                      </td>
                    </td>
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

      console.log("Mejl har skickats iväg");
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Get all users
router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get user by id
router.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// update user by id
router.put("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// delete user by id
router.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post("/api/login", async (req, res) => {
  if (req.session.userId) {
    return res.status(200).json({
      message: "Already logged in",
      user: {
        email: req.session.userEmail,
        
      },
    });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({ message: "Invalid email or password" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid)
    return res.status(401).json({ message: "Invalid email or password" });

  req.session.userId = user._id;
  req.session.userEmail = user.email;
  req.session.userRole = user.role;

  res.json({
    message: "Logged in",
    user: { email: user.email, firstName: user.firstName, role: user.role, },
  });
});

// Log out
router.post("/api/logout", (req, res) => {
  if (!req.session.userId) {
    return res.status(400).json({
      message: "There is no user to log out",
    });
  }

  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
});

// // Check current session
// router.get("/api/me", (req, res) => {
//   if (!req.session.userId)
//     return res.status(401).json({ message: "Not logged in" });
//   res.json({ userId: req.session.userId, email: req.session.userEmail });
// });

// Check current session
router.get("/api/me", async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ message: "Not logged in" });

  const user = await User.findById(req.session.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({
    userId: user._id,
    email: user.email,
    role: user.role,
  });
});


export default router;
