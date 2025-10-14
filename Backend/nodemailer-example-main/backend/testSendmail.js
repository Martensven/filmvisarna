import sendEmail from "./sendEmail.js";

sendEmail({
    to: '[MAIL DU VILL TESTA ATT SKICKA TILL]',
    subject: 'Hej! Detta är ett test av NodeMailer...',
    text: 'Detta är ett test.',
    html: '<p>Detta är ett test.</p>'
});