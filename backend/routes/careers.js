const express = require('express');
const router = express.Router();
const careersController = require('../controllers/careersController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');
const careersUpload = require('../middlewares/careersUpload');

// Public route - Get careers data
router.get('/', careersController.getCareers);

// Admin routes - Protected
router.post('/hero-image', auth, adminOnly, careersUpload, (req, res) => {
    req.file = req.files?.heroImage?.[0];
    careersController.updateHeroImage(req, res);
});

router.post('/training-image', auth, adminOnly, careersUpload, (req, res) => {
    req.file = req.files?.trainingImage?.[0];
    careersController.updateTrainingImage(req, res);
});

router.put('/why-join-us', auth, adminOnly, careersController.updateWhyJoinUs);
router.put('/benefits', auth, adminOnly, careersController.updateBenefits);

router.post('/job', auth, adminOnly, careersController.addJob);
router.put('/job/:jobId', auth, adminOnly, careersController.updateJob);
router.delete('/job/:jobId', auth, adminOnly, careersController.deleteJob);

module.exports = router;
