const express = require('express');
const router = express.Router();
const {
    getTrustedBy,
    updateHeading,
    addCompany,
    updateCompany,
    deleteCompany,
    reorderCompanies
} = require('../controllers/trustedByController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');

// Public route
router.get('/', getTrustedBy);

// Admin routes
router.put('/heading', auth, adminOnly, updateHeading);
router.post('/company', auth, adminOnly, addCompany);
router.put('/company/:id', auth, adminOnly, updateCompany);
router.delete('/company/:id', auth, adminOnly, deleteCompany);
router.put('/reorder', auth, adminOnly, reorderCompanies);

module.exports = router;
