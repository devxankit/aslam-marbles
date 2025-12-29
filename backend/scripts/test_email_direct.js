const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

// Load env
dotenv.config({ path: path.join(__dirname, '../.env') });

const sendTestEmail = async () => {
    // Resolve User
    const user = process.env.EMAIL_USER || process.env.EMAIL_USERNAME || process.env.GMAIL_USER;

    // Resolve Password
    let rawPassword = process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD || process.env.GMAIL_PASS;
    let password = rawPassword;

    if (password) {
        password = password.replace(/\s+/g, ''); // Remove spaces
    }

    console.log('--- Email Config Check ---');
    console.log('User:', user);
    console.log('Pass Length:', password ? password.length : 0);
    console.log('First 3 chars of pass:', password ? password.substring(0, 3) : 'N/A');
    console.log('Host:', process.env.EMAIL_HOST || 'smtp.gmail.com');
    console.log('Port:', process.env.EMAIL_PORT || 587);

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: false,
        auth: {
            user: user,
            pass: password,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    try {
        console.log('Attempting to verify connection...');
        await transporter.verify();
        console.log('✅ Connection verified successfully!');

        console.log('Attempting to send mail...');
        const info = await transporter.sendMail({
            from: user,
            to: user, // Send to self
            subject: 'Test Email from Debug Script',
            text: 'If you see this, email sending is working!',
        });
        console.log('✅ Email sent successfully:', info.messageId);
    } catch (error) {
        console.error('❌ Error occurred:', error);
    }
};

sendTestEmail();
