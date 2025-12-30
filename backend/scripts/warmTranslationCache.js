/**
 * Cache Warming Script for Translation System
 * Pre-translates common phrases and static UI text to reduce API calls
 */

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const translationService = require('../services/translationService');
const { languageCodeMap, rtlLanguages } = require('../config/googleCloud');

// Common phrases and static UI text that should be pre-translated
const COMMON_PHRASES = [
    // Navigation
    'Home',
    'About Us',
    'Products',
    'Services',
    'Projects',
    'Contact',
    'Blog',
    'Testimonials',
    
    // Actions
    'Read More',
    'Learn More',
    'View Details',
    'Add to Cart',
    'Buy Now',
    'Book Appointment',
    'Get Started',
    'Contact Us',
    'Submit',
    'Send',
    'Cancel',
    'Save',
    'Delete',
    'Edit',
    'Update',
    
    // Common UI text
    'Loading...',
    'No results found',
    'Search',
    'Filter',
    'Sort',
    'Price',
    'Name',
    'Date',
    'Category',
    'Description',
    'Quantity',
    'Total',
    'Subtotal',
    'Checkout',
    
    // Product related
    'Product Details',
    'Related Products',
    'In Stock',
    'Out of Stock',
    'Add to Wishlist',
    'Remove from Wishlist',
    
    // Form labels
    'Name',
    'Email',
    'Phone',
    'Message',
    'Subject',
    'Address',
    'City',
    'State',
    'Zip Code',
    'Country',
    
    // Error messages
    'Required field',
    'Invalid email',
    'Invalid phone number',
    'Please fill all fields',
    'Something went wrong',
    'Try again later',
    
    // Success messages
    'Success',
    'Thank you',
    'Your message has been sent',
    'Order placed successfully',
    
    // Footer
    'Follow Us',
    'Quick Links',
    'Contact Information',
    'Privacy Policy',
    'Terms of Service',
    'All Rights Reserved',
    
    // Product categories (common ones)
    'Temples',
    'Murtis',
    'Home Decor',
    'Stone Products',
    'Marble Products',
    'Granite Products',

    // HomePage stats
    'Projects',
    'Cities',
    'Years Experience',

    // Navigation items
    'ASLAM MARBLE SUPPLIERS',

    // HomePage content
    'Welcome to',
    'Aslam Marble Suppliers',
    'COMPLETED CUSTOM PROJECTS',
    'The Transformation',
    'Witness raw spaces evolve into spiritual sanctuaries through our master craftsmanship.',
    'aslammarblesuppliers1',
    'Aslam Marble Suppliers',
    'Follow on Instagram',
    'AMS GUIDES',
    'Loading guides...',
    'No guides available at the moment.'
];

// Get all supported languages
const getAllLanguages = () => {
    return Object.keys(languageCodeMap).filter(lang => lang !== 'en'); // Exclude source language
};

// Warm cache for a single language
const warmLanguageCache = async (targetLang) => {
    console.log(`\n🔥 Warming cache for ${targetLang}...`);
    let successCount = 0;
    let errorCount = 0;

    for (const phrase of COMMON_PHRASES) {
        try {
            await translationService.translateText(phrase, targetLang, 'en', true); // true = isStatic
            successCount++;
        } catch (error) {
            console.error(`  ❌ Failed to translate "${phrase}":`, error.message);
            errorCount++;
        }
    }

    console.log(`  ✅ Success: ${successCount}, ❌ Errors: ${errorCount}`);
    return { successCount, errorCount };
};

// Main function
const warmCache = async () => {
    try {
        console.log('🚀 Starting translation cache warming...\n');
        
        // Connect to database
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error('MONGODB_URI not found in environment variables');
        }
        
        await connectDB(mongoUri);
        console.log('✅ Connected to MongoDB\n');

        const languages = getAllLanguages();
        console.log(`📝 Found ${languages.length} languages to warm`);
        console.log(`📝 Found ${COMMON_PHRASES.length} phrases to translate\n`);

        const results = {
            totalPhrases: COMMON_PHRASES.length,
            languages: {},
            totalSuccess: 0,
            totalErrors: 0
        };

        // Warm cache for each language
        for (const lang of languages) {
            const langResults = await warmLanguageCache(lang);
            results.languages[lang] = langResults;
            results.totalSuccess += langResults.successCount;
            results.totalErrors += langResults.errorCount;
        }

        // Summary
        console.log('\n' + '='.repeat(50));
        console.log('📊 Cache Warming Summary');
        console.log('='.repeat(50));
        console.log(`Total Languages: ${languages.length}`);
        console.log(`Total Phrases: ${COMMON_PHRASES.length}`);
        console.log(`Total Translations: ${results.totalSuccess + results.totalErrors}`);
        console.log(`✅ Success: ${results.totalSuccess}`);
        console.log(`❌ Errors: ${results.totalErrors}`);
        console.log(`Success Rate: ${((results.totalSuccess / (results.totalSuccess + results.totalErrors)) * 100).toFixed(2)}%`);
        console.log('='.repeat(50));

        // Get cache stats
        const TranslationCache = require('../models/TranslationCache');
        const stats = await TranslationCache.getStats();
        console.log('\n📈 Cache Statistics:');
        console.log(`  Total Entries: ${stats.totalEntries}`);
        console.log(`  Total Hits: ${stats.totalHits}`);
        console.log(`  Average Hits: ${stats.avgHits?.toFixed(2) || 0}`);
        console.log(`  Static Entries: ${stats.staticEntries}`);
        console.log(`  Dynamic Entries: ${stats.dynamicEntries}`);

        console.log('\n✅ Cache warming completed!');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Cache warming failed:', error);
        process.exit(1);
    }
};

// Run if called directly
if (require.main === module) {
    warmCache();
}

module.exports = { warmCache, COMMON_PHRASES };

