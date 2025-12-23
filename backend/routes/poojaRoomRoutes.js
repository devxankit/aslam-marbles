const express = require('express');
const router = express.Router();
const {
    getPoojaRoomData,
    updatePoojaRoomData
} = require('../controllers/poojaRoomController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');
const poojaRoomUpload = require('../middlewares/poojaRoomUpload');
const { uploadBuffer } = require('../utils/cloudinary');

router.route('/')
    .get(getPoojaRoomData)
    .put(auth, adminOnly, poojaRoomUpload, updatePoojaRoomData);

// Generic upload for collection items or gallery
router.post('/upload', auth, adminOnly, poojaRoomUpload, async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Find the first file in any of the allowed fields
        const fieldNames = ['heroImage', 'cons1Image', 'cons2Image', 'beforeImage', 'afterImage'];
        let file = null;
        for (const field of fieldNames) {
            if (req.files[field] && req.files[field][0]) {
                file = req.files[field][0];
                break;
            }
        }

        if (!file) {
            return res.status(400).json({ message: 'No file found in allowed fields' });
        }

        const result = await uploadBuffer(file.buffer, 'pooja-room');
        res.json({ url: result.secure_url });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Upload failed', error: error.message });
    }
});

module.exports = router;
