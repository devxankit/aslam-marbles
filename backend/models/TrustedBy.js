const mongoose = require('mongoose');

const TrustedBySchema = new mongoose.Schema({
    heading: {
        type: String,
        default: 'Trusted By'
    },
    companies: [{
        name: {
            type: String,
            required: true
        },
        logo: {
            url: {
                type: String,
                required: true
            },
            publicId: {
                type: String,
                required: true
            }
        },
        order: {
            type: Number,
            default: 0
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('TrustedBy', TrustedBySchema);
