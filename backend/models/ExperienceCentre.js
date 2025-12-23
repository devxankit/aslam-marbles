const mongoose = require('mongoose');

const experienceCentreSchema = new mongoose.Schema({
    heroImage: {
        url: String,
        publicId: String
    },
    regularImages: [{
        url: String,
        publicId: String
    }],
    horizontalImages: [{
        url: String,
        publicId: String,
        caption: String
    }],
    mainCaption: String,
    subCaption: String,
    journeyText: String,
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('ExperienceCentre', experienceCentreSchema);
