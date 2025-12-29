const mongoose = require('mongoose');

const specialProductSchema = new mongoose.Schema({
    collectionType: {
        type: String,
        required: true,
        enum: ['on-sale', 'limited-edition', 'furniture'], // Added furniture just in case, but primary focus is first two
        index: true
    },
    categorySlug: {
        type: String,
        required: true,
        default: 'general' // e.g., 'exclusive-offers', 'limited-series'
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    images: [{
        url: { type: String, required: true },
        publicId: { type: String }, // Optional for external URLs, required for Cloudinary
        alt: { type: String }
    }],
    sku: {
        type: String,
        unique: true,
        sparse: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    displayOrder: {
        type: Number,
        default: 0
    },
    specifications: {
        material: String,
        size: String,
        origin: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('SpecialProduct', specialProductSchema);
