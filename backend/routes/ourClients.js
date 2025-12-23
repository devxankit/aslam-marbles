const express = require('express')
const router = express.Router()
const multer = require('multer')
const {
  getOurClientsData,
  updateOurClientsData,
  addHeadingImage,
  updateHeadingImage,
  deleteHeadingImage
} = require('../controllers/ourClientsController')
const { auth, adminOnly } = require('../middlewares/authMiddleware')

// Configure multer for memory storage
const storage = multer.memoryStorage()
const upload = multer({ storage })

// Public routes
router.get('/', getOurClientsData)

// Protected routes (Admin only)
router.put('/', auth, adminOnly, updateOurClientsData)
router.post('/heading-image', auth, adminOnly, upload.single('image'), addHeadingImage)
router.put('/heading-image/:imageId', auth, adminOnly, upload.single('image'), updateHeadingImage)
router.delete('/heading-image/:imageId', auth, adminOnly, deleteHeadingImage)

module.exports = router
