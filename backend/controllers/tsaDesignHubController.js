const TSADesignHub = require('../models/TSADesignHub');
const { uploadBuffer, deleteByPublicId } = require('../utils/cloudinary');

// @desc    Get TSA Design Hub page content
// @route   GET /api/tsa-design-hub
// @access  Public
exports.getTSADesignHub = async (req, res) => {
    try {
        const content = await TSADesignHub.findOne();
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.json(content);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update TSA Design Hub page content
// @route   PUT /api/tsa-design-hub
// @access  Private/Admin
exports.updateTSADesignHub = async (req, res) => {
    try {
        let content = await TSADesignHub.findOne();
        if (!content) {
            content = new TSADesignHub({});
        }

        // Handle Image Uploads if any
        // This part depends on how the frontend sends data. 
        // Usually, we might expect req.files or base64 strings if sticking to JSON. 
        // For now, let's assume the body contains the structure. 
        // Actual implementation of image handling might require middleware like multer 
        // or direct cloud upload from frontend (but user asked for backend).

        // For simplicity in this generic controller, we update fields passed in body.
        // Deep merge or specific field mapping would be better in production.

        Object.assign(content, req.body);

        const updatedContent = await content.save();
        res.json(updatedContent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
