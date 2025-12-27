require('dotenv').config({ quiet: true });
const nodemailer = require('nodemailer');

const testEmail = async () => {
    console.log('Testing email credentials...');
    console.log('User:', process.env.GMAIL_USER);
    console.log('Pass Length:', process.env.GMAIL_PASS ? process.env.GMAIL_PASS.length : 0);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER?.trim(),
            pass: process.env.GMAIL_PASS?.replace(/\s+/g, '')
        }
    });

    try {
        await transporter.verify();
        console.log('✅ Success! Credentials are valid.');
    } catch (error) {
        console.error('❌ Authentication Failed:', error.message);
        console.log('\nPotential reasons:');
        console.log('1. The email address ' + process.env.GMAIL_USER + ' matches the App Password.');
        console.log('2. The App Password was revoked or copied incorrectly.');
    }
};

testEmail();
