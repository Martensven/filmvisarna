import sendMail from "./sendMail.js";

sendMail({
    to: "sara_lunden1@hotmail.com",
    subject: "Tack för din bokning",
    text: "Bokningsbekräftelse. Ditt ordernummer är ....",
    html:"<p>Bokningsbekräftelse: Ditt ordernummer är ...., visa upp ordernummer i kassan för att hämta ut biljetter</p>"
});