const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const TrustedBy = require('../models/TrustedBy');
const { cloudinary } = require('../utils/cloudinary');

dotenv.config({ path: path.join(__dirname, '../.env') });

// Local image paths
const imagePaths = [
    path.join(__dirname, '../../my-project/src/assets/house of marble/our client/icons/download.png'),
    path.join(__dirname, '../../my-project/src/assets/house of marble/our client/icons/download (1).png'),
    path.join(__dirname, '../../my-project/src/assets/house of marble/our client/icons/download (2).png'),
    path.join(__dirname, '../../my-project/src/assets/house of marble/our client/icons/download (3).png'),
    path.join(__dirname, '../../my-project/src/assets/house of marble/our client/icons/download (4).png')
];

const companyNames = [
    'Company 1',
    'Company 2',
    'Company 3',
    'Company 4',
    'Company 5'
];

const uploadImageToCloudinary = async (imagePath) => {
    try {
        // Read image file and convert to base64
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(base64Image, {
            folder: 'trusted-by/logos',
            transformation: [
                { width: 300, height: 300, crop: 'limit' },
                { quality: 'auto', fetch_format: 'auto' }
            ]
        });

        return {
            url: result.secure_url,
            publicId: result.public_id
        };
    } catch (error) {
        console.error(`Error uploading image ${imagePath}:`, error.message);
        throw error;
    }
};

const seedTrustedBy = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await TrustedBy.deleteMany({});
        console.log('Cleared existing Trusted By data');

        console.log('Starting Trusted By seeding...');
        console.log('Uploading company logos to Cloudinary...');

        const companies = [];

        for (let i = 0; i < imagePaths.length; i++) {
            const imagePath = imagePaths[i];

            if (!fs.existsSync(imagePath)) {
                console.log(`Image not found: ${imagePath}, skipping...`);
                continue;
            }

            console.log(`Uploading logo ${i + 1}/${imagePaths.length}...`);

            const logoData = await uploadImageToCloudinary(imagePath);

            companies.push({
                name: companyNames[i],
                logo: logoData,
                order: i
            });

            console.log(`Logo ${i + 1} uploaded successfully`);
        }

        // Create TrustedBy document
        const trustedBy = new TrustedBy({
            heading: 'Trusted By',
            companies: companies,
            isActive: true
        });

        await trustedBy.save();

        console.log('✅ Trusted By seeded successfully!');
        console.log(`- Uploaded ${companies.length} company logos`);
        console.log('- All logos stored on Cloudinary');
        console.log('- Database populated with company data');

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding Trusted By:', error);
        process.exit(1);
    }
};

seedTrustedBy();
