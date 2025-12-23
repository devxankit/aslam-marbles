const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { cloudinary } = require('../utils/cloudinary');
const AboutUs = require('../models/AboutUs');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.join(__dirname, '../.env') });

const heroPath = "c:\\Users\\victus\\Desktop\\StoneArt\\my-project\\src\\assets\\house of marble\\about us\\heading\\Gemini_Generated_Image_ipme0eipme0eipme (1).png";
const introPath = "c:\\Users\\victus\\Desktop\\StoneArt\\my-project\\src\\assets\\house of marble\\about us\\Screenshot 2025-12-10 131359.png";

async function uploadToCloudinary(filePath, folder) {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return null;
    }
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folder,
            resource_type: 'image'
        });
        return {
            url: result.secure_url,
            publicId: result.public_id
        };
    } catch (error) {
        console.error(`Error uploading ${filePath}:`, error);
        return null;
    }
}

async function migrate() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        console.log('Uploading Hero Background...');
        const heroBg = await uploadToCloudinary(heroPath, 'about-us');

        console.log('Uploading Intro Image...');
        const introImg = await uploadToCloudinary(introPath, 'about-us');

        if (!heroBg || !introImg) {
            console.error('Failed to upload one or more images. Aborting DB update.');
            mongoose.connection.close();
            return;
        }

        let content = await AboutUs.findOne();
        if (content) {
            // Optional: Delete old ones if they were real
            // await deleteByPublicId(content.heroBgImage.publicId);
            // await deleteByPublicId(content.introImage.publicId);

            content.heroBgImage = heroBg;
            content.introImage = introImg;
            await content.save();
            console.log('Database updated with new Cloudinary URLs');
        } else {
            await AboutUs.create({
                heroBgImage: heroBg,
                introImage: introImg
            });
            console.log('New AboutUs record created with Cloudinary URLs');
        }

        console.log('Migration complete successfully!');
        mongoose.connection.close();
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

migrate();
