const express = require('express');
const router = express.Router();
const translationController = require('../controllers/translationController');

// Public endpoints for translation
router.post('/', translationController.translateText);
router.post('/batch', translationController.translateBatch);
router.post('/object', translationController.translateObject);

// Cache management endpoints (public for now, consider adding auth)
router.get('/cache/stats', translationController.getCacheStats);
router.post('/cache/cleanup', translationController.cleanupCache);

module.exports = router;
