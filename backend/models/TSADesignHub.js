const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    description: String,
    image: {
        public_id: String,
        url: String
    },
    backgroundColor: String, // e.g. '#ffffff' or 'rgb(255, 250, 240)'
    layout: {
        type: String,
        enum: ['image-left', 'image-right', 'full-width', 'centered', 'grid'],
        default: 'image-left'
    },
    features: [{
        title: String,
        description: String
    }]
});

const howItWorksStepSchema = new mongoose.Schema({
    title: String,
    description: String,
    icon: {
        public_id: String,
        url: String
    },
    badgeText: String
});

const tsaDesignHubSchema = new mongoose.Schema({
    heroSection: {
        image: {
            public_id: String,
            url: String
        },
        title: String,
        subtitle: String,
        description: String
    },
    // We can store the variable distinct sections in an array or as specific fields.
    // Given the specific layout, specific fields might be easier to manage for the frontend mapping.

    joinHubSection: { // "Join the AMS Design Hub"
        title: String,
        image: { public_id: String, url: String }
    },

    supportSection: { // "We Support You With" (GIF section)
        type: Object, // To hold the schema-less structure or reuse sectionSchema
        default: {}
    },

    solutionsSection: { // "Integrated pooja room solutions"
        description: String,
        image: { public_id: String, url: String }
    },

    pricingSection: { // "Architects & designers enjoy..."
        description: String,
        image: { public_id: String, url: String }
    },

    lookbookSection: { // "Explore our latest..."
        description: String,
        image: { public_id: String, url: String }
    },

    howItWorks: [howItWorksStepSchema],

    footerImageSection: {
        image: { public_id: String, url: String }
    },

    visitStoreSection: {
        image: { public_id: String, url: String }
    }
}, { timestamps: true });

module.exports = mongoose.model('TSADesignHub', tsaDesignHubSchema);
