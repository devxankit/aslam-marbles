const mongoose = require('mongoose');

const PageContentSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true }, // e.g. 'privacy-policy', 'terms-and-conditions', 'how-it-works'
    title: { type: String, required: true },
    heroSection: {
        title: String,
        subtitle: String,
        description: String,
        image: {
            url: String,
            publicId: String,
            alt: String
        }
    },
    sections: [{
        title: String,
        content: String,
        image: {
            url: String,
            publicId: String,
            alt: String
        },
        order: { type: Number, default: 0 }
    }],
    metadata: {
        seoTitle: String,
        seoDescription: String,
        keywords: [String]
    },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('PageContent', PageContentSchema);
