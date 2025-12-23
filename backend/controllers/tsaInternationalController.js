const TSAInternational = require('../models/TSAInternational');

// @desc    Get TSA International page content
// @route   GET /api/tsa-international
// @access  Public
exports.getTSAInternational = async (req, res) => {
    try {
        const content = await TSAInternational.findOne();
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.json(content);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update TSA International page content
// @route   PUT /api/tsa-international
// @access  Private/Admin
exports.updateTSAInternational = async (req, res) => {
    try {
        let content = await TSAInternational.findOne();
        if (!content) {
            content = new TSAInternational({});
        }

        Object.assign(content, req.body);

        const updatedContent = await content.save();
        res.json(updatedContent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
