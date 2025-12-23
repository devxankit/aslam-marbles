const mongoose = require('mongoose');

const stoneCategorySchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // e.g. 'sandstone', 'modern-art'
    name: { type: String, required: true }, // e.g. 'Sandstone', 'Modern Art'
    heroSection: {
        image: {
            url: { type: String, required: true },
            alt: { type: String }
        },
        title: { type: String, required: true },
        subtitle: { type: String },
        description: { type: String }
    },
    meta: {
        title: { type: String },
        description: { type: String }
    },
    // For specific UI configurations if needed
    stoneType: { type: String }, // e.g. 'sandstone', 'imported'
    origin: { type: String } // e.g. 'Rajasthan', 'Global'
}, { timestamps: true });

module.exports = mongoose.model('StoneCategory', stoneCategorySchema);
