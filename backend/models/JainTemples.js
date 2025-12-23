const mongoose = require('mongoose');

const JainTemplesSchema = new mongoose.Schema({
    heroSection: {
        title: { type: String, default: 'JAIN TEMPLES' },
        subtitle: { type: String, default: 'Designing Sacred Spaces with Timeless Elegance' },
        image: {
            url: String,
            publicId: String,
            alt: { type: String, default: 'Jain Temples' }
        }
    },
    projectsSection: {
        title: { type: String, default: 'Our Jain Temple Projects' },
        description: { type: String, default: 'Showcasing our beautiful Jain temples that bring divine energy into refined spaces through exquisite design and timeless craftsmanship.' },
        projects: [{
            title: String,
            location: String,
            description: String,
            image: {
                url: String,
                publicId: String
            },
            client: { type: String, default: 'Private Client' },
            status: { type: String, default: 'Completed' }
        }]
    },
    isActive: { type: Boolean, default: true },
    lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('JainTemples', JainTemplesSchema);
