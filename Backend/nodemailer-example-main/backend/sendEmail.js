import nodemailer from 'nodemailer';

import info from "./gmail-secret.json" with { type: "json" };

export default function sendEmail({ to, subject, text, html, attachments = [] }) {
    // Authenticate / create a mail client
    const client = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: info.email,
            pass: info.appPassword
        }
    });
    // Send the mail
    // (see https://nodemailer.com/message for more options)
    client.sendMail({
        from: info.email,
        to, subject, text, html, attachments
    });
}