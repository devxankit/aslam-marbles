const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');
const { teamUpload } = require('../middlewares/teamUpload');

// Public route to get team data
router.get('/', teamController.getTeam);

// Admin routes
router.post('/hero-image', auth, adminOnly, teamUpload, teamController.updateHeroImage);
router.post('/member', auth, adminOnly, teamUpload, teamController.addMember);
router.put('/member/:memberId', auth, adminOnly, teamUpload, teamController.updateMember);
router.delete('/member/:memberId', auth, adminOnly, teamController.deleteMember);

module.exports = router;
