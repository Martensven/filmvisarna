import nodemailer from "nodemailer";

// ✅ Mail testing for layout and design purpose
// Mail testing booking


/*<div style="font-family: Noto Serif, san-serif; padding:10px;">
      <table align="center" width="600" cellpadding="0" cellspacing="3">
        <tr>
          <td style="background-color:#243365; padding:5px;" 
           width="600" height="120" align="left">
          
              <img src="cid:logo" alt="Filmvisarnas logga" width="150" style="margin:10px 20px 2px 20px;" > 
              <h2 style="color:white; font-size:20px; margin:1px 20px 10px 20px;" align="center">Bokningsbekräftelse</h2>
           
          </td>
        </tr>
      </table>

      <table align="center" width="600" cellpadding="0" cellspacing="3">

        <tr>
          <td style="color:white; text-align:center; padding:5px; background: linear-gradient(160deg, #243365, #151d3aff);" width="600" align="center">
            <h2 style="margin:3px;">Hej Test! 🙂</h2>
            <p style="margin-top:1px;">Tack för att du bokar filmupplevelse hos oss!</p>

              <div align="center" width="300" style="color:white; background-color: #243b8685; border:2px solid #243365; border-radius:5px; margin:20px; padding:10px;">
                <h2 style="text-align:center; " width="100" height="100">Din Bokning</h2>
                <p><strong>Ordernummer:</strong>  </p>
                <p><strong>Film:</strong>  </p>
                <img src="{}">
                <p><strong>Datum & tid:</strong> </p>
                <p><strong>Salong:</strong></p>
                <p><strong>Platser:</strong> </p>
                <p><strong>Biljetter:</strong><br></p>
                <p><strong>Total:</strong>  kr</p>
                <p>Vi ses på bion! 🍿🎬</p>
      
            </div>

            <div style="color:white; margin:20px 5px 25px 5px;" align="center">
                <h1 style="font-size:25px; margin:3px;">Filmvisarna</h1>
                <h3 style="font-size:20px; margin:2px 0px;">Kontakt</h3>
                <p style="font-size:15px; margin:2px;">Epost: info@filmvisarna.se</p>
                <p style="font-size:15px; margin:2px;">Telefon: 123-456 78 90</p>
                <p style="font-size:15px; margin:2px;">Adress: Biogatan 1, 123 45, Filmstaden</p>
            </div>
          </td>
        </tr>

      </table>
    </div>
        `*/


async function sendTestMail() {

  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      console.error("Fel vid ansluttning", error);
    } else {
      console.log("Anslutning ok");
    }
  });

  const test = await transporter.sendMail({
    from: '"Filmvisarna" <no-reply@filmvisarna.se>',
    to: "test@example.com",
    subject: "Filmvisarna - Bokningsbekräftelse",
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
                  <h2 style="margin:3px;">Hej och välkommen Test! 🙂</h2>
                  <p style="margin-top:1px;">Vad kul att du har registrerat ett konto hos oss på Filmvisarna i Småstad.</p>

                  <table align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #9ca6c7ff; border:2px solid #243365; border-radius:5px; margin:20px 20px; padding:10px;">
                    <tr>
                      <td style="color: #0d1325ff; text-align:center; padding:10px;">
                        <h2 style="text-align:center; margin: 0;">Dina kontouppgifter</h2>
                        <p>Användarnamn: <strong></strong>.</p>
                        <p>Förnamn: <strong></strong>.</p>
                        <p>Efternamn: <strong></strong>.</p>
                        <p>Telefonnummer: <strong></strong>.</p>

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
        path: "./../assets/LoggoMail.png",
        cid: "logo",
      },
    ],
  });

  console.log("Förhandsvisning", nodemailer.getTestMessageUrl(test));
  console.log("Mail message id: ", test.messageId);
}

sendTestMail().catch(console.error);
