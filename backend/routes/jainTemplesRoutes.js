const express = require('express');
const router = express.Router();
const {
    getJainTemplesData,
    updateJainTemplesData
} = require('../controllers/jainTemplesController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');
const multer = require('multer');
const { uploadBuffer } = require('../utils/cloudinary');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', getJainTemplesData);
router.put('/', auth, adminOnly, updateJainTemplesData);

// Generic upload for jain temple images
router.post('/upload', auth, adminOnly, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const result = await uploadBuffer(req.file.buffer, 'jain-temples');
        res.json({ success: true, url: result.secure_url, publicId: result.public_id });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ success: false, message: 'Upload failed', error: error.message });
    }
});

module.exports = router;
