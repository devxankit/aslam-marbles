const mongoose = require('mongoose');

const murtiPageSchema = new mongoose.Schema({
    heroSection: {
        image: {
            url: { type: String, required: true },
            alt: { type: String }
        },
        title: { type: String, required: true },
        subtitle: { type: String },
        description: { type: String }
    },
    homeDecorBanner: {
        image: { url: { type: String } },
        buttonText: { type: String }
    },
    lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('MurtiPage', murtiPageSchema);
