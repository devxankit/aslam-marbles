const path = require('path');
const dotenv = require('dotenv');

// 1. Try loading from default location
const result = dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('--- Debugging Environment Variables ---');
console.log('Dotenv parsed result error:', result.error);
if (result.parsed) {
    console.log('Keys found in .env:', Object.keys(result.parsed));
    console.log('EMAIL_USER raw value:', result.parsed.EMAIL_USER);
    console.log('EMAIL_USERNAME raw value:', result.parsed.EMAIL_USERNAME);
    console.log('EMAIL_PASS raw value exists:', !!result.parsed.EMAIL_PASS);
} else {
    console.log('No parsed config found.');
}

console.log('--- process.env check ---');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);
console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
console.log('EMAIL_HOST:', process.env.EMAIL_HOST);

console.log('--- Script End ---');
