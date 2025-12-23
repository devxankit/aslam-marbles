const express = require('express');
const router = express.Router();
const {
    getMurtiPageData,
    getMurtiHierarchy,
    getMurtiCategory,
    getMurtiProducts,
    getMurtiProduct,
    updateMurtiPage,
    upsertMurtiGroup,
    upsertMurtiCategory,
    upsertMurtiProduct,
    deleteMurtiProduct
} = require('../controllers/murtiController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');

// Public routes
router.get('/page', getMurtiPageData);
router.get('/hierarchy', getMurtiHierarchy);
router.get('/category/:id', getMurtiCategory);
router.get('/products/:categoryId', getMurtiProducts);
router.get('/product/:id', getMurtiProduct);

// Admin routes
router.put('/page', auth, adminOnly, updateMurtiPage);
router.post('/groups', auth, adminOnly, upsertMurtiGroup);
router.post('/categories', auth, adminOnly, upsertMurtiCategory);
router.post('/products', auth, adminOnly, upsertMurtiProduct);
router.delete('/products/:id', auth, adminOnly, deleteMurtiProduct);

module.exports = router;
