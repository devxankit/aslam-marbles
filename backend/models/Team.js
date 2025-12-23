const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    image: {
        url: String,
        publicId: String
    },
    description: {
        type: String,
        required: true
    }
});

const teamSchema = new mongoose.Schema({
    heroImage: {
        url: String,
        publicId: String
    },
    members: [teamMemberSchema]
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
