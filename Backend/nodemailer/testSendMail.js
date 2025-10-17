import sendMail from "./sendMail.js";

sendMail({
    to: "sara_lunden1@hotmail.com",
    subject: "Testar skicka från team 1 mail",
    text: "Mail skickas från team 1 mail för test",
    html:"<p>Detta är ett test</p>"
});