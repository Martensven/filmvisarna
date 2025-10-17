import nodemailer from "nodemailer"
import info from "./team1-gmail.json" with {type: "json" }


export default function sendMail({ to, subject, text, html, attachments = [] }) {
    //Creating our teams client using the info from our team1-gmail.json info
    const teamClient = nodemailer.createTransport({
        service: "Gmail",
        auth:{
            user: info.email,
            pass: info.appPassword
        }
    });


    // Sending mail including from our team mail and fields and subjects
    teamClient.sendMail({
        from: info.email,
        to,
        subject, 
        text, html, attachments
    });

}