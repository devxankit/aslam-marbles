const express = require('express');
const {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  updateDisplayOrder
} = require('../controllers/testimonialController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getAllTestimonials);
router.get('/:id', getTestimonialById);

router.post('/', auth, adminOnly, createTestimonial);
router.put('/:id', auth, adminOnly, updateTestimonial);
router.delete('/:id', auth, adminOnly, deleteTestimonial);
router.put('/order/update', auth, adminOnly, updateDisplayOrder);

module.exports = router;

