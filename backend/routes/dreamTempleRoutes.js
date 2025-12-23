const express = require('express');
const router = express.Router();
const { getDreamTempleData, updateDreamTempleData, uploadSingle } = require('../controllers/dreamTempleController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', getDreamTempleData);
router.put('/', auth, adminOnly, upload.any(), updateDreamTempleData);
router.post('/upload-single', auth, adminOnly, upload.single('image'), uploadSingle);

module.exports = router;
