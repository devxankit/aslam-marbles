const mongoose = require('mongoose');
const LiveInventory = require('../models/LiveInventory');
const connectDB = require('../config/db');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load env BEFORE requiring cloudinary util to ensure keys are present
dotenv.config({ path: path.join(__dirname, '..', '.env') });

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('\n❌ CRITICAL ERROR: Cloudinary credentials missing in .env file.');
    console.error('Please ensure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are set.\n');
    process.exit(1);
}

const { cloudinary, uploadLocalFile } = require('../utils/cloudinary');

// Helper to upload image to Cloudinary (using util)
const uploadImageToCloudinary = async (imagePath) => {
    try {
        // Use the utility function which handles file upload
        const result = await uploadLocalFile(imagePath, 'stone-art/inventory/slabs');

        return {
            url: result.secure_url,
            publicId: result.public_id,
            alt: path.basename(imagePath, path.extname(imagePath))
        };
    } catch (error) {
        console.error(`Error uploading ${imagePath}:`, error.message);
        return null;
    }
};

const seed = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Clear existing inventory
        await LiveInventory.deleteMany({});
        console.log('🗑️  Cleared existing Live Inventory\n');

        const assetsPath = path.join(__dirname, '../../frontend/src/assets/house of marble');

        if (!fs.existsSync(assetsPath)) {
            console.error('Asset folder not found:', assetsPath);
            process.exit(1);
        }

        const files = fs.readdirSync(assetsPath).filter(file => {
            return ['.png', '.jpg', '.jpeg', '.webp'].includes(path.extname(file).toLowerCase());
        });

        console.log(`📸 Found ${files.length} images for inventory\n`);
        console.log(`📤 Uploading to Cloudinary...`);

        const slabNames = [
            'Statuario Marble', 'Michelangelo Marble', 'Calacatta Gold',
            'Bottocino Classico', 'Grey William', 'Black Marquina',
            'Travertine Beige', 'Onyx Pink', 'Indian Green Marble'
        ];

        const categories = ['Italian Marble', 'Indian Marble', 'Granite', 'Onyx', 'Travertine'];

        let totalSeeded = 0;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const imagePath = path.join(assetsPath, file);

            const uploadedImage = await uploadImageToCloudinary(imagePath);

            if (uploadedImage) {
                const randomName = slabNames[i % slabNames.length] + ' ' + (Math.floor(Math.random() * 100) + 1);
                const randomCategory = categories[i % categories.length];

                const item = new LiveInventory({
                    name: randomName,
                    category: randomCategory,
                    price: Math.floor(Math.random() * 50000) + 10000, // Random price between 10k and 60k
                    image: {
                        url: uploadedImage.url,
                        alt: randomName
                    },
                    specifications: {
                        dimensions: `${Math.floor(Math.random() * 5 + 5)}' x ${Math.floor(Math.random() * 3 + 3)}'`,
                        quantity: `${Math.floor(Math.random() * 50 + 10)} Slabs`,
                        origin: randomCategory.includes('Italian') ? 'Italy' : 'India',
                        finish: 'Polished'
                    },
                    status: 'Available',
                    displayOrder: i + 1,
                    isPublic: true
                });

                await item.save();
                totalSeeded++;
                process.stdout.write(`\r   Product ${i + 1}/${files.length}: ${item.name} created`);
            }
        }

        if (totalSeeded === 0) {
            console.error('\n❌ No items were seeded. Please check if the assets folder contains images or if Cloudinary upload is failing.');
            process.exit(1);
        }

        console.log('\n\n🎉 SEEDING COMPLETED SUCCESSFULLY!');
        process.exit(0);

    } catch (err) {
        console.error('\n❌ Error during seeding:', err);
        process.exit(1);
    }
};

seed();
