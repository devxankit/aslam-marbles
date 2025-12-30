const mongoose = require('mongoose');

const LiveInventoryPageSchema = new mongoose.Schema({
    headSection: {
        title: { type: String, default: 'Live Inventory' },
        subtitle: { type: String, default: 'Exclusive Marble Collection' },
        description: { type: String, default: 'Explore our real-time stock of premium natural stones. From rare Italian marble to exquisite Indian granite, find the perfect slab for your dream project.' },
        heroImage: {
            url: String,
            publicId: String
        }
    },
    horizontalSection: {
        image: {
            url: String,
            publicId: String
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('LiveInventoryPage', LiveInventoryPageSchema);
