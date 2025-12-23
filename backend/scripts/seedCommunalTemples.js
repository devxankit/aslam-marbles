const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const CommunalTemples = require('../models/CommunalTemples');
const { uploadLocalFile } = require('../utils/cloudinary');

dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const assetsPath = path.join(__dirname, '../../my-project/src/assets');

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await CommunalTemples.deleteMany({});
        console.log('Existing data cleared...');

        console.log('Uploading images to Cloudinary...');

        // 1. Hero Image
        const heroResult = await uploadLocalFile(
            path.join(assetsPath, 'ourcreation/communal temple/heading/8d836775-b2f6-4c0a-8ab4-5b7c27a36e55.png'),
            'communal-temples'
        );

        // 2. Why Choose Us Icons
        const turnkeyResult = await uploadLocalFile(
            path.join(assetsPath, 'ourcreation/communal temple/lcons/Gemini_Generated_Image_br9ai2br9ai2br9a.png'),
            'communal-temples/icons'
        );
        const templesMadeResult = await uploadLocalFile(
            path.join(assetsPath, 'ourcreation/communal temple/lcons/Gemini_Generated_Image_gifll4gifll4gifl.png'),
            'communal-temples/icons'
        );
        const siteSupervisionResult = await uploadLocalFile(
            path.join(assetsPath, 'ourcreation/communal temple/lcons/Gemini_Generated_Image_s13ihos13ihos13i.png'),
            'communal-temples/icons'
        );
        const transparencyResult = await uploadLocalFile(
            path.join(assetsPath, 'ourcreation/communal temple/lcons/Gemini_Generated_Image_8wdizp8wdizp8wdi.png'),
            'communal-temples/icons'
        );

        // 3. Service Icons (Shared from pooja room)
        const wallResult = await uploadLocalFile(
            path.join(assetsPath, 'ourcreation/pooja room/icons/1wall.png'),
            'communal-temples/services'
        );
        const floorResult = await uploadLocalFile(
            path.join(assetsPath, 'ourcreation/pooja room/icons/2floor.png'),
            'communal-temples/services'
        );
        const virtualResult = await uploadLocalFile(
            path.join(assetsPath, 'ourcreation/pooja room/icons/3virtual.png'),
            'communal-temples/services'
        );
        const customDesignResult = await uploadLocalFile(
            path.join(assetsPath, 'ourcreation/pooja room/icons/4custom design.png'),
            'communal-temples/services'
        );
        const visualisationResult = await uploadLocalFile(
            path.join(assetsPath, 'ourcreation/pooja room/icons/5visualisation.png'),
            'communal-temples/services'
        );
        const projectTrackingResult = await uploadLocalFile(
            path.join(assetsPath, 'ourcreation/pooja room/icons/6project tracking.png'),
            'communal-temples/services'
        );

        // 4. Five Steps Icons and GIFs
        const stepIcons = [];
        for (let i = 1; i <= 5; i++) {
            const iconRes = await uploadLocalFile(
                path.join(assetsPath, `how it work/icons/icon${i}.png`),
                'communal-temples/steps'
            );
            stepIcons.push(iconRes);
        }

        const stepGifs = [];
        for (let i = 1; i <= 5; i++) {
            const gifRes = await uploadLocalFile(
                path.join(assetsPath, `how it work/5stepvideo/image${i}.gif`),
                'communal-temples/steps'
            );
            stepGifs.push(gifRes);
        }

        const communalData = {
            heroSection: {
                image: {
                    url: heroResult.secure_url,
                    publicId: heroResult.public_id,
                    alt: 'Magnificent Communal Temple'
                },
                title: 'Communal Temples',
                subtitle: 'Building Sacred Spaces for Communities'
            },
            whyChooseUs: [
                {
                    title: "Turnkey Projects",
                    description: "End-to-end execution from design to completion",
                    icon: { url: turnkeyResult.secure_url, publicId: turnkeyResult.public_id }
                },
                {
                    title: "100+ Temples",
                    description: "Successfully delivered over 100 communal temples",
                    icon: { url: templesMadeResult.secure_url, publicId: templesMadeResult.public_id }
                },
                {
                    title: "Site Supervision",
                    description: "Dedicated supervisors ensuring quality at every step",
                    icon: { url: siteSupervisionResult.secure_url, publicId: siteSupervisionResult.public_id }
                },
                {
                    title: "100% Transparency",
                    description: "Clear communication and transparent pricing",
                    icon: { url: transparencyResult.secure_url, publicId: transparencyResult.public_id }
                }
            ],
            services: [
                { name: 'Wall Cladding', icon: { url: wallResult.secure_url, publicId: wallResult.public_id } },
                { name: 'Floor Inlay', icon: { url: floorResult.secure_url, publicId: floorResult.public_id } },
                { name: 'Virtual Tour', icon: { url: virtualResult.secure_url, publicId: virtualResult.public_id } },
                { name: 'Custom Design', icon: { url: customDesignResult.secure_url, publicId: customDesignResult.public_id } },
                { name: '3D visualisation', icon: { url: visualisationResult.secure_url, publicId: visualisationResult.public_id } },
                { name: 'Project Tracking', icon: { url: projectTrackingResult.secure_url, publicId: projectTrackingResult.public_id } }
            ],
            fiveSteps: {
                title: "Build Your Dream Temple in Just 5 Steps",
                subtitle: "Ready to design your Dream Temple? Here's how you can get started.",
                steps: [
                    { stepNumber: 1, title: "Let's Connect One on One", icon: { url: stepIcons[0].secure_url, publicId: stepIcons[0].public_id }, gif: { url: stepGifs[0].secure_url, publicId: stepGifs[0].public_id } },
                    { stepNumber: 2, title: "Explore our Catalog", icon: { url: stepIcons[1].secure_url, publicId: stepIcons[1].public_id }, gif: { url: stepGifs[1].secure_url, publicId: stepGifs[1].public_id } },
                    { stepNumber: 3, title: "Place The Order", icon: { url: stepIcons[2].secure_url, publicId: stepIcons[2].public_id }, gif: { url: stepGifs[2].secure_url, publicId: stepGifs[2].public_id } },
                    { stepNumber: 4, title: "Approval", icon: { url: stepIcons[3].secure_url, publicId: stepIcons[3].public_id }, gif: { url: stepGifs[3].secure_url, publicId: stepGifs[3].public_id } },
                    { stepNumber: 5, title: "Delivery and Installation", icon: { url: stepIcons[4].secure_url, publicId: stepIcons[4].public_id }, gif: { url: stepGifs[4].secure_url, publicId: stepGifs[4].public_id } }
                ]
            }
        };

        await CommunalTemples.create(communalData);
        console.log('Communal Temples data seeded successfully!');
        process.exit();
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
};

seedData();
