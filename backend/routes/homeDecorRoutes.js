const express = require('express');
const router = express.Router();
const {
    getHomeDecorPage,
    updateHomeDecorPage,
    getHierarchy,
    upsertGroup,
    upsertCategory,
    getCategoryById,
    getProductsByCategory,
    getProductById,
    upsertProduct,
    deleteProduct
} = require('../controllers/homeDecorController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');

// Public routes
router.get('/page', getHomeDecorPage);
router.get('/hierarchy', getHierarchy);
router.get('/category/:id', getCategoryById);
router.get('/products/:categoryId', getProductsByCategory);
router.get('/product/:id', getProductById);

// Admin routes
router.post('/page', auth, adminOnly, updateHomeDecorPage);
router.post('/groups', auth, adminOnly, upsertGroup);
router.post('/categories', auth, adminOnly, upsertCategory);
router.post('/products', auth, adminOnly, upsertProduct);
router.delete('/products/:id', auth, adminOnly, deleteProduct);

module.exports = router;
