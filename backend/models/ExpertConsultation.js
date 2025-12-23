const mongoose = require('mongoose');

const expertConsultationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['DOMESTIC', 'INTERNATIONAL'],
    required: true
  },
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  aboutYourself: {
    type: String,
    enum: ['homeowner', 'designer'],
    required: true
  },
  lookingFor: {
    type: String,
    enum: ['singular', 'complete'],
    trim: true
  },
  budget: { type: String, trim: true },
  timeline: { type: String, trim: true },
  additionalInfo: { type: String, trim: true },
  designReferences: [{ type: String }], // Array of file names/paths
  status: {
    type: String,
    enum: ['new', 'contacted', 'in_progress', 'completed', 'closed'],
    default: 'new'
  },
  source: { type: String, default: 'homepage-popup' }
}, { timestamps: true });

expertConsultationSchema.index({ status: 1, createdAt: -1 });
expertConsultationSchema.index({ email: 1 });
expertConsultationSchema.index({ phone: 1 });

module.exports = mongoose.model('ExpertConsultation', expertConsultationSchema);

