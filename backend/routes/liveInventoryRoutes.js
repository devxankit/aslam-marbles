const express = require('express');
const router = express.Router();
const {
    getLiveInventory,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem
} = require('../controllers/liveInventoryController');
// Use correct middleware names
const { auth, adminOnly } = require('../middlewares/authMiddleware');

router.route('/')
    .get(getLiveInventory)
    .post(auth, adminOnly, createInventoryItem);

router.route('/:id')
    .put(auth, adminOnly, updateInventoryItem)
    .delete(auth, adminOnly, deleteInventoryItem);

module.exports = router;
