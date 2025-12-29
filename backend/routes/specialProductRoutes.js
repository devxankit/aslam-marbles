const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Temp upload folder

const {
    getProductsByType,
    getProductById,
    upsertProduct,
    deleteProduct
} = require('../controllers/specialProductController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');

// Public
router.get('/:type', getProductsByType);
router.get('/:type/:id', getProductById); // order matters, or use different path

// Admin
// Support multipart/form-data for image uploads
router.post('/', auth, adminOnly, upload.array('images'), upsertProduct);
router.delete('/:id', auth, adminOnly, deleteProduct);

module.exports = router;
