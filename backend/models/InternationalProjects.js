const mongoose = require('mongoose')

const internationalProjectsSchema = new mongoose.Schema({
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
            default: 'International Projects Hero'
        }
    },
    title: {
        type: String,
        default: 'INTERNATIONAL PROJECTS',
        required: true
    },
    subtitle: {
        type: String,
        default: 'Global Excellence in Stone Architecture'
    },
    description: {
        type: String,
        default: 'From India to the world, exploring our international footprint in stone architecture and temple construction.'
    },
    sectionTitle: {
        type: String,
        default: 'Our Global Projects'
    },
    sectionDescription: {
        type: String,
        default: 'Showcasing our international presence and projects executed across the globe.'
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
            default: 'International Project'
        },
        title: {
            type: String,
            default: 'International Project'
        },
        description: {
            type: String,
            default: 'An iconic international project representing Indian craftsmanship on a global stage.'
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
internationalProjectsSchema.pre('save', function (next) {
    this.updatedAt = Date.now()
    if (typeof next === 'function') {
        next()
    }
})

module.exports = mongoose.model('InternationalProjects', internationalProjectsSchema)
