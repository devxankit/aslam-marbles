const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const JainTemples = require('./models/JainTemples');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const seedJainTemples = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const assetsBase = path.join(__dirname, '..', 'my-project', 'src', 'assets', 'ourcreation', 'jain temple');

        // 1. Upload Hero Image
        const heroPath = path.join(assetsBase, 'heading', 'SMT01780-Edit_6ebd2fd8-7aa4-4df4-b841-2cb2e362337e_large.jpeg');
        console.log('Uploading hero image...');
        const heroResult = await cloudinary.uploader.upload(heroPath, { folder: 'jain-temples' });

        // 2. Upload Gallery Images
        const galleryDir = path.join(assetsBase, 'IMAGES');
        const galleryFiles = [
            { name: 'White-Marble-Jain-Temple..jpg', title: 'White Marble Jain Temple', location: 'India' },
            { name: 'download.jpeg', title: 'Intricate Temple Carvings', location: 'Rajasthan' },
            { name: 'images.jpeg', title: 'Traditional Temple Facade', location: 'Gujarat' },
            { name: 'jain-marble-temple-1669892609-6651478.jpeg', title: 'Marble Temple Interior', location: 'India' },
            { name: 'marble-swethamber-jain-temple-in-india.jpg', title: 'Swethamber Jain Temple', location: 'India' }
        ];

        const projects = [];
        for (const file of galleryFiles) {
            console.log(`Uploading ${file.name}...`);
            const res = await cloudinary.uploader.upload(path.join(galleryDir, file.name), { folder: 'jain-temples/projects' });
            projects.push({
                title: file.title,
                location: file.location,
                description: `Beautifully crafted ${file.title.toLowerCase()} showcased in ${file.location}.`,
                image: {
                    url: res.secure_url,
                    publicId: res.public_id
                }
            });
        }

        // 3. Prepare data
        let jainData = await JainTemples.findOne();
        if (!jainData) {
            jainData = new JainTemples();
        }

        jainData.heroSection = {
            title: 'JAIN TEMPLES',
            subtitle: 'Designing Sacred Spaces with Timeless Elegance',
            image: {
                url: heroResult.secure_url,
                publicId: heroResult.public_id,
                alt: 'Jain Temples Hero'
            }
        };

        jainData.projectsSection = {
            title: 'Our Jain Temple Projects',
            description: 'Showcasing our beautiful Jain temples that bring divine energy into refined spaces through exquisite design and timeless craftsmanship.',
            projects: projects
        };

        jainData.isActive = true;
        jainData.lastUpdated = Date.now();

        await jainData.save();
        console.log('Jain Temples data seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Seed failed:', error);
        process.exit(1);
    }
};

seedJainTemples();
