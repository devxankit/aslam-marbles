const express = require('express');
const router = express.Router();
const { getTSAInternational, updateTSAInternational } = require('../controllers/tsaInternationalController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');

router.route('/')
    .get(getTSAInternational)
    .put(auth, adminOnly, updateTSAInternational);

module.exports = router;
