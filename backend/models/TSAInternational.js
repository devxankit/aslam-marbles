const mongoose = require('mongoose');

const tsaInternationalSchema = new mongoose.Schema({
    heroSection: {
        image: {
            public_id: String,
            url: String
        },
        title: String,
        subtitle: String,
        description: String
    },

    introIcons: [{
        title: String, // e.g., Design, Production
        image: {
            public_id: String,
            url: String
        }
    }],

    whatSetsApartSection: { // The GIF section
        image: {
            public_id: String,
            url: String
        },
        title: String,
        features: [{
            title: String,
            description: String
        }]
    },

    locations: [{
        name: String,
        image: {
            public_id: String,
            url: String
        }
    }],

    shippingTimelines: {
        // We can store the raw data structure here as it's quite specific
        USA: {
            data: [{ width: String, design: String, production: String, shipping: String, weight: String, charges: String }],
            note: String
        },
        UAE: {
            data: [{ width: String, design: String, production: String, shipping: String, weight: String, charges: String }],
            note: String
        },
        AUSTRALIA: {
            data: [{ width: String, design: String, production: String, shipping: String, weight: String, charges: String }],
            note: String
        }
    },

    processSteps: [{
        id: Number,
        title: String,
        description: String,
        details: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('TSAInternational', tsaInternationalSchema);
