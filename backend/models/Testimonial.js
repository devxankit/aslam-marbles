const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  designation: {
    type: String,
    trim: true,
    default: null,
  },
  review: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 5,
  },
  image: {
    type: String,
    default: null,
  },
  displayOrder: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

// Compound indexes for common query patterns
testimonialSchema.index({ isActive: 1, displayOrder: 1 });
testimonialSchema.index({ createdAt: 1 }); // For sorting

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;

