const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs').promises;
const Careers = require('../models/Careers');
const { uploadBuffer } = require('../utils/cloudinary');

dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected for seeding careers data');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const seedCareers = async () => {
    try {
        console.log('Starting careers data seeding...');

        // Define image paths
        const heroImagePath = path.join(__dirname, '../../my-project/src/assets/house of marble/careers/SMT01780-Edit_6ebd2fd8-7aa4-4df4-b841-2cb2e362337e_large.jpeg');
        const trainingImagePath = path.join(__dirname, '../../my-project/src/assets/house of marble/careers/1708509016923_large.jpeg');

        // Read images
        console.log('Reading hero image...');
        const heroImageBuffer = await fs.readFile(heroImagePath);

        console.log('Reading training image...');
        const trainingImageBuffer = await fs.readFile(trainingImagePath);

        // Upload images to Cloudinary
        console.log('Uploading hero image to Cloudinary...');
        const heroImageResult = await uploadBuffer(heroImageBuffer, 'careers/hero');

        console.log('Uploading training image to Cloudinary...');
        const trainingImageResult = await uploadBuffer(trainingImageBuffer, 'careers/training');

        // Define Why Join Us data
        const whyJoinUs = [
            {
                icon: '🎯',
                title: 'Growth Opportunities',
                description: 'Continuous learning and career development in a supportive environment. We invest in your professional growth.'
            },
            {
                icon: '🤝',
                title: 'Team Culture',
                description: 'Work with passionate professionals dedicated to preserving traditional craftsmanship and creating excellence.'
            },
            {
                icon: '✨',
                title: 'Meaningful Work',
                description: 'Create lasting masterpieces that honor tradition and inspire generations. Your work will stand the test of time.'
            }
        ];

        // Define Benefits data
        const benefits = [
            { icon: '💰', title: 'Competitive Salary', description: 'Fair compensation packages' },
            { icon: '🏥', title: 'Health Insurance', description: 'Medical coverage for family' },
            { icon: '📚', title: 'Training Programs', description: 'Skill development' },
            { icon: '🎁', title: 'Performance Bonus', description: 'Rewards for excellence' },
            { icon: '🏖️', title: 'Paid Time Off', description: 'Work-life balance' },
            { icon: '🍽️', title: 'Meal Facilities', description: 'On-site dining options' },
            { icon: '🚗', title: 'Transportation', description: 'Commute assistance' },
            { icon: '🎉', title: 'Team Events', description: 'Regular celebrations' }
        ];

        // Define Jobs data
        const jobs = [
            {
                title: 'Architect',
                experience: '1 to 3 years',
                location: 'Makrana, Rajasthan',
                type: 'Full-time',
                description: 'We are looking for a skilled Senior Architect with extensive experience in designing sacred spaces and temple architecture. The ideal candidate should have a deep understanding of traditional Indian architecture and modern design principles.',
                requirements: [
                    'Bachelor\'s or Master\'s degree in Architecture',
                    'Proficiency in AutoCAD, SketchUp, and Revit',
                    'Strong portfolio of temple/sacred space designs',
                    'Excellent communication and presentation skills'
                ],
                category: 'architecture',
                isActive: true
            },
            {
                title: 'Video Editor',
                experience: '2 Years',
                location: 'Remote / On-site',
                type: 'Full-time',
                description: 'Join our creative team as a Video Editor to create compelling visual content showcasing our craftsmanship, projects, and brand story. You\'ll work on promotional videos, social media content, and documentary-style pieces.',
                requirements: [
                    'Proficiency in Adobe Premiere Pro, After Effects',
                    'Strong storytelling and editing skills',
                    'Portfolio demonstrating video editing capabilities',
                    'Creative mindset and attention to detail'
                ],
                category: 'creative',
                isActive: true
            },
            {
                title: 'Online Sales Representative',
                experience: '3 Years',
                location: 'Remote / On-site',
                type: 'Full-time',
                description: 'We need an experienced Online Sales Representative to help expand our digital presence and customer reach. You\'ll be responsible for managing online sales, customer relationships, and driving revenue growth.',
                requirements: [
                    'Proven track record in online sales',
                    'Excellent communication skills',
                    'Knowledge of CRM systems',
                    'Customer-focused approach'
                ],
                category: 'sales',
                isActive: true
            }
        ];

        // Delete existing careers data
        await Careers.deleteMany({});
        console.log('Deleted existing careers data');

        // Create new careers document
        const careersData = {
            heroImage: {
                url: heroImageResult.secure_url,
                publicId: heroImageResult.public_id
            },
            trainingImage: {
                url: trainingImageResult.secure_url,
                publicId: trainingImageResult.public_id
            },
            whyJoinUs,
            benefits,
            jobs
        };

        const careers = await Careers.create(careersData);
        console.log('Careers data seeded successfully!');
        console.log('Hero Image URL:', careers.heroImage.url);
        console.log('Training Image URL:', careers.trainingImage.url);
        console.log('Why Join Us items:', careers.whyJoinUs.length);
        console.log('Benefits items:', careers.benefits.length);
        console.log('Jobs:', careers.jobs.length);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding careers data:', error);
        process.exit(1);
    }
};

// Run the seed function
connectDB().then(() => {
    seedCareers();
});
