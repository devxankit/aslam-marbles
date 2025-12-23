const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const ExperienceCentre = require('../models/ExperienceCentre');

dotenv.config();

// Config Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async (filePath, folder) => {
    try {
        const fullPath = path.resolve(filePath);
        if (!fs.existsSync(fullPath)) {
            console.warn(`File not found: ${fullPath}`);
            return null;
        }
        const result = await cloudinary.uploader.upload(fullPath, {
            folder: folder,
            resource_type: 'image'
        });
        return {
            url: result.secure_url,
            publicId: result.public_id
        };
    } catch (error) {
        console.error(`Error uploading ${filePath}:`, error.message);
        return null;
    }
};

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Root assets directory (adjust based on your structure)
        const assetsDir = path.join(__dirname, '../../my-project/src/assets/house of marble/exprience');

        console.log('Uploading Hero Image...');
        const heroImage = await uploadImage(path.join(assetsDir, 'heading/Artisan.jpeg'), 'experience-centre/hero');

        console.log('Uploading Horizontal Images...');
        const h1 = await uploadImage(path.join(assetsDir, 'horizontal/446d311a-f90e-4837-b736-3f8e6a5f4b2c.png'), 'experience-centre/horizontal');
        const h2 = await uploadImage(path.join(assetsDir, 'horizontal/SMT01780-Edit_6ebd2fd8-7aa4-4df4-b841-2cb2e362337e_large.jpeg'), 'experience-centre/horizontal');
        const h3 = await uploadImage(path.join(assetsDir, 'horizontal/voice of devotion.jpg'), 'experience-centre/horizontal');

        const horizontalImages = [
            { ...(h1 || {}), caption: "Where the legacy of marble meets the soul of craftsmanship." },
            { ...(h2 || {}), caption: "Witness the intricate journey of stone transforming into spiritual art." },
            { ...(h3 || {}), caption: "Architectural elegance carved in the finest marble gems." }
        ].filter(img => img.url);

        console.log('Uploading Gallery Images...');
        const regularFileNames = [
            '06fcbe87-a149-445b-912c-6787ef4a4d50.png',
            '1708509016923_large.jpeg',
            '1733296958645.jpeg',
            '1733300646054.jpeg',
            '2d07e532-fa01-4e30-b638-52b26887f92c-small.jpeg',
            '4d2730d0-5d47-49f4-94b5-a8d151f7b39b.png',
            '8d836775-b2f6-4c0a-8ab4-5b7c27a36e55.png',
            '99e40aab-0df8-4175-ad0e-a0a94517b611-medium.jpeg',
            'large.jpeg',
            'result_0 (1).jpeg',
            'SMT01426-Edit_cc5ea55a-3771-4aa1-b484-c73f1cf8103e_large.jpeg',
            'SMT01696-Edit_46274549-fd77-4997-8cd6-0067340d0636_large.jpeg'
        ];

        const regularImages = [];
        for (const fileName of regularFileNames) {
            const result = await uploadImage(path.join(assetsDir, fileName), 'experience-centre/gallery');
            if (result) regularImages.push(result);
        }

        const data = {
            heroImage,
            horizontalImages,
            regularImages,
            mainCaption: "Step into our Experience Centre, where tradition meets innovation and craftsmanship comes to life. Our showroom is a sanctuary of marble artistry, showcasing the finest collection of handcrafted pieces that reflect decades of expertise and passion.",
            subCaption: "From elegant temple designs to exquisite home decor, our Experience Centre offers a curated journey through our portfolio. Each piece tells a story of devotion, precision, and artistic excellence.",
            journeyText: "The journey began with a simple idea to craft a space that would not only showcase our marble temples and stone art, but also immerse our visitors in the magic of creation.\n\nSpanning 8,000 square feet, our Experience Center is more than a display area. It is a curated environment showcasing a diverse range of premium marbles and stones, reflecting our commitment to reliability, consistency, and timeless material excellence.\n\nDesigned to support architects, designers, and homeowners alike, the center highlights our sourcing expertise, quality standards, and the enduring beauty of natural stone — empowering informed choices and confident creations."
        };

        await ExperienceCentre.deleteMany({});
        await ExperienceCentre.create(data);

        console.log('Successfully seeded Experience Centre data to Cloudinary and MongoDB!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedData();
