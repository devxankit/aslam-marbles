const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('CLOUDINARY_URL:', process.env.CLOUDINARY_URL ? 'Present' : 'Missing');
console.log('Cloudinary_URL:', process.env.Cloudinary_URL ? 'Present' : 'Missing');
