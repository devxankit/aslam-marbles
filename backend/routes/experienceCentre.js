const express = require('express');
const router = express.Router();
const {
    getExperienceCentreContent,
    updateExperienceCentreText,
    uploadHeroImage,
    addRegularImage,
    removeRegularImage,
    updateRegularImage,
    updateHorizontalImages
} = require('../controllers/experienceCentreController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/experienceCentreUpload');

router.get('/', getExperienceCentreContent);
router.put('/text', auth, adminOnly, updateExperienceCentreText);
router.put('/hero', auth, adminOnly, upload.single('image'), uploadHeroImage);
router.post('/regular', auth, adminOnly, upload.single('image'), addRegularImage);
router.put('/regular', auth, adminOnly, upload.single('image'), updateRegularImage);
router.delete('/regular/:publicId', auth, adminOnly, removeRegularImage);
router.put('/horizontal', auth, adminOnly, upload.single('image'), updateHorizontalImages);

module.exports = router;
