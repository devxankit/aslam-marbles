const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middlewares/authMiddleware');
const {
    getSettings,
    updateAllSettings,
    updateGeneralSettings,
    updateSocialSettings,
    updateSeoSettings,
    updateEmailSettings
} = require('../controllers/settingsController');

// Public
router.get('/', getSettings);

// Admin only
router.post('/all', auth, adminOnly, updateAllSettings);
router.patch('/general', auth, adminOnly, updateGeneralSettings);
router.patch('/social', auth, adminOnly, updateSocialSettings);
router.patch('/seo', auth, adminOnly, updateSeoSettings);
router.patch('/email', auth, adminOnly, updateEmailSettings);

module.exports = router;
