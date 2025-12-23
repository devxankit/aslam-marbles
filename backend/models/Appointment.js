const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  contactNumber: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  appointmentType: {
    type: String,
    enum: ['store-tour', 'temple-customization'],
    default: 'store-tour',
    required: true
  },
  selectedDate: { type: String, required: true },
  selectedTime: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: { type: String, trim: true }
}, { timestamps: true });

appointmentSchema.index({ status: 1, createdAt: -1 });
appointmentSchema.index({ selectedDate: 1, selectedTime: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);


