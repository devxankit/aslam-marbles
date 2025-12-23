const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  pageKey: {
    type: String,
    required: true,
    enum: ['how-it-works', 'murti', 'dream-temple', 'tsa-international', 'location', 'general'],
    lowercase: true,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
    default: null,
  },
  question: {
    type: String,
    required: true,
    trim: true,
  },
  answer: {
    type: String,
    required: true,
    trim: true,
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
faqSchema.index({ pageKey: 1, location: 1, isActive: 1 });
faqSchema.index({ pageKey: 1, isActive: 1, displayOrder: 1 });
faqSchema.index({ isActive: 1, displayOrder: 1 });

const FAQ = mongoose.model('FAQ', faqSchema);

module.exports = FAQ;
