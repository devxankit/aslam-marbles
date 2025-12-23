const mongoose = require('mongoose')

const ourClientsSchema = new mongoose.Schema({
  // Hero/Heading Images (Carousel)
  headingImages: [{
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    alt: { type: String, default: 'Our Clients' },
    order: { type: Number, default: 0 }
  }],
  
  // Main Content
  title: {
    type: String,
    default: 'Our Valued Clients',
    required: true
  },
  
  // Content Sections (Paragraphs)
  contentSections: [{
    content: { type: String, required: true },
    order: { type: Number, default: 0 }
  }],

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
ourClientsSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  if (typeof next === 'function') {
    next()
  }
})

module.exports = mongoose.model('OurClients', ourClientsSchema)
