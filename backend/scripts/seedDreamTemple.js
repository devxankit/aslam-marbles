const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const DreamTemple = require('../models/DreamTemple');
const { uploadLocalFile } = require('../utils/cloudinary');

// Load env vars
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in .env');
    process.exit(1);
}

const HERO_IMAGE_PATH = 'c:\\Users\\victus\\Desktop\\StoneArt\\my-project\\src\\assets\\house of marble\\temple\\1733300646054.jpeg';
const COLLECTION_IMAGES_DIR = 'c:\\Users\\victus\\Desktop\\StoneArt\\my-project\\src\\assets\\locationicons\\templecardimages';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const seedDreamTemple = async () => {
    console.log('--- Seeding Dream Temple Page Data ---');
    try {
        let dreamTemple = await DreamTemple.findOne();
        if (!dreamTemple) {
            console.log('Creating new DreamTemple document...');
            dreamTemple = new DreamTemple();
        }

        // 1. Upload Hero Image
        console.log('Uploading Hero Image...');
        if (fs.existsSync(HERO_IMAGE_PATH)) {
            const result = await uploadLocalFile(HERO_IMAGE_PATH, 'dream-temple');
            dreamTemple.heroSection = {
                image: { url: result.secure_url, alt: 'Dream Temple Hero' },
                title: 'DREAM TEMPLES',
                subtitle: 'Crafting Sacred Spaces with Timeless Elegance',
                description: 'Experience the perfect blend of traditional craftsmanship and modern design in our exquisite marble temple collection.'
            };
            console.log('Hero image uploaded.');
        } else {
            console.log('Hero image not found at:', HERO_IMAGE_PATH);
        }

        // 2. Upload Collection Images
        console.log('Uploading Collection Images...');
        const collectionData = [
            { file: 'dreams1.jpeg', size: '3ft Wide', price: '2.85L', fullPrice: 285000, description: '3ft Wide Temples' },
            { file: 'dreams2.jpeg', size: '4ft Wide', price: '4.95L', fullPrice: 495000, description: '4ft Wide Temples' },
            { file: 'dreams3.jpeg', size: '5ft Wide', price: '6.95L', fullPrice: 695000, description: '5ft Wide Temples' },
            { file: 'dreams4.jpeg', size: '6ft Wide &', price: '8.95L', fullPrice: 895000, description: '6ft Wide & Above Temples' }
        ];

        const uploadedCollection = [];
        for (const item of collectionData) {
            const fullPath = path.join(COLLECTION_IMAGES_DIR, item.file);
            if (fs.existsSync(fullPath)) {
                console.log(`Uploading ${item.file}...`);
                const result = await uploadLocalFile(fullPath, 'dream-temple');
                uploadedCollection.push({
                    image: { url: result.secure_url, alt: item.description },
                    size: item.size,
                    price: item.price,
                    fullPrice: item.fullPrice,
                    description: item.description
                });
            } else {
                console.log(`Image not found: ${fullPath}`);
            }
        }

        if (uploadedCollection.length > 0) {
            dreamTemple.collection = uploadedCollection;
        }

        dreamTemple.lastUpdated = Date.now();
        await dreamTemple.save();
        console.log('Dream Temple page data saved successfully.');

    } catch (error) {
        console.error('Error seeding Dream Temple data:', error);
    }
};

const run = async () => {
    await connectDB();
    await seedDreamTemple();
    console.log('Seeding completed. Exiting...');
    process.exit(0);
};

run();
