const JainTemples = require('../models/JainTemples');
const asyncHandler = require('express-async-handler');

// @desc    Get Jain temples page data
// @route   GET /api/jain-temples
// @access  Public
const getJainTemplesData = asyncHandler(async (req, res) => {
    const data = await JainTemples.findOne({ isActive: true }).sort({ lastUpdated: -1 });

    if (data) {
        res.json({
            success: true,
            data
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Jain Temples data not found'
        });
    }
});

// @desc    Update Jain temples page data
// @route   PUT /api/jain-temples
// @access  Private/Admin
const updateJainTemplesData = asyncHandler(async (req, res) => {
    let jainData = await JainTemples.findOne();

    if (!jainData) {
        jainData = new JainTemples();
    }

    // Dynamic updates for top-level fields
    if (req.body.heroSection) {
        jainData.heroSection = { ...jainData.heroSection, ...req.body.heroSection };
    }

    if (req.body.projectsSection) {
        jainData.projectsSection = { ...jainData.projectsSection, ...req.body.projectsSection };
    }

    jainData.lastUpdated = Date.now();
    const updatedData = await jainData.save();

    res.json({
        success: true,
        data: updatedData
    });
});

module.exports = {
    getJainTemplesData,
    updateJainTemplesData
};
