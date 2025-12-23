const mongoose = require('mongoose');

const murtiGroupSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g. 'GODS', 'GODDESSES'
    displayOrder: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('MurtiGroup', murtiGroupSchema);
