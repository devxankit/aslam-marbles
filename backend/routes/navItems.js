const express = require('express');
const { getNavItems, createNavItem, updateNavItem, deleteNavItem } = require('../controllers/navItemController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');
const { navUpload } = require('../middlewares/navUpload');

const router = express.Router();

router.get('/', getNavItems);
router.post('/', auth, adminOnly, navUpload, createNavItem);
router.put('/:id', auth, adminOnly, navUpload, updateNavItem);
router.delete('/:id', auth, adminOnly, deleteNavItem);

module.exports = router;

