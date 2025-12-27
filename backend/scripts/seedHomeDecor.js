const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const HomeDecorGroup = require('../models/HomeDecorGroup');
const HomeDecorCategory = require('../models/HomeDecorCategory');
const HomeDecorPage = require('../models/HomeDecorPage');
const connectDB = require('../config/db');

dotenv.config();

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const ASSETS_BASE = path.join(__dirname, '../../frontend/src/assets/ourcreation/home decore');

const uploadImage = async (filePath, folder) => {
    try {
        if (!fs.existsSync(filePath)) {
            console.warn(`File not found: ${filePath}`);
            return null;
        }
        const result = await cloudinary.uploader.upload(filePath, {
            folder: `home-decor/${folder}`,
            use_filename: true,
            unique_filename: true
        });
        return result.secure_url;
    } catch (error) {
        console.error(`Upload error for ${filePath}:`, error.message);
        return null;
    }
};

// Categories based on the image provided
const hierarchyData = [
    {
        group: 'FURNITURE',
        categories: [
            { name: 'Dining Tables', id: 'dining-tables', folder: 'center table' },
            { name: 'Center Tables', id: 'center-tables', folder: 'center table' },
            { name: 'Side Tables', id: 'side-tables', folder: 'center table' },
            { name: 'Marble Chair', id: 'marble-chair', folder: 'center table' },
            { name: 'Pedestal Columns', id: 'pedestal-columns', folder: 'pestal colums' },
            { name: 'Fire Places', id: 'fire-places', folder: 'fire places' }
        ]
    },
    {
        group: 'POTS | VASES',
        categories: [
            { name: 'Tulsi Gamla', id: 'tulsi-gamla', folder: 'pots&vases' },
            { name: 'Pots & Vases', id: 'pots-vases', folder: 'pots&vases' }
        ]
    },
    {
        group: 'SCULPTURES',
        categories: [
            { name: 'Indoor Sculptures', id: 'indoor-sculptures', folder: 'sculpture' },
            { name: 'Outdoor Sculptures', id: 'outdoor-sculptures', folder: 'sculpture' }
        ]
    },
    {
        group: 'TABLEWARE',
        categories: [
            { name: 'Mortar & Pestle', id: 'mortar-pestle', folder: 'tablesware' },
            { name: 'Bowls', id: 'bowls', folder: 'bowls' },
            { name: 'Tray', id: 'tray', folder: 'tablesware' },
            { name: 'Coasters', id: 'coasters', folder: 'tablesware' },
            { name: 'Candle Holders', id: 'candle-holders', folder: 'tablesware' },
            { name: 'Kitchen Accessories', id: 'kitchen-accessories', folder: 'tablesware' }
        ]
    },
    {
        group: 'BATHROOM SETS',
        categories: [
            { name: 'Bathroom Accessories', id: 'bathroom-accessories', folder: 'bathroom sets' },
            { name: 'Stone Sinks', id: 'stone-sinks', folder: 'bathroom sets' }
        ]
    },
    {
        group: 'OFFICE & DESK',
        categories: [
            { name: 'Bookends', id: 'bookends', folder: 'office desk' },
            { name: 'Photo Frames', id: 'photo-frames', folder: 'office desk' }
        ]
    },
    {
        group: 'GAMES & LEISURE',
        categories: [
            { name: 'Chess Sets', id: 'chess-sets', folder: 'games' },
            { name: 'Ludo', id: 'ludo', folder: 'games' },
            { name: 'Tic-Tac-Toe', id: 'tic-tac-toe', folder: 'games' }
        ]
    },
    {
        group: 'WALL ART',
        categories: [
            { name: '3D Wall Murals', id: '3d-wall-murals', folder: 'wall' },
            { name: 'Inlay Wall Art', id: 'inlay-wall-art', folder: 'wall' }
        ]
    }
];

const seedHomeDecor = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected\n');

        // 1. Seed Home Decor Page (Main)
        const heroImagePath = path.join(ASSETS_BASE, 'heading.png');
        const heroImageUrl = await uploadImage(heroImagePath, 'page-headers');

        await HomeDecorPage.deleteMany({});
        await HomeDecorPage.create({
            heroSection: {
                image: { url: heroImageUrl || 'https://via.placeholder.com/1920x600', alt: 'Home Decor Collection' },
                title: 'Exquisite Home Decor Collection',
                subtitle: 'Transform Your Space with Timeless Marble Artistry',
                description: 'Discover our curated collection of premium marble home decor pieces.'
            }
        });
        console.log('✅ Home Decor Page data seeded.\n');

        // 2. Seed Groups and Categories
        await HomeDecorGroup.deleteMany({});
        await HomeDecorCategory.deleteMany({});

        for (let i = 0; i < hierarchyData.length; i++) {
            const groupData = hierarchyData[i];
            const group = await HomeDecorGroup.create({
                name: groupData.group,
                displayOrder: i
            });
            console.log(`📦 Created Group: ${group.name}`);

            for (let j = 0; j < groupData.categories.length; j++) {
                const catData = groupData.categories[j];

                // Try to find images in the folder
                const catFolderPath = path.join(ASSETS_BASE, catData.folder);
                let catHeroUrl = '';

                if (fs.existsSync(catFolderPath)) {
                    const files = fs.readdirSync(catFolderPath);
                    const firstImage = files.find(f =>
                        f.endsWith('.png') || f.endsWith('.jpg') ||
                        f.endsWith('.jpeg') || f.endsWith('.webp')
                    );
                    if (firstImage) {
                        catHeroUrl = await uploadImage(
                            path.join(catFolderPath, firstImage),
                            `categories/${catData.id}`
                        );
                    }
                }

                await HomeDecorCategory.create({
                    groupId: group._id,
                    id: catData.id,
                    name: catData.name,
                    displayOrder: j,
                    heroSection: {
                        image: {
                            url: catHeroUrl || 'https://via.placeholder.com/1200x400',
                            alt: catData.name
                        },
                        title: `Discover ${catData.name}`,
                        subtitle: 'Premium Marble Craftsmanship',
                        description: `Explore our collection of exquisite ${catData.name.toLowerCase()}.`
                    }
                });
                console.log(`   ✓ Created Category: ${catData.name}`);
            }
        }

        console.log('\n🎉 Seeding completed successfully!');
        console.log(`📊 Summary:`);
        console.log(`   • Groups created: ${hierarchyData.length}`);
        console.log(`   • Categories created: ${hierarchyData.reduce((sum, g) => sum + g.categories.length, 0)}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
};

seedHomeDecor();
