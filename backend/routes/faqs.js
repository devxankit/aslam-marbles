const express = require('express');
const {
  getAllFAQs,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  updateDisplayOrder,
} = require('../controllers/faqController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes for frontend to fetch FAQs
router.get('/', getAllFAQs);
router.get('/:id', getFAQById);

// Admin-only routes for managing FAQs
router.post('/', auth, adminOnly, createFAQ);
router.put('/:id', auth, adminOnly, updateFAQ);
router.delete('/:id', auth, adminOnly, deleteFAQ);
router.put('/order/update', auth, adminOnly, updateDisplayOrder);

module.exports = router;


