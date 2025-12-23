const ExperienceCentre = require('../models/ExperienceCentre');
const { uploadBuffer, deleteByPublicId } = require('../utils/cloudinary');

const getExperienceCentreContent = async (req, res) => {
    try {
        let content = await ExperienceCentre.findOne();
        if (!content) {
            content = await ExperienceCentre.create({
                mainCaption: "Step into our Experience Centre, where tradition meets innovation and craftsmanship comes to life.",
                subCaption: "From elegant temple designs to exquisite home decor, our Experience Centre offers a curated journey through our portfolio.",
                journeyText: "The journey began with a simple idea to craft a space that would not only showcase our marble temples and stone art..."
            });
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

const updateExperienceCentreText = async (req, res) => {
    try {
        let content = await ExperienceCentre.findOne();
        if (!content) {
            content = new ExperienceCentre();
        }

        const { mainCaption, subCaption, journeyText } = req.body;
        if (mainCaption !== undefined) content.mainCaption = mainCaption;
        if (subCaption !== undefined) content.subCaption = subCaption;
        if (journeyText !== undefined) content.journeyText = journeyText;

        await content.save();

        res.json({
            success: true,
            message: 'Experience Centre text updated successfully',
            data: content
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update text',
            error: error.message
        });
    }
};

const uploadHeroImage = async (req, res) => {
    try {
        let content = await ExperienceCentre.findOne();
        if (!content) content = new ExperienceCentre();

        if (req.file) {
            if (content.heroImage && content.heroImage.publicId) {
                await deleteByPublicId(content.heroImage.publicId);
            }
            const result = await uploadBuffer(req.file.buffer, 'experience-centre');
            content.heroImage = {
                url: result.secure_url,
                publicId: result.public_id
            };
            await content.save();
        }

        res.json({
            success: true,
            message: 'Hero image updated successfully',
            data: content
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to upload hero image',
            error: error.message
        });
    }
};

const addRegularImage = async (req, res) => {
    try {
        let content = await ExperienceCentre.findOne();
        if (!content) content = new ExperienceCentre();

        if (req.file) {
            const result = await uploadBuffer(req.file.buffer, 'experience-centre');
            content.regularImages.push({
                url: result.secure_url,
                publicId: result.public_id
            });
            await content.save();
        }

        res.json({
            success: true,
            message: 'Regular image added successfully',
            data: content
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to add regular image',
            error: error.message
        });
    }
};

const removeRegularImage = async (req, res) => {
    try {
        const { publicId } = req.params;
        let content = await ExperienceCentre.findOne();
        if (!content) return res.status(404).json({ success: false, message: 'Content not found' });

        await deleteByPublicId(publicId);
        content.regularImages = content.regularImages.filter(img => img.publicId !== publicId);
        await content.save();

        res.json({
            success: true,
            message: 'Regular image removed successfully',
            data: content
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to remove regular image',
            error: error.message
        });
    }
};

const updateHorizontalImages = async (req, res) => {
    try {
        let content = await ExperienceCentre.findOne();
        if (!content) content = new ExperienceCentre();

        const { captions, order } = req.body; // order is an array of publicIds
        const files = req.files; // multiple files

        // This is a bit complex if we want to update specific ones.
        // Let's simplify: the admin sends the whole state of horizontal images.
        // For now, let's just implement a basic "update caption" and "replace image".

        // Actually, let's just make it simpler for the frontend.
        // We'll have specific slots for horizontal images (1, 2, 3).

        const { slot } = req.body; // slot number 0, 1, 2
        if (slot !== undefined) {
            const index = parseInt(slot);
            if (req.file) {
                if (content.horizontalImages[index] && content.horizontalImages[index].publicId) {
                    await deleteByPublicId(content.horizontalImages[index].publicId);
                }
                const result = await uploadBuffer(req.file.buffer, 'experience-centre');
                const newImg = {
                    url: result.secure_url,
                    publicId: result.public_id,
                    caption: req.body.caption || ''
                };
                content.horizontalImages[index] = newImg;
            } else if (req.body.caption !== undefined) {
                if (content.horizontalImages[index]) {
                    content.horizontalImages[index].caption = req.body.caption;
                }
            }
            await content.save();
        }

        res.json({
            success: true,
            message: 'Horizontal image updated successfully',
            data: content
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update horizontal image',
            error: error.message
        });
    }
};

const updateRegularImage = async (req, res) => {
    try {
        let content = await ExperienceCentre.findOne();
        if (!content) content = new ExperienceCentre();

        const { slot } = req.body;
        if (slot !== undefined && req.file) {
            const index = parseInt(slot);

            // Delete old image if it exists at this index
            if (content.regularImages[index] && content.regularImages[index].publicId) {
                await deleteByPublicId(content.regularImages[index].publicId);
            }

            const result = await uploadBuffer(req.file.buffer, 'experience-centre');
            const newImg = {
                url: result.secure_url,
                publicId: result.public_id
            };

            // Update specific slot or push if it's the next one
            content.regularImages[index] = newImg;
            await content.save();
        }

        res.json({
            success: true,
            message: 'Gallery image updated successfully',
            data: content
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update gallery image',
            error: error.message
        });
    }
};

module.exports = {
    getExperienceCentreContent,
    updateExperienceCentreText,
    uploadHeroImage,
    addRegularImage,
    removeRegularImage,
    updateRegularImage,
    updateHorizontalImages
};
