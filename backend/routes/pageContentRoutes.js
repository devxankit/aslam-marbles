const express = require('express');
const router = express.Router();
const { getPageContent, upsertPageContent } = require('../controllers/pageContentController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');

router.route('/:slug')
    .get(getPageContent);

router.route('/')
    .post(auth, adminOnly, upsertPageContent);

module.exports = router;
