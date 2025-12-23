const AboutUs = require('../models/AboutUs');
const { uploadBuffer, deleteByPublicId } = require('../utils/cloudinary');

const getAboutUsContent = async (req, res) => {
    try {
        let content = await AboutUs.findOne();
        if (!content) {
            // Create initial empty content if not exists
            content = await AboutUs.create({});
        }
        res.json({
            success: true,
            data: content
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

const updateAboutUsImages = async (req, res) => {
    try {
        let content = await AboutUs.findOne();
        if (!content) {
            content = new AboutUs();
        }

        const { files } = req;

        // Handle Hero Background Image
        if (files && files.heroBgImage) {
            // Delete old if exists
            if (content.heroBgImage && content.heroBgImage.publicId) {
                await deleteByPublicId(content.heroBgImage.publicId);
            }

            const result = await uploadBuffer(files.heroBgImage[0].buffer, 'about-us');
            content.heroBgImage = {
                url: result.secure_url,
                publicId: result.public_id
            };
        }

        // Handle Intro Image
        if (files && files.introImage) {
            // Delete old if exists
            if (content.introImage && content.introImage.publicId) {
                await deleteByPublicId(content.introImage.publicId);
            }

            const result = await uploadBuffer(files.introImage[0].buffer, 'about-us');
            content.introImage = {
                url: result.secure_url,
                publicId: result.public_id
            };
        }

        await content.save();

        res.json({
            success: true,
            message: 'About Us images updated successfully',
            data: content
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update images',
            error: error.message
        });
    }
};

const updateAboutUsContent = async (req, res) => {
    try {
        let content = await AboutUs.findOne();
        if (!content) {
            content = new AboutUs();
        }

        const { timeline, values } = req.body;

        if (timeline) content.timeline = timeline;
        if (values) content.values = values;

        await content.save();

        res.json({
            success: true,
            message: 'About Us content updated successfully',
            data: content
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update content',
            error: error.message
        });
    }
};

module.exports = {
    getAboutUsContent,
    updateAboutUsImages,
    updateAboutUsContent
};
