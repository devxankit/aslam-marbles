const mongoose = require('mongoose');

const HomeDecorPageSchema = new mongoose.Schema({
    heroSection: {
        image: {
            url: String,
            publicId: String,
            alt: String
        },
        title: String,
        subtitle: String,
        description: String
    },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('HomeDecorPage', HomeDecorPageSchema);
