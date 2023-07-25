const nodemailer = require('nodemailer');
const config = require('../api.config.json');
const fs = require('fs');
require('dotenv').config();

const sendVerificationEmail = async (email, verificationToken) => {

    const transporter = nodemailer.createTransport({
        host: config.nodemailer.verify_email.host,
        port: config.nodemailer.verify_email.port,
        secure: config.nodemailer.verify_email.secure,
        auth: {
          user: config.nodemailer.verify_email.auth.user,
          pass: process.env.EMAIL_VERIFY_PASSWORD,
        }
      })
    
    const verificationURL = `${config.domain}/verify-email?token=${verificationToken}`;

    const emailTemplate = fs.readFileSync('./mails/verify_email.html', 'utf-8');

    const emailBody = emailTemplate.replace('{{verificationURL}}', verificationURL);

    const mailOptions = {
      from: `${config.nodemailer.verify_email.from} <${config.nodemailer.verify_email.auth.user}>`,
      to: email,
      subject: config.nodemailer.verify_email.content.subject,
      html: emailBody,
    };

    transporter.sendMail( mailOptions, (error, info) => {
        if (error) {
            console.error('❌ Error al enviar el correo de verificación a el usuario: ' + email + '\nError: ', error);
        } else {
            console.log(`✅ SUCCESS: Verification mail [${info.messageId}] was sent to the user [${email}]`);
        }
    });
};

const sendResetPasswordEmail = async (email, resetPasswordToken) => {

    const transporter = nodemailer.createTransport({
      host: config.nodemailer.reset_psw.host,
      port: config.nodemailer.reset_psw.port,
      secure: config.nodemailer.reset_psw.secure,
      auth: {
        user: config.nodemailer.reset_psw.auth.user,
        pass: process.env.EMAIL_RESET_PASSWORD,
      }
    })

    const resetUrl = `${config.domain}${config.nodemailer.reset_psw.front_url}?token=${resetPasswordToken}`;

    const emailTemplate = fs.readFileSync('./mails/reset_password.html', 'utf-8');

    const emailBody = emailTemplate.replace('{{resetUrl}}', resetUrl);

    const mailOptions = {
      from: `${config.nodemailer.reset_psw.from} <${config.nodemailer.reset_psw.auth.user}>`,
      to: email,
      subject: config.nodemailer.reset_psw.content.subject,
      html: emailBody
    };
    transporter.sendMail( mailOptions, (error, info) => {
        if (error) {
            console.error('❌ Error al enviar el correo de recuperación a el usuario: ' + email + '\nError: ', error);
        } else {
            console.log(`✅ SUCCESS: Reset password mail [${info.messageId}] was sent to the user [${email}]`);
            console.log(info)
        }
    });
}

module.exports = {
    sendVerificationEmail,
    sendResetPasswordEmail
}