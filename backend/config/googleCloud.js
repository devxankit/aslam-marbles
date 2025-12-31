const { Translate } = require('@google-cloud/translate').v2;
require('dotenv').config();

// Initialize the Google Cloud Translate client
const translate = new Translate({
    // NOTE: @google-cloud/translate v2 expects `key` (NOT `apiKey`).
    // If this is wrong, requests will be treated as "unregistered callers".
    key: process.env.GOOGLE_CLOUD_TRANSLATE_API_KEY,
});

// Map of app language codes to Google Cloud Translate API codes
// Adjust this map based on the specific needs and Google's supported codes
const languageCodeMap = {
    en: 'en',
    hi: 'hi',
    gu: 'gu', // Gujarati
    mr: 'mr', // Marathi
    bn: 'bn', // Bengali
    te: 'te', // Telugu
    ta: 'ta', // Tamil
    kn: 'kn', // Kannada
    ml: 'ml', // Malayalam
    pa: 'pa', // Punjabi
    ar: 'ar',
    he: 'he',
    ur: 'ur',
    fa: 'fa',
    sw: 'sw', // Swahili
    // Add other languages as needed
};

// RTL Languages
const rtlLanguages = ['ar', 'he', 'ur', 'fa'];

module.exports = {
    translateClient: translate,
    languageCodeMap,
    rtlLanguages
};
