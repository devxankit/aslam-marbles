const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const keys = Object.keys(process.env).filter(k => !k.startsWith('npm_') && !k.startsWith('Program'));
console.log('Environment Variables Keys:', keys);
