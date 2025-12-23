const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middlewares/authMiddleware');
const {
  createConsultation,
  getConsultations,
  getConsultation,
  updateConsultation,
  deleteConsultation
} = require('../controllers/expertController');

// Public route - anyone can submit consultation
router.post('/', createConsultation);

// Admin routes - require authentication
router.get('/', auth, adminOnly, getConsultations);
router.get('/:id', auth, adminOnly, getConsultation);
router.put('/:id', auth, adminOnly, updateConsultation);
router.delete('/:id', auth, adminOnly, deleteConsultation);

module.exports = router;

