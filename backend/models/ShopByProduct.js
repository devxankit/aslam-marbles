const mongoose = require('mongoose');

const shopByProductSchema = new mongoose.Schema({
    section: {
        type: String,
        required: true,
        enum: ['rooms', 'occasions'],
        index: true
    },
    categorySlug: {
        type: String,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        default: 'Price on Request'
    },
    description: {
        type: String
    },
    images: [{
        url: String,
        publicId: String,
        alt: String
    }],
    displayOrder: {
        type: Number,
        default: 0
    },
    specifications: {
        type: Map,
        of: String
    },
    isLive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ShopByProduct', shopByProductSchema);
