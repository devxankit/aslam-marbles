const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema({
    heroBgImage: {
        url: String,
        publicId: String
    },
    introImage: {
        url: String,
        publicId: String
    },
    timeline: [{
        year: String,
        title: String,
        description: String
    }],
    values: [{
        title: String,
        description: String
    }],
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('AboutUs', aboutUsSchema);
