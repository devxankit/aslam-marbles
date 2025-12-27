const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER?.trim(),
            pass: process.env.GMAIL_PASS?.replace(/\s+/g, '')
        }
    });

    console.log('DEBUG: Sending email from:', process.env.GMAIL_USER);
    console.log('DEBUG: Password length:', process.env.GMAIL_PASS ? process.env.GMAIL_PASS.length : 'undefined');

    const mailOptions = {
        from: `"Aslam Marble Suppliers" <${process.env.GMAIL_USER?.trim()}>`,
        to: options.email,
        subject: options.subject,
        html: options.message
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
