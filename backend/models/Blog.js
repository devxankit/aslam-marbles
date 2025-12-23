const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    trim: true,
    default: '',
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    trim: true,
    default: null,
  },
  date: {
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
blogSchema.index({ isActive: 1, displayOrder: 1 });
blogSchema.index({ isActive: 1, category: 1, displayOrder: 1 });
blogSchema.index({ createdAt: -1 }); // For sorting

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

