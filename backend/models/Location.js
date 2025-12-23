const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['showroom', 'factory', 'office'], default: 'showroom' },
    address: {
        street: String,
        city: { type: String, required: true },
        state: String,
        country: { type: String, default: 'India' },
        zipCode: String
    },
    contact: {
        phone: String,
        email: String,
        whatsapp: String
    },
    coordinates: {
        latitude: Number,
        longitude: Number
    },
    images: [{
        url: String,
        publicId: String,
        alt: String
    }],
    openingHours: {
        monday: String,
        tuesday: String,
        wednesday: String,
        thursday: String,
        friday: String,
        saturday: String,
        sunday: String
    },
    features: [String], // ['Parking', 'AC', 'Display Room', etc.]
    description: String,
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 }
}, { timestamps: true });

// Indexes
LocationSchema.index({ 'address.city': 1, isActive: 1 });
LocationSchema.index({ type: 1, isActive: 1 });

module.exports = mongoose.model('Location', LocationSchema);
