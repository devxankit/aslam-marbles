const DreamTemple = require('../models/DreamTemple');
const { uploadBuffer } = require('../utils/cloudinary');

// @desc    Get Dream Temple Page Data
// @route   GET /api/dream-temple
// @access  Public
const getDreamTempleData = async (req, res) => {
    try {
        let dreamTempleData = await DreamTemple.findOne();
        if (!dreamTempleData) {
            return res.json({});
        }
        res.json(dreamTempleData);
    } catch (error) {
        console.error('Error fetching Dream Temple data:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update Dream Temple Page Data
// @route   PUT /api/dream-temple
// @access  Private/Admin
const updateDreamTempleData = async (req, res) => {
    try {
        const {
            heroTitle, heroSubtitle, heroDescription,
            collectionSection, horizontalSection,
            collection, horizontalImages, gallery
        } = req.body;

        let dreamTempleData = await DreamTemple.findOne();
        if (!dreamTempleData) {
            dreamTempleData = new DreamTemple();
        }

        // Handle text content
        if (heroTitle !== undefined || heroSubtitle !== undefined || heroDescription !== undefined) {
            if (!dreamTempleData.heroSection) dreamTempleData.heroSection = {};
            if (heroTitle !== undefined) dreamTempleData.heroSection.title = heroTitle;
            if (heroSubtitle !== undefined) dreamTempleData.heroSection.subtitle = heroSubtitle;
            if (heroDescription !== undefined) dreamTempleData.heroSection.description = heroDescription;
        }

        if (collectionSection) {
            try {
                dreamTempleData.collectionSection = JSON.parse(collectionSection);
            } catch (e) {
                console.error('Error parsing collectionSection:', e);
            }
        }

        if (horizontalSection) {
            try {
                dreamTempleData.horizontalSection = JSON.parse(horizontalSection);
            } catch (e) {
                console.error('Error parsing horizontalSection:', e);
            }
        }

        if (collection) {
            try {
                dreamTempleData.collection = JSON.parse(collection);
            } catch (e) {
                console.error('Error parsing collection:', e);
            }
        }

        if (horizontalImages) {
            try {
                dreamTempleData.horizontalImages = JSON.parse(horizontalImages);
            } catch (e) {
                console.error('Error parsing horizontalImages:', e);
            }
        }

        if (gallery) {
            try {
                dreamTempleData.gallery = JSON.parse(gallery);
            } catch (e) {
                console.error('Error parsing gallery:', e);
            }
        }

        // Handle image uploads
        if (req.files) {
            // Hero Image
            if (req.files.heroImage) {
                const result = await uploadBuffer(req.files.heroImage[0].buffer, 'dream-temple');
                if (!dreamTempleData.heroSection) dreamTempleData.heroSection = {};
                dreamTempleData.heroSection.image = { url: result.secure_url, alt: 'Hero' };
            }

            // Collection images
            const collectionImageFields = Object.keys(req.files).filter(key => key.startsWith('collectionImage'));
            for (const fieldName of collectionImageFields) {
                const index = parseInt(fieldName.replace('collectionImage', ''));
                if (!isNaN(index) && dreamTempleData.collection[index]) {
                    const result = await uploadBuffer(req.files[fieldName][0].buffer, 'dream-temple');
                    dreamTempleData.collection[index].image = { url: result.secure_url, alt: `Temple ${index + 1}` };
                }
            }

            // Horizontal images
            const horizontalImageFields = Object.keys(req.files).filter(key => key.startsWith('horizontalImage'));
            for (const fieldName of horizontalImageFields) {
                const index = parseInt(fieldName.replace('horizontalImage', ''));
                if (!isNaN(index) && dreamTempleData.horizontalImages[index]) {
                    const result = await uploadBuffer(req.files[fieldName][0].buffer, 'dream-temple');
                    dreamTempleData.horizontalImages[index].image = { url: result.secure_url, alt: `Horizontal ${index + 1}` };
                }
            }

            // Gallery images (bulk upload)
            if (req.files.galleryImages) {
                for (const file of req.files.galleryImages) {
                    const result = await uploadBuffer(file.buffer, 'dream-temple/gallery');
                    dreamTempleData.gallery.push({
                        url: result.secure_url,
                        publicId: result.public_id,
                        alt: 'Gallery Image'
                    });
                }
            }

            // Process steps GIFs
            const stepGifFields = Object.keys(req.files).filter(key => key.startsWith('processStepGif'));
            for (const fieldName of stepGifFields) {
                const index = parseInt(fieldName.replace('processStepGif', ''));
                if (!isNaN(index) && dreamTempleData.processSteps[index]) {
                    const result = await uploadBuffer(req.files[fieldName][0].buffer, 'dream-temple/steps');
                    dreamTempleData.processSteps[index].gif = { url: result.secure_url, alt: `Step ${index + 1}` };
                }
            }
        }

        if (req.body.processSteps) {
            try {
                dreamTempleData.processSteps = JSON.parse(req.body.processSteps);
            } catch (e) {
                console.error('Error parsing processSteps:', e);
            }
        }

        dreamTempleData.lastUpdated = Date.now();
        const updatedData = await dreamTempleData.save();
        res.json(updatedData);
    } catch (error) {
        console.error('Error updating Dream Temple data:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Upload single image
// @route   POST /api/dream-temple/upload-single
// @access  Private/Admin
const uploadSingle = async (req, res) => {
    try {
        if (!req.file && !req.files?.image) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const file = req.file || req.files.image[0];
        const result = await uploadBuffer(file.buffer, 'dream-temple');
        res.json({ url: result.secure_url });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Upload failed', error: error.message });
    }
};

module.exports = {
    getDreamTempleData,
    updateDreamTempleData,
    uploadSingle
};
