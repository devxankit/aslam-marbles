const express = require('express');
const router = express.Router();
const translationController = require('../controllers/translationController');

// Public endpoints for translation
router.post('/', translationController.translateText);
router.post('/batch', translationController.translateBatch);
router.post('/object', translationController.translateObject);

module.exports = router;
