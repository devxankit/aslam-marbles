const mongoose = require('mongoose');

const HomeDecorProductSchema = new mongoose.Schema({
    categoryId: { type: String, required: true },
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    material: String,
    size: String,
    dimensions: String,
    images: [{
        url: String,
        publicId: String,
        alt: String
    }],
    description: String,
    isPreOrder: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 }
}, { timestamps: true });

// Indexes for performance
HomeDecorProductSchema.index({ categoryId: 1, displayOrder: 1 });
HomeDecorProductSchema.index({ sku: 1 });
HomeDecorProductSchema.index({ inStock: 1 });

module.exports = mongoose.model('HomeDecorProduct', HomeDecorProductSchema);
