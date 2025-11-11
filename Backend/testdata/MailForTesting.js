import nodemailer from "nodemailer";

// ✅ Mail testing for layout and design purpose
// Mail testing booking

async function sendTestMail() {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 25,
    auth: {
      user: "e03929fd998499",
      pass: "4453fc12b50c6a",
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
    html: `<div style="font-family: Arial, sans-serif; background:linear-gradient(120deg, #2C497F, #182846ff); padding:20px;">
      <table align= "center" width="600" cellpadding="0" cellspacing="0">
        <tr>
          <td style="display:flex; flex-direction:column; justify-content:center; align-items:center; background-color: #0417209f; padding:10px;" 
           width="600" height="100">
          
              <img src="cid:logo" alt="Filmvisarnas logga" width="180" style="margin:20px; "> 
              <h2 style="color: white;" font-size:10px; align="right; margin:2px;">Bokningsbekräftelse</h2>
           
          </td>
        </tr>
      </table>

      <table >
          <h2>Hej Test!</h2>
          <p>Tack för din bokning!</p>
          <p><strong>Ordernummer:</strong> </p>
          <p><strong>Film:</strong> </p>
          <p><strong>Datum & tid:</strong> </p>
          <p><strong>Salong:</strong></p>
          <p><strong>Platser:</strong> </p>
          <p><strong>Biljetter:</strong><br></p>
          <p><strong>Total:</strong>  kr</p>
          <p>Vi ses på bion! 🍿🎬</p>
          </div>
        `,
    attachments: [
      {
        filename: "PicLoggoMail.png",
        path: "./assets/PicLoggoMail.png",
        cid: "logo",
      },
      {
        filename: "BackgroundBlue.png",
        path: "./assets/BackgroundBlue.png",
        cid: "background",
      },
    ],
  });

  console.log("Mail skickat");
  console.log("Mail message id: ", test.messageId);
}

sendTestMail().catch(console.error);
