const mongoose = require('mongoose');
const LiveInventory = require('../models/LiveInventory');
const LiveInventoryPage = require('../models/LiveInventoryPage');
const connectDB = require('../config/db');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '.env') });
const { uploadLocalFile } = require('../utils/cloudinary');

const seedFull = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Assets Paths
        const assetsBase = path.join(__dirname, '../../frontend/src/assets/services/live inventory');
        const heroImagePath = path.join(assetsBase, 'inventory1.png');
        const horizontalImagePath = path.join(assetsBase, 'inventory2.png');
        const sideImagePath = path.join(assetsBase, 'inventory3.png');

        // 1. Seed Page Settings (Hero & Horizontal Images)
        console.log('📝 Seeding Live Inventory Page Settings...');

        // Upload images if they exist
        let heroUploaded = null;
        let horizontalUploaded = null;

        if (fs.existsSync(heroImagePath)) {
            console.log('Uploading Hero Image...');
            heroUploaded = await uploadLocalFile(heroImagePath, 'stone-art/inventory/page');
        }

        if (fs.existsSync(horizontalImagePath)) {
            console.log('Uploading Horizontal Image...');
            horizontalUploaded = await uploadLocalFile(horizontalImagePath, 'stone-art/inventory/page');
        }

        const settingsData = {
            headSection: {
                title: 'Live Inventory',
                subtitle: 'Exclusive Marble Collection',
                description: 'Explore our real-time stock of premium natural stones. From rare Italian marble to exquisite Indian granite, find the perfect slab for your dream project.'
            },
            horizontalSection: {}
        };

        if (heroUploaded) {
            settingsData.headSection.heroImage = {
                url: heroUploaded.secure_url,
                publicId: heroUploaded.public_id
            };
        }

        if (horizontalUploaded) {
            settingsData.horizontalSection.image = {
                url: horizontalUploaded.secure_url,
                publicId: horizontalUploaded.public_id
            };
        }

        // Upsert Settings
        await LiveInventoryPage.deleteMany({});
        await LiveInventoryPage.create(settingsData);
        console.log('✅ Page Settings Seeded');


        // 2. Seed Inventory Products
        console.log('\n📦 Seeding Inventory Products...');
        await LiveInventory.deleteMany({}); // Clear existing

        const slabNames = [
            'Statuario Marble', 'Michelangelo Marble', 'Calacatta Gold',
            'Bottocino Classico', 'Grey William', 'Black Marquina',
            'Travertine Beige', 'Onyx Pink', 'Indian Green Marble'
        ];
        const categories = ['Italian Marble', 'Indian Marble', 'Granite', 'Onyx', 'Travertine'];

        // We will reuse the inventory images for products for demo purposes if we don't have separate product images
        // Assuming inventory1, inventory2, inventory3 are the only available images
        const availableImages = [heroImagePath, horizontalImagePath, sideImagePath].filter(p => fs.existsSync(p));

        if (availableImages.length === 0) {
            console.warn('⚠️ No images found specific to live inventory products. Skipping product seeding.');
        } else {
            for (let i = 0; i < 9; i++) {
                const randomName = slabNames[i % slabNames.length] + ' ' + (i + 1);
                const randomCategory = categories[i % categories.length];
                const imagePath = availableImages[i % availableImages.length];

                const uploaded = await uploadLocalFile(imagePath, 'stone-art/inventory/products');

                if (uploaded) {
                    await LiveInventory.create({
                        name: randomName,
                        category: randomCategory,
                        price: Math.floor(Math.random() * 50000) + 10000,
                        image: {
                            url: uploaded.secure_url,
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
                    process.stdout.write(`\r   Product ${i + 1}/9 created`);
                }
            }
        }

        console.log('\n\n🎉 Full Seeding Completed!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error Seeding:', error);
        process.exit(1);
    }
};

seedFull();
