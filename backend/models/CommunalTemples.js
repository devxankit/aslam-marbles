const mongoose = require('mongoose');

const communalTemplesSchema = new mongoose.Schema({
    // Hero Section
    heroSection: {
        image: {
            url: { type: String, required: true },
            publicId: { type: String },
            alt: { type: String, default: 'Communal Temples Hero' }
        },
        title: { type: String, default: 'Communal Temples' },
        subtitle: { type: String, default: 'Sacred Spaces for Communities' }
    },

    // Why Choose Us Section
    whyChooseUs: [{
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: {
            url: { type: String, required: true },
            publicId: { type: String },
            alt: { type: String }
        }
    }],

    // Services Section
    services: [{
        name: { type: String, required: true },
        icon: {
            url: { type: String, required: true },
            publicId: { type: String },
            alt: { type: String }
        }
    }],

    // Gallery Section (Optional for future)
    gallery: [{
        url: { type: String, required: true },
        publicId: { type: String },
        alt: { type: String },
        title: { type: String },
        description: { type: String }
    }],

    // 5 Steps (Standard process)
    fiveSteps: {
        title: { type: String, default: "Build Your Dream Temple in Just 5 Steps" },
        subtitle: { type: String, default: "Ready to design your Dream Temple? Here's how you can get started." },
        steps: [{
            stepNumber: { type: Number },
            title: { type: String },
            icon: {
                url: { type: String },
                publicId: { type: String }
            },
            gif: {
                url: { type: String },
                publicId: { type: String }
            }
        }]
    },

    // Metadata
    isActive: { type: Boolean, default: true },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CommunalTemples', communalTemplesSchema);
