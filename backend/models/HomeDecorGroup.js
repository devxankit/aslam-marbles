const mongoose = require('mongoose');

const HomeDecorGroupSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    displayOrder: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('HomeDecorGroup', HomeDecorGroupSchema);
