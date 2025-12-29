const express = require('express');
const router = express.Router();
const { getProductsByCategory, getAllProducts, upsertProduct, deleteProduct } = require('../controllers/shopByProductController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Public
router.get('/:section/:category', getProductsByCategory);

// Admin
router.get('/', auth, adminOnly, getAllProducts);
router.post('/', auth, adminOnly, upload.array('images', 5), upsertProduct);
router.delete('/:id', auth, adminOnly, deleteProduct);

module.exports = router;
