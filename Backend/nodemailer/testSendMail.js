import sendMail from "./sendMail.js";


sendMail({
    to: "sara_lunden1@hotmail.com",
    subject: "Ditt konto är nu skapat",
    text: "Registrerings bekräftelse",
    html:"<p>Användarnamn: </p>"})