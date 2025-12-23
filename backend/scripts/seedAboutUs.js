const mongoose = require('mongoose');
const dotenv = require('dotenv');
const AboutUs = require('../models/AboutUs');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedAboutUs = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const exists = await AboutUs.findOne();
        if (exists) {
            console.log('About Us content already exists. Skipping seeding.');
        } else {
            await AboutUs.create({
                heroBgImage: {
                    url: 'https://res.cloudinary.com/demo/image/upload/v1625213232/sample.jpg', // Placeholder or real initial URL
                    publicId: 'initial_hero_bg'
                },
                introImage: {
                    url: 'https://res.cloudinary.com/demo/image/upload/v1625213232/sample.jpg',
                    publicId: 'initial_intro_img'
                }
            });
            console.log('About Us initial content seeded');
        }

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding About Us:', error);
        process.exit(1);
    }
};

seedAboutUs();
