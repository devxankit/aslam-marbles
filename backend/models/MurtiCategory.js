const mongoose = require('mongoose');

const murtiCategorySchema = new mongoose.Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'MurtiGroup', required: true },
    id: { type: String, required: true, unique: true }, // e.g. 'ganesha', 'durga'
    name: { type: String, required: true },
    heroSection: {
        image: {
            url: { type: String },
            alt: { type: String }
        },
        title: { type: String },
        subtitle: { type: String },
        description: { type: String }
    },
    displayOrder: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('MurtiCategory', murtiCategorySchema);
