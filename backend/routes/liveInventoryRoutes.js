const express = require('express');
const router = express.Router();
const {
    getLiveInventory,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    getPageSettings,
    updatePageSettings
} = require('../controllers/liveInventoryController');
// Use correct middleware names
const { auth, adminOnly } = require('../middlewares/authMiddleware');

router.route('/')
    .get(getLiveInventory)
    .post(auth, adminOnly, createInventoryItem);

// Important: Put specific routes like /settings before parameterized routes like /:id
router.route('/settings')
    .get(getPageSettings)
    .put(auth, adminOnly, updatePageSettings);

router.route('/:id')
    .put(auth, adminOnly, updateInventoryItem)
    .delete(auth, adminOnly, deleteInventoryItem);

module.exports = router;
