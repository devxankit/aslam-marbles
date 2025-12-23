const HomePage = require('../models/HomePage');
const { cloudinary } = require('../utils/cloudinary');

// @desc    Get home page data
// @route   GET /api/home-page
// @access  Public
const getHomePage = async (req, res) => {
    try {
        let homePage = await HomePage.findOne({ isActive: true })
            .populate('featuredProducts')
            .populate('featuredProjects');

        if (!homePage) {
            // Create default home page if none exists
            homePage = await HomePage.create({
                heroSection: {
                    title: 'Welcome to Tilak Stone Art',
                    subtitle: 'Crafting Divine Spaces',
                    description: 'Premium marble temples, murtis, and home decor'
                },
                stats: {
                    projectsCompleted: 500,
                    happyClients: 1000,
                    yearsExperience: 25,
                    teamMembers: 50
                },
                videosSection: {
                    heading: 'Welcome to the World aslam marble suppliers',
                    videos: []
                },
                beforeAfterSection: {
                    heading: 'Before and After',
                    description: 'Witness the transformation from a blank canvas to a serene sanctuary with Tilak Stone Arts India. Our skilled artisans turn raw spaces into exquisite pooja rooms, reflecting spirituality and elegance. See the remarkable difference quality and craftsmanship can make.'
                },
                completedProjectsSection: {
                    heading: 'COMPLETED CUSTOM PROJECTS',
                    stats: {
                        projects: 950,
                        cities: 350,
                        yearsExperience: 25
                    }
                }
            });
        }

        res.json({ success: true, data: homePage });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update home page
// @route   POST /api/home-page
// @access  Private/Admin
const updateHomePage = async (req, res) => {
    try {
        let homePage = await HomePage.findOne();

        if (!homePage) {
            homePage = new HomePage(req.body);
        } else {
            Object.assign(homePage, req.body);
        }

        // Handle hero images upload
        if (req.body.heroSection?.images) {
            const uploadedImages = [];
            for (const img of req.body.heroSection.images) {
                if (typeof img === 'string' && img.startsWith('data:image')) {
                    const result = await cloudinary.uploader.upload(img, {
                        folder: 'home-page/hero'
                    });
                    uploadedImages.push({
                        url: result.secure_url,
                        publicId: result.public_id,
                        alt: 'Hero Image'
                    });
                } else if (img.url) {
                    uploadedImages.push(img);
                }
            }
            homePage.heroSection.images = uploadedImages;
        }

        // Handle about section image
        if (req.body.aboutSection?.image && typeof req.body.aboutSection.image === 'string' && req.body.aboutSection.image.startsWith('data:image')) {
            const result = await cloudinary.uploader.upload(req.body.aboutSection.image, {
                folder: 'home-page/about'
            });
            homePage.aboutSection.image = {
                url: result.secure_url,
                publicId: result.public_id,
                alt: 'About Us'
            };
        }

        await homePage.save();
        res.json({ success: true, data: homePage });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Upload video to videos section
// @route   POST /api/home-page/videos
// @access  Private/Admin
const uploadVideo = async (req, res) => {
    try {
        const { videoFile } = req.body;

        if (!videoFile) {
            return res.status(400).json({ success: false, message: 'Video file is required' });
        }

        // Upload video to Cloudinary
        const result = await cloudinary.uploader.upload(videoFile, {
            folder: 'home-page/videos',
            resource_type: 'video',
            chunk_size: 6000000 // 6MB chunks for large videos
        });

        let homePage = await HomePage.findOne();
        if (!homePage) {
            homePage = new HomePage();
        }

        if (!homePage.videosSection) {
            homePage.videosSection = { videos: [] };
        }

        homePage.videosSection.videos.push({
            url: result.secure_url,
            publicId: result.public_id,
            resourceType: 'video'
        });

        await homePage.save();
        res.json({ success: true, data: homePage.videosSection });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete video from videos section
// @route   DELETE /api/home-page/videos/:publicId
// @access  Private/Admin
const deleteVideo = async (req, res) => {
    try {
        const { publicId } = req.params;

        // Delete from Cloudinary
        await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });

        let homePage = await HomePage.findOne();
        if (homePage && homePage.videosSection) {
            homePage.videosSection.videos = homePage.videosSection.videos.filter(
                video => video.publicId !== publicId
            );
            await homePage.save();
        }

        res.json({ success: true, message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update before/after images
// @route   POST /api/home-page/before-after
// @access  Private/Admin
const updateBeforeAfterImages = async (req, res) => {
    try {
        const { beforeImage, afterImage, heading, description } = req.body;

        let homePage = await HomePage.findOne();
        if (!homePage) {
            homePage = new HomePage();
        }

        if (!homePage.beforeAfterSection) {
            homePage.beforeAfterSection = {};
        }

        // Update heading and description if provided
        if (heading) homePage.beforeAfterSection.heading = heading;
        if (description) homePage.beforeAfterSection.description = description;

        // Handle before image upload
        if (beforeImage && typeof beforeImage === 'string' && beforeImage.startsWith('data:image')) {
            // Delete old image if exists
            if (homePage.beforeAfterSection.beforeImage?.publicId) {
                await cloudinary.uploader.destroy(homePage.beforeAfterSection.beforeImage.publicId);
            }

            const result = await cloudinary.uploader.upload(beforeImage, {
                folder: 'home-page/before-after'
            });
            homePage.beforeAfterSection.beforeImage = {
                url: result.secure_url,
                publicId: result.public_id,
                alt: 'Before Image'
            };
        }

        // Handle after image upload
        if (afterImage && typeof afterImage === 'string' && afterImage.startsWith('data:image')) {
            // Delete old image if exists
            if (homePage.beforeAfterSection.afterImage?.publicId) {
                await cloudinary.uploader.destroy(homePage.beforeAfterSection.afterImage.publicId);
            }

            const result = await cloudinary.uploader.upload(afterImage, {
                folder: 'home-page/before-after'
            });
            homePage.beforeAfterSection.afterImage = {
                url: result.secure_url,
                publicId: result.public_id,
                alt: 'After Image'
            };
        }

        await homePage.save();
        res.json({ success: true, data: homePage.beforeAfterSection });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update completed projects section
// @route   POST /api/home-page/completed-projects
// @access  Private/Admin
const updateCompletedProjects = async (req, res) => {
    try {
        const { backgroundImage, heading, stats } = req.body;

        let homePage = await HomePage.findOne();
        if (!homePage) {
            homePage = new HomePage();
        }

        if (!homePage.completedProjectsSection) {
            homePage.completedProjectsSection = {};
        }

        // Update heading if provided
        if (heading) homePage.completedProjectsSection.heading = heading;

        // Update stats if provided
        if (stats) {
            homePage.completedProjectsSection.stats = {
                projects: stats.projects || homePage.completedProjectsSection.stats?.projects || 950,
                cities: stats.cities || homePage.completedProjectsSection.stats?.cities || 350,
                yearsExperience: stats.yearsExperience || homePage.completedProjectsSection.stats?.yearsExperience || 25
            };
        }

        // Handle background image upload
        if (backgroundImage && typeof backgroundImage === 'string' && backgroundImage.startsWith('data:image')) {
            // Delete old image if exists
            if (homePage.completedProjectsSection.backgroundImage?.publicId) {
                await cloudinary.uploader.destroy(homePage.completedProjectsSection.backgroundImage.publicId);
            }

            const result = await cloudinary.uploader.upload(backgroundImage, {
                folder: 'home-page/completed-projects'
            });
            homePage.completedProjectsSection.backgroundImage = {
                url: result.secure_url,
                publicId: result.public_id,
                alt: 'Completed Projects Background'
            };
        }

        await homePage.save();
        res.json({ success: true, data: homePage.completedProjectsSection });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update hero section
// @route   POST /api/home-page/hero-section
// @access  Private/Admin
const updateHeroSection = async (req, res) => {
    try {
        const { video, mainHeading, subHeading, supplierText } = req.body;

        let homePage = await HomePage.findOne();
        if (!homePage) {
            homePage = new HomePage();
        }

        if (!homePage.heroSection) {
            homePage.heroSection = {};
        }

        // Update text content
        if (mainHeading) homePage.heroSection.mainHeading = mainHeading;
        if (subHeading) homePage.heroSection.subHeading = subHeading;
        if (supplierText) homePage.heroSection.supplierText = supplierText;

        // Handle video upload
        if (video && typeof video === 'string' && video.startsWith('data:video')) {
            // Delete old video if exists
            if (homePage.heroSection.video?.publicId) {
                await cloudinary.uploader.destroy(homePage.heroSection.video.publicId, { resource_type: 'video' });
            }

            const result = await cloudinary.uploader.upload(video, {
                folder: 'home-page/hero',
                resource_type: 'video',
                chunk_size: 6000000
            });
            homePage.heroSection.video = {
                url: result.secure_url,
                publicId: result.public_id,
                resourceType: 'video'
            };
        }

        await homePage.save();
        res.json({ success: true, data: homePage.heroSection });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getHomePage,
    updateHomePage,
    uploadVideo,
    deleteVideo,
    updateBeforeAfterImages,
    updateCompletedProjects,
    updateHeroSection
};
