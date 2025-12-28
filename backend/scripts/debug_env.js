const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

console.log('CWD:', process.cwd());
console.log('Trying to load .env from:', path.join(__dirname, '../.env'));

const result = dotenv.config({ path: path.join(__dirname, '../.env') });

if (result.error) {
    console.log('Error loading .env:', result.error);
} else {
    console.log('.env loaded successfully');
}

console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'Present' : 'Missing');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'Present' : 'Missing');
