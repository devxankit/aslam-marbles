const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  currentCity: { type: String, required: true, trim: true },
  currentPosition: { type: String, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  department: { type: String, required: true, trim: true },
  applyingFor: { type: String, required: true, trim: true },
  phoneNo: { type: String, required: true, trim: true },
  resumeName: { type: String, trim: true },
  status: { type: String, enum: ['new', 'in_review', 'shortlisted', 'hired', 'rejected'], default: 'new' },
  source: { type: String, default: 'careers' }
}, { timestamps: true });

jobApplicationSchema.index({ createdAt: -1 });
jobApplicationSchema.index({ status: 1 });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);


