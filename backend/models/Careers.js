const mongoose = require('mongoose');

const benefitSchema = new mongoose.Schema({
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
}, { _id: false });

const whyJoinUsSchema = new mongoose.Schema({
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
}, { _id: false });

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    experience: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    category: { type: String, required: true, enum: ['architecture', 'creative', 'sales'] },
    isActive: { type: Boolean, default: true }
});

const careersSchema = new mongoose.Schema({
    heroImage: {
        url: { type: String, required: true },
        publicId: { type: String, required: true }
    },
    trainingImage: {
        url: { type: String, required: true },
        publicId: { type: String, required: true }
    },
    whyJoinUs: [whyJoinUsSchema],
    benefits: [benefitSchema],
    jobs: [jobSchema]
}, { timestamps: true });

module.exports = mongoose.model('Careers', careersSchema);
