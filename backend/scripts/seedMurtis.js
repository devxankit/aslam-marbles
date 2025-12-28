const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const MurtiGroup = require('../models/MurtiGroup');
const MurtiCategory = require('../models/MurtiCategory');
const MurtiProduct = require('../models/MurtiProduct');
const MurtiPage = require('../models/MurtiPage');
const connectDB = require('../config/db');

dotenv.config();

// Cloudinary Config
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('\n❌ CRITICAL ERROR: Cloudinary credentials missing in .env file.');
    console.error('Please ensure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are set.\n');
    process.exit(1);
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const ASSETS_BASE = path.join(__dirname, '../../frontend/src/assets/ourcreation/murti');

const uploadImage = async (filePath, folder) => {
    try {
        if (!fs.existsSync(filePath)) {
            console.warn(`File not found: ${filePath}`);
            return null;
        }
        const result = await cloudinary.uploader.upload(filePath, {
            folder: `stone-art/murtis/${folder}`,
            use_filename: true,
            unique_filename: true
        });
        return result.secure_url;
    } catch (error) {
        console.error(`Upload error for ${filePath}:`, error.message);
        return null;
    }
};

const hierarchyData = [
    {
        group: 'GODS',
        categories: [
            { name: 'Krishna ji', id: 'krishna-ji' },
            { name: 'Natraja', id: 'natraja' },
            { name: 'Shiva', id: 'shiva' },
            { name: 'Ganesha', id: 'ganesha' },
            { name: 'Buddha', id: 'buddha' },
            { name: 'Sai Baba', id: 'sai-baba' },
            { name: 'Balaji', id: 'balaji' },
            { name: 'Hanuman ji', id: 'hanuman' },
            { name: 'Vishnu ji', id: 'vishnu-ji' },
            { name: 'Nandi', id: 'nandi' },
            { name: 'Jain Gods', id: 'jain-gods' },
            { name: 'Laddu Gopal', id: 'laddu-gopal' }
        ]
    },
    {
        group: 'GODDESSES',
        categories: [
            { name: 'Durga', id: 'durga' },
            { name: 'Kali', id: 'kali' },
            { name: 'Laxmi', id: 'laxmi' },
            { name: 'Saraswati', id: 'saraswati' },
            { name: 'Radha', id: 'radha' }
        ]
    },
    {
        group: 'PAIRS',
        categories: [
            { name: 'Ram Darbar', id: 'ram-darbar' },
            { name: 'Shiv Parivar', id: 'shiv-parivar' },
            { name: 'Ganesh Laxmi', id: 'ganesh-laxmi' },
            { name: 'Ganesh Laxmi Saraswati', id: 'ganesh-laxmi-saraswati' },
            { name: 'Radha Krishna', id: 'radha-krishna' },
            { name: 'Vishnu Laxmi', id: 'vishnu-laxmi' },
            { name: 'Jugal Jodi', id: 'jugal-jodi' }
        ]
    },
    {
        group: 'HOLY COW',
        categories: [
            { name: 'NANDI', id: 'nandi-cow' }
        ]
    }
];

const seedMurtis = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        // 1. Seed Murti Page (Main)
        const heroImagePath = path.join(ASSETS_BASE, 'heading.png');
        const heroImageUrl = await uploadImage(heroImagePath, 'page-headers');

        await MurtiPage.deleteMany({});
        await MurtiPage.create({
            heroSection: {
                image: { url: heroImageUrl || 'https://via.placeholder.com/1920x600', alt: 'Murtis Collection' },
                title: 'Welcome to Aslam Marble Suppliers — Your Trusted Source for Premium Marble Creations',
                subtitle: 'Exquisite Stone Art & Divine Craftsmanship',
                description: 'Explore our vast collection of divine murtis and spiritual stone art.'
            }
        });
        console.log('Murti Page data seeded.');

        // 2. Seed Groups and Categories
        await MurtiGroup.deleteMany({});
        await MurtiCategory.deleteMany({});

        for (let i = 0; i < hierarchyData.length; i++) {
            const groupData = hierarchyData[i];
            const group = await MurtiGroup.create({
                name: groupData.group,
                displayOrder: i
            });
            console.log(`Created Group: ${group.name}`);

            for (let j = 0; j < groupData.categories.length; j++) {
                const catData = groupData.categories[j];

                // Try to find a folder for this category to get a hero image
                // Mapping folder names
                const folderMap = {
                    'krishna-ji': 'krishna',
                    'shiva': 'shiv',
                    'ganesha': 'ganesha',
                    'sai-baba': 'saibaba',
                    'hanuman': 'hanuman',
                    'jain-gods': 'jain murti',
                    'durga': 'durga devi',
                    'saraswati': 'sarswati devi',
                    'ram-darbar': 'ram darbar',
                    'shiv-parivar': 'shiv parvati',
                    'radha-krishna': 'radha krishna',
                    'vishnu-laxmi': 'lakshmi', // sharing for now
                    'jugal-jodi': 'yugal',
                    'nandi': 'nandi',
                    'nandi-cow': 'nandi'
                };

                const folderName = folderMap[catData.id] || catData.id;
                const catFolderPath = path.join(ASSETS_BASE, folderName);
                let catHeroUrl = '';

                if (fs.existsSync(catFolderPath)) {
                    const files = fs.readdirSync(catFolderPath);
                    const firstImage = files.find(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));
                    if (firstImage) {
                        catHeroUrl = await uploadImage(path.join(catFolderPath, firstImage), `categories/${catData.id}`);
                    }
                }

                await MurtiCategory.create({
                    groupId: group._id,
                    id: catData.id,
                    name: catData.name,
                    displayOrder: j,
                    heroSection: {
                        image: { url: catHeroUrl || 'https://via.placeholder.com/1200x400', alt: catData.name },
                        title: `Discover ${catData.name} Murtis`,
                        subtitle: 'Spiritual and Artistic Excellence',
                        description: `Handcrafted ${catData.name} statues for your sacred space.`
                    }
                });
                console.log(`   - Created Category: ${catData.name}`);
            }
        }

        console.log('Seeding completed successfully!');
        process.exit();
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedMurtis();
