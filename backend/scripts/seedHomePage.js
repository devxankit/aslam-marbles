const mongoose = require('mongoose');
const dotenv = require('dotenv');
const HomePage = require('../models/HomePage');
const path = require('path');
const { cloudinary } = require('../utils/cloudinary');
const fs = require('fs');

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedHomePage = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const exists = await HomePage.findOne();
        if (exists) {
            console.log('HomePage content already exists. Skipping seeding.');
            mongoose.connection.close();
            return;
        }

        console.log('Starting HomePage seeding...');

        // Upload videos to Cloudinary
        console.log('Uploading videos to Cloudinary...');
        const videoFiles = [
            path.join(__dirname, '../../my-project/src/assets/video/videos/352260c8-6984-4232-6ad7-61a7d5b47380.mp4'),
            path.join(__dirname, '../../my-project/src/assets/video/videos/dfde720e-a063-4380-4022-245d7dd9ab30.mp4'),
            path.join(__dirname, '../../my-project/src/assets/video/videos/ef556fd0-b8ee-475e-7616-2e2ca5640bb0 (1).mp4')
        ];

        const uploadedVideos = [];
        for (let i = 0; i < videoFiles.length; i++) {
            const videoPath = videoFiles[i];
            if (fs.existsSync(videoPath)) {
                console.log(`Uploading video ${i + 1}/${videoFiles.length}...`);
                try {
                    const result = await cloudinary.uploader.upload(videoPath, {
                        folder: 'home-page/videos',
                        resource_type: 'video',
                        chunk_size: 6000000
                    });
                    uploadedVideos.push({
                        url: result.secure_url,
                        publicId: result.public_id,
                        resourceType: 'video'
                    });
                    console.log(`Video ${i + 1} uploaded successfully`);
                } catch (error) {
                    console.error(`Error uploading video ${i + 1}:`, error.message);
                }
            } else {
                console.log(`Video file not found: ${videoPath}`);
            }
        }

        // Upload before/after images to Cloudinary
        console.log('Uploading before/after images to Cloudinary...');
        const beforeImagePath = path.join(__dirname, '../../my-project/src/assets/ourcreation/pooja room/before&after/compare2.jpg');
        const afterImagePath = path.join(__dirname, '../../my-project/src/assets/ourcreation/pooja room/before&after/compare1.png');

        let beforeImageData = null;
        let afterImageData = null;

        if (fs.existsSync(beforeImagePath)) {
            try {
                const result = await cloudinary.uploader.upload(beforeImagePath, {
                    folder: 'home-page/before-after'
                });
                beforeImageData = {
                    url: result.secure_url,
                    publicId: result.public_id,
                    alt: 'Before Image'
                };
                console.log('Before image uploaded successfully');
            } catch (error) {
                console.error('Error uploading before image:', error.message);
            }
        }

        if (fs.existsSync(afterImagePath)) {
            try {
                const result = await cloudinary.uploader.upload(afterImagePath, {
                    folder: 'home-page/before-after'
                });
                afterImageData = {
                    url: result.secure_url,
                    publicId: result.public_id,
                    alt: 'After Image'
                };
                console.log('After image uploaded successfully');
            } catch (error) {
                console.error('Error uploading after image:', error.message);
            }
        }

        // Create HomePage document
        const homePageData = {
            heroSection: {
                title: 'Welcome to Tilak Stone Art',
                subtitle: 'Crafting Divine Spaces',
                description: 'Premium marble temples, murtis, and home decor',
                images: []
            },
            videosSection: {
                heading: 'Welcome to the World aslam marble suppliers',
                videos: uploadedVideos
            },
            beforeAfterSection: {
                heading: 'Before and After',
                description: 'Witness the transformation from a blank canvas to a serene sanctuary with Tilak Stone Arts India. Our skilled artisans turn raw spaces into exquisite pooja rooms, reflecting spirituality and elegance. See the remarkable difference quality and craftsmanship can make.',
                beforeImage: beforeImageData,
                afterImage: afterImageData
            },
            completedProjectsSection: {
                heading: 'COMPLETED CUSTOM PROJECTS',
                backgroundImage: {
                    url: 'https://res.cloudinary.com/djuyp9lut/image/upload/v1766129645/artist/hero/yjy4w3bfu9s4fhirpius.webp',
                    publicId: 'artist/hero/yjy4w3bfu9s4fhirpius',
                    alt: 'Completed Projects Background'
                },
                stats: {
                    projects: 950,
                    cities: 350,
                    yearsExperience: 25
                }
            },
            stats: {
                projectsCompleted: 950,
                happyClients: 1000,
                yearsExperience: 25,
                teamMembers: 50
            },
            isActive: true
        };

        await HomePage.create(homePageData);
        console.log('HomePage seeded successfully!');
        console.log(`- Uploaded ${uploadedVideos.length} videos`);
        console.log(`- Before image: ${beforeImageData ? 'Uploaded' : 'Not found'}`);
        console.log(`- After image: ${afterImageData ? 'Uploaded' : 'Not found'}`);

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding HomePage:', error);
        process.exit(1);
    }
};

seedHomePage();
