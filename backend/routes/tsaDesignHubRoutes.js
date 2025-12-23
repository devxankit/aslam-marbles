const express = require('express');
const router = express.Router();
const { getTSADesignHub, updateTSADesignHub } = require('../controllers/tsaDesignHubController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');

router.route('/')
    .get(getTSADesignHub)
    .put(auth, adminOnly, updateTSADesignHub);

module.exports = router;
