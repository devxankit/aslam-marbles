const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    general: {
        websiteName: { type: String, default: 'Tilak Stone Art' },
        contactEmail: { type: String, default: 'info@tilakstone.com' },
        contactPhone: { type: String, default: '+91 9876543210' },
        whatsappNumber: { type: String, default: '+91 9876543210' },
        logo: {
            url: String,
            publicId: String
        }
    },
    social: {
        facebook: { type: String, default: '' },
        instagram: { type: String, default: '' },
        twitter: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        youtube: { type: String, default: '' }
    },
    seo: {
        metaTitle: { type: String, default: '' },
        metaDescription: { type: String, default: '' },
        googleAnalytics: { type: String, default: '' }
    },
    email: {
        leadNotificationEmail: { type: String, default: 'admin@tilakstone.com' },
        notifyOnNewLeads: { type: Boolean, default: true },
        notifyOnAppointments: { type: Boolean, default: true }
    }
}, { timestamps: true });

module.exports = mongoose.model('Settings', SettingsSchema);
