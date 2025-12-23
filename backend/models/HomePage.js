const mongoose = require('mongoose');

const HomePageSchema = new mongoose.Schema({
    heroSection: {
        video: {
            url: String,
            publicId: String,
            resourceType: { type: String, default: 'video' }
        },
        mainHeading: { type: String, default: 'Crafting Divine Spaces' },
        subHeading: { type: String, default: 'Where Faith Meets Fine Marble' },
        supplierText: { type: String, default: '– Aslam Marble Suppliers' },
        images: [{
            url: String,
            publicId: String,
            alt: String
        }],
        title: String,
        subtitle: String,
        description: String,
        ctaText: String,
        ctaLink: String
    },
    // Videos Section - "Welcome to the World aslam marble suppliers"
    videosSection: {
        heading: { type: String, default: 'Welcome to the World aslam marble suppliers' },
        videos: [{
            url: String,
            publicId: String,
            resourceType: { type: String, default: 'video' }
        }]
    },
    // Before and After Section
    beforeAfterSection: {
        heading: { type: String, default: 'Before and After' },
        description: { type: String, default: 'Witness the transformation from a blank canvas to a serene sanctuary with Tilak Stone Arts India. Our skilled artisans turn raw spaces into exquisite pooja rooms, reflecting spirituality and elegance. See the remarkable difference quality and craftsmanship can make.' },
        beforeImage: {
            url: String,
            publicId: String,
            alt: { type: String, default: 'Before Image' }
        },
        afterImage: {
            url: String,
            publicId: String,
            alt: { type: String, default: 'After Image' }
        }
    },
    // Completed Custom Projects Section
    completedProjectsSection: {
        heading: { type: String, default: 'COMPLETED CUSTOM PROJECTS' },
        backgroundImage: {
            url: String,
            publicId: String,
            alt: { type: String, default: 'Completed Projects Background' }
        },
        stats: {
            projects: { type: Number, default: 950 },
            cities: { type: Number, default: 350 },
            yearsExperience: { type: Number, default: 25 }
        }
    },
    featuredProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'featuredProductModel'
    }],
    featuredProductModel: {
        type: String,
        enum: ['StoneProduct', 'MurtiProduct', 'HomeDecorProduct']
    },
    featuredProjects: [{
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'featuredProjectModel'
    }],
    featuredProjectModel: {
        type: String,
        enum: ['CommunalProjects', 'ResidentialProjects', 'InternationalProjects']
    },
    stats: {
        projectsCompleted: { type: Number, default: 0 },
        happyClients: { type: Number, default: 0 },
        yearsExperience: { type: Number, default: 0 },
        teamMembers: { type: Number, default: 0 }
    },
    aboutSection: {
        title: String,
        description: String,
        image: {
            url: String,
            publicId: String,
            alt: String
        }
    },
    whyChooseUs: [{
        title: String,
        description: String,
        icon: String
    }],
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('HomePage', HomePageSchema);
