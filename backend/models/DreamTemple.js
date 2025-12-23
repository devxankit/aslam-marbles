const mongoose = require('mongoose');

const dreamTempleSchema = new mongoose.Schema({
    // Hero Section
    heroSection: {
        image: {
            url: { type: String, required: true },
            alt: { type: String, default: 'Dream Temple Hero' }
        },
        title: { type: String, default: 'DREAM TEMPLES' },
        subtitle: { type: String, default: 'Crafting Sacred Spaces with Timeless Elegance' },
        description: { type: String, default: 'Experience the perfect blend of traditional craftsmanship and modern design in our exquisite marble temple collection.' }
    },

    // Temple Collection Section Titles
    collectionSection: {
        title: { type: String, default: 'Our Dream Temple Collection' },
        subtitle: { type: String, default: 'Artisanal Excellence' },
        description: { type: String, default: 'Transform your sacred space with our meticulously crafted marble temples, designed to bring peace and divinity into your home.' }
    },

    // Dream Temple Collection (The cards)
    collection: [{
        image: {
            url: { type: String, required: true },
            alt: { type: String }
        },
        size: { type: String, required: true },
        price: { type: String, required: true }, // Display string like "2.85L"
        fullPrice: { type: Number, default: 0 }, // Numeric value for calculations
        description: { type: String, required: true }
    }],

    // Horizontal Images Section Titles
    horizontalSection: {
        title: { type: String, default: 'Visual Journey' },
        subtitle: { type: String, default: 'Gallery of Divine Craft' }
    },

    // Horizontal Images (Wide images with captions)
    horizontalImages: [{
        image: {
            url: { type: String, required: true },
            alt: { type: String }
        },
        caption: { type: String }
    }],

    // Gallery (Regular grid images)
    gallery: [{
        url: { type: String, required: true },
        publicId: { type: String },
        alt: { type: String }
    }],

    // Process Steps (The 5 steps)
    processSteps: [{
        id: { type: Number },
        title: { type: String },
        description: { type: String },
        gif: {
            url: { type: String },
            alt: { type: String }
        }
    }],

    // Metadata
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DreamTemple', dreamTempleSchema);
