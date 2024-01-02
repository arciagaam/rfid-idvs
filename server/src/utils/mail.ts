import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_APP_PASS
    }
});

const sendMail = async (mail: Mail.Options, callback?: (info: SMTPTransport.SentMessageInfo) => any) => {
    if (transporter === undefined) return;

    try {
        const info = await transporter.sendMail(mail);
        callback && callback(info);
    } catch (error) {
        console.log(error);
    }
}

export {
    transporter,
    sendMail,
};
