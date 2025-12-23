const mongoose = require('mongoose');

const HomeDecorCategorySchema = new mongoose.Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'HomeDecorGroup', required: true },
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    displayOrder: { type: Number, default: 0 },
    heroSection: {
        image: {
            url: String,
            publicId: String,
            alt: String
        },
        title: String,
        subtitle: String,
        description: String
    }
}, { timestamps: true });

module.exports = mongoose.model('HomeDecorCategory', HomeDecorCategorySchema);
