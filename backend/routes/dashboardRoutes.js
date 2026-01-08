const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middlewares/authMiddleware');
const { getDashboardStats } = require('../controllers/dashboardController');

router.get('/stats', auth, adminOnly, getDashboardStats);

module.exports = router;
