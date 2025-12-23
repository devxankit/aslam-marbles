const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
  // Hero Section
  heroImage: {
    url: { type: String, required: true },
    publicId: { type: String, required: true }
  },
  
  // Main Content
  title: {
    type: String,
    default: 'Our Artist',
    required: true
  },
  
  description: {
    type: String,
    required: true,
    default: 'The artisans at Aslam Marble Suppliers blend traditional stone-carving heritage with modern precision. Their expert hands and creative vision bring each design to life, ensuring every marble creation is unique, authentic, and beautifully crafted.'
  },

  // Gallery Images
  galleryImages: [{
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    alt: { type: String, default: 'Artisan' },
    order: { type: Number, default: 0 }
  }],

  // Content Sections
  sections: [{
    title: { type: String },
    content: { type: String, required: true },
    order: { type: Number, default: 0 }
  }],

  // Visit Store Section
  visitStoreSection: {
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true }
    },
    buttonText: {
      type: String,
      default: 'Visit Store'
    },
    buttonLink: {
      type: String,
      default: '/visit-store'
    }
  },

  // Meta Information
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

// Update the updatedAt field before saving
artistSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  if (typeof next === 'function') {
    next()
  }
})

module.exports = mongoose.model('Artist', artistSchema)
