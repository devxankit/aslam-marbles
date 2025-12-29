const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Robust port parsing
    let port = 587;
    if (process.env.EMAIL_PORT) {
        port = parseInt(process.env.EMAIL_PORT);
        if (isNaN(port)) port = 587;
    }

    // 1. Resolve User
    const user = process.env.EMAIL_USER || process.env.EMAIL_USERNAME || process.env.GMAIL_USER;

    // 2. Resolve Password
    let rawPassword = process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD || process.env.GMAIL_PASS;
    let password = rawPassword;

    if (password) {
        password = password.replace(/\s+/g, ''); // Remove spaces from app password
    }

    // Debug log (masked password)
    console.log('Attempting to send email with:', {
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: port,
        user: user || 'UNDEFINED',
        passLength: password ? password.length : 0,
        usingGmailEnv: !!process.env.GMAIL_USER
    });

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: port,
        secure: port === 465, // true for 465, false for other ports
        auth: {
            user: user,
            pass: password,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM || user || '"Support" <noreply@example.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
