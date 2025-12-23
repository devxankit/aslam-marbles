const mongoose = require('mongoose');

const murtiProductSchema = new mongoose.Schema({
    categoryId: { type: String, required: true }, // Links to MurtiCategory.id
    name: { type: String, required: true },
    sku: { type: String, unique: true },
    price: { type: Number },
    material: { type: String },
    size: { type: String },
    images: [{
        url: { type: String, required: true },
        alt: { type: String }
    }],
    isPreOrder: { type: Boolean, default: false },
    description: { type: String },
    displayOrder: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true }
}, { timestamps: true });

// Indexes for performance
murtiProductSchema.index({ categoryId: 1, displayOrder: 1 });
murtiProductSchema.index({ sku: 1 });
murtiProductSchema.index({ inStock: 1 });

module.exports = mongoose.model('MurtiProduct', murtiProductSchema);
