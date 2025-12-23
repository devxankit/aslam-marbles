const mongoose = require('mongoose')

const communalProjectsSchema = new mongoose.Schema({
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
      default: 'Communal Projects Hero'
    }
  },
  title: {
    type: String,
    default: 'COMMUNAL PROJECTS',
    required: true
  },
  subtitle: {
    type: String,
    default: 'Building Sacred Spaces for Communities'
  },
  description: {
    type: String,
    default: 'Crafting magnificent communal temples and spiritual spaces that bring communities together through timeless architecture and exquisite craftsmanship.'
  },
  sectionTitle: {
    type: String,
    default: 'Our Communal Projects'
  },
  sectionDescription: {
    type: String,
    default: 'Showcasing our magnificent communal temple projects that bring communities together through divine architecture.'
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
      default: 'Communal Project'
    },
    title: {
      type: String,
      default: 'Communal Project'
    },
    description: {
      type: String,
      default: 'This magnificent communal project stands as a testament to our dedication to preserving traditional temple architecture. Built with high-quality marble and intricate carvings, it serves as a spiritual gathering place for the community.'
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
communalProjectsSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  if (typeof next === 'function') {
    next()
  }
})

module.exports = mongoose.model('CommunalProjects', communalProjectsSchema)
