const express = require('express');
const router = express.Router();
const {
    getLocations,
    getLocationById,
    upsertLocation,
    deleteLocation
} = require('../controllers/locationController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');

// Public routes
router.get('/', getLocations);
router.get('/:id', getLocationById);

// Admin routes
router.post('/', auth, adminOnly, upsertLocation);
router.delete('/:id', auth, adminOnly, deleteLocation);

module.exports = router;
