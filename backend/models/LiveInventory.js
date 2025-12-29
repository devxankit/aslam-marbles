const mongoose = require('mongoose');

const liveInventorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true }, // e.g. 'Marble', 'Granite'
    image: {
        url: { type: String, required: true },
        alt: { type: String }
    },
    price: { type: Number }, // Optional price for direct purchase
    specifications: {
        dimensions: { type: String },
        quantity: { type: String },
        origin: { type: String },
        finish: { type: String }
    },
    status: { type: String, enum: ['Available', 'Reserved', 'Sold'], default: 'Available' },
    displayOrder: { type: Number, default: 0 },
    isPublic: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('LiveInventory', liveInventorySchema);
