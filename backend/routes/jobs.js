const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middlewares/authMiddleware');
const {
  uploadResume,
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication
} = require('../controllers/jobController');

// Public submit
router.post('/apply', uploadResume, createApplication);

// Admin
router.get('/', auth, adminOnly, getApplications);
router.put('/:id', auth, adminOnly, updateApplication);
router.delete('/:id', auth, adminOnly, deleteApplication);

module.exports = router;


