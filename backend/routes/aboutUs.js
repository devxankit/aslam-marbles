const express = require('express');
const router = express.Router();
const { getAboutUsContent, updateAboutUsImages, updateAboutUsContent } = require('../controllers/aboutUsController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');
const { aboutUsUpload } = require('../middlewares/aboutUsUpload');

router.get('/', getAboutUsContent);
router.put('/images', auth, adminOnly, aboutUsUpload, updateAboutUsImages);
router.put('/content', auth, adminOnly, updateAboutUsContent);

module.exports = router;
