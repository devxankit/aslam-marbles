const express = require('express');
const router = express.Router();
const {
    getHomePage,
    updateHomePage,
    uploadVideo,
    deleteVideo,
    updateBeforeAfterImages,
    updateCompletedProjects,
    updateHeroSection
} = require('../controllers/homePageController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');

// Public route
router.get('/', getHomePage);

// Admin routes
router.post('/', auth, adminOnly, updateHomePage);
router.post('/videos', auth, adminOnly, uploadVideo);
router.delete('/videos/:publicId', auth, adminOnly, deleteVideo);
router.post('/before-after', auth, adminOnly, updateBeforeAfterImages);
router.post('/completed-projects', auth, adminOnly, updateCompletedProjects);
router.post('/hero-section', auth, adminOnly, updateHeroSection);

module.exports = router;
