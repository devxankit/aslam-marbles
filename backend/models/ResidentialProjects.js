const mongoose = require('mongoose')

const residentialProjectsSchema = new mongoose.Schema({
    heroImage: {
        url: {
            type: String,
            required: true
        },
        publicId: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            default: 'Residential Projects Hero'
        }
    },
    title: {
        type: String,
        default: 'RESIDENTIAL PROJECTS',
        required: true
    },
    subtitle: {
        type: String,
        default: 'Designing Dreams, Building Homes'
    },
    description: {
        type: String,
        default: 'Explore our portfolio of luxurious and bespoke residential projects, crafted with precision and elegance to transform houses into dream homes.'
    },
    sectionTitle: {
        type: String,
        default: 'Our Residential Projects'
    },
    sectionDescription: {
        type: String,
        default: 'Discover our collection of exquisite residential stone works and architectural marvels.'
    },
    galleryImages: [{
        url: {
            type: String,
            required: true
        },
        publicId: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            default: 'Residential Project'
        },
        title: {
            type: String,
            default: 'Residential Project'
        },
        description: {
            type: String,
            default: 'A beautiful residential project showcasing our finest stone craftsmanship and attention to detail.'
        },
        location: {
            type: String,
            default: ''
        },
        address: {
            type: String,
            default: ''
        },
        client: {
            type: String,
            default: ''
        },
        duration: {
            type: String,
            default: ''
        },
        order: {
            type: Number,
            default: 0
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

// Update timestamp on save
residentialProjectsSchema.pre('save', function (next) {
    this.updatedAt = Date.now()
    if (typeof next === 'function') {
        next()
    }
})

module.exports = mongoose.model('ResidentialProjects', residentialProjectsSchema)
