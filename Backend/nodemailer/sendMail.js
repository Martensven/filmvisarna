import nodemailer from "nodemailer"
//import info from "./team1-gmail.json" with {type: "json" }


export default async function sendMail({ to, subject, text, html, attachments = [] }) {
    //Creating our teams client using the info from our team1-gmail.json info
    try{
    const teamClient = nodemailer.createTransport({
        service: "Gmail",
        auth:{
            user: info.email,
            pass: info.appPassword
        }
    });
    // Sending mail including from our team mail and fields and subjects
    const mailOp = {
        from: info.email,
        to,
        subject, 
        text, 
        html, 
        attachments
    };

    
    const result = await teamClient.sendMail(mailOp);
    console.log(result.response);
    return result;

    } catch (error) {
    console.error("Fel vid sändning av mejl", err);
    throw err;
    }
   
}