const express = require('express');
const router = express.Router();
const {
    getCommunalTemplesData,
    updateCommunalTemplesData
} = require('../controllers/communalTemplesController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');
const communalTemplesUpload = require('../middlewares/communalTemplesUpload');
const { uploadBuffer } = require('../utils/cloudinary');

router.route('/')
    .get(getCommunalTemplesData)
    .post(auth, adminOnly, communalTemplesUpload, updateCommunalTemplesData)
    .put(auth, adminOnly, communalTemplesUpload, updateCommunalTemplesData);

// Generic upload for any communal temple image
router.post('/upload', auth, adminOnly, communalTemplesUpload, async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const fieldNames = ['heroImage', 'whyChooseUsIcon', 'serviceIcon', 'stepIcon', 'stepGif'];
        let file = null;
        for (const field of fieldNames) {
            if (req.files[field] && req.files[field][0]) {
                file = req.files[field][0];
                break;
            }
        }

        if (!file) {
            return res.status(400).json({ success: false, message: 'No file found in allowed fields' });
        }

        const result = await uploadBuffer(file.buffer, 'communal-temples');
        res.json({ success: true, url: result.secure_url, publicId: result.public_id });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ success: false, message: 'Upload failed', error: error.message });
    }
});

module.exports = router;
