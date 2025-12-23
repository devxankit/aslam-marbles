const CommunalTemples = require('../models/CommunalTemples');
const asyncHandler = require('express-async-handler');
const { uploadBuffer } = require('../utils/cloudinary');

// @desc    Get communal temples page data
// @route   GET /api/communal-temples
// @access  Public
const getCommunalTemplesData = asyncHandler(async (req, res) => {
    const data = await CommunalTemples.findOne({ isActive: true }).sort({ lastUpdated: -1 });

    if (data) {
        res.json({
            success: true,
            data
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Communal Temples data not found'
        });
    }
});

// @desc    Update communal temples page data
// @route   POST /api/communal-temples (also handles PUT)
// @access  Private/Admin
const updateCommunalTemplesData = asyncHandler(async (req, res) => {
    let communalData = await CommunalTemples.findOne();

    if (!communalData) {
        communalData = new CommunalTemples();
    }

    // Handle nested updates from req.body (JSON)
    if (req.body.heroSection) {
        if (typeof req.body.heroSection === 'string') {
            req.body.heroSection = JSON.parse(req.body.heroSection);
        }
        communalData.heroSection = { ...communalData.heroSection, ...req.body.heroSection };
    }

    if (req.body.whyChooseUs) {
        communalData.whyChooseUs = typeof req.body.whyChooseUs === 'string'
            ? JSON.parse(req.body.whyChooseUs)
            : req.body.whyChooseUs;
    }

    if (req.body.services) {
        communalData.services = typeof req.body.services === 'string'
            ? JSON.parse(req.body.services)
            : req.body.services;
    }

    if (req.body.fiveSteps) {
        communalData.fiveSteps = typeof req.body.fiveSteps === 'string'
            ? JSON.parse(req.body.fiveSteps)
            : req.body.fiveSteps;
    }

    // Handle file uploads if any
    if (req.files) {
        if (req.files.heroImage) {
            const result = await uploadBuffer(req.files.heroImage[0].buffer, 'communal-temples');
            communalData.heroSection.image = {
                url: result.secure_url,
                publicId: result.public_id,
                alt: communalData.heroSection.title || 'Communal Temples Hero'
            };
        }
        // Other files can be handled similarly if needed
    }

    communalData.lastUpdated = Date.now();
    const updatedData = await communalData.save();

    res.json({
        success: true,
        data: updatedData
    });
});

module.exports = {
    getCommunalTemplesData,
    updateCommunalTemplesData
};
