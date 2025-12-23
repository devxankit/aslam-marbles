const mongoose = require('mongoose');

const poojaRoomSchema = new mongoose.Schema({
    // Hero Section
    heroSection: {
        image: {
            url: { type: String, required: true },
            alt: { type: String, default: 'Pooja Room Hero' }
        },
        title: { type: String, default: 'Welcome to Our Pooja Room Collection' },
        subtitle: { type: String, default: 'Aslam Marble Suppliers' }
    },

    // Pooja Room Collection (The 4 cards)
    collection: [{
        name: { type: String, required: true },
        size: { type: String, required: true },
        price: { type: String, required: true }, // Display string like "12L"
        fullPrice: { type: Number, default: 0 }, // Optional numeric value
        image: {
            url: { type: String, required: true },
            alt: { type: String }
        }
    }],

    // Consultation Sections (Dimensions & Customised Solutions)
    consultation: {
        section1: {
            title: { type: String, default: 'All We Need Is Your Space Dimensions And Pictures' },
            description: { type: String },
            image: {
                url: { type: String },
                alt: { type: String }
            }
        },
        section2: {
            title: { type: String, default: 'Customised Solutions' },
            description: { type: String },
            image: {
                url: { type: String },
                alt: { type: String }
            }
        }
    },

    // Services (Icons)
    services: [{
        name: { type: String, required: true },
        icon: {
            url: { type: String, required: true },
            alt: { type: String }
        }
    }],

    // Gallery Images
    gallery: [{
        url: { type: String, required: true },
        alt: { type: String }
    }],

    // Before and After Section
    beforeAfter: {
        title: { type: String, default: 'Before and After' },
        description: { type: String },
        beforeImage: {
            url: { type: String },
            alt: { type: String }
        },
        afterImage: {
            url: { type: String },
            alt: { type: String }
        }
    },

    // Metadata
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PoojaRoom', poojaRoomSchema);
