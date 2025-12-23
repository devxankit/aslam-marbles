const mongoose = require('mongoose');

const stoneProductSchema = new mongoose.Schema({
    categoryId: { type: String, required: true, ref: 'StoneCategory' }, // e.g. 'sandstone', 'ganesha'
    name: { type: String, required: true },
    sku: { type: String, unique: true, sparse: true }, // Added for Murti
    image: {
        url: { type: String, required: true },
        alt: { type: String }
    },

    // Flexible specs for different product types
    specifications: {
        origin: { type: String },
        color: { type: String },
        finish: { type: String },
        offeredIn: { type: String },
        dimensions: { type: String }, // Used as 'Tiles Size' for stones
        price: { type: String } // Legecy string price for stones
    },
    // Top-level fields for Murti/Ecommerce
    price: { type: Number },
    material: { type: String },
    size: { type: String },
    isPreOrder: { type: Boolean, default: false },

    description: { type: String },
    displayOrder: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('StoneProduct', stoneProductSchema);
