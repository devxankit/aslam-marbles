const express = require('express')
const router = express.Router()
const multer = require('multer')
const { auth, adminOnly } = require('../middlewares/authMiddleware')
const {
  getCommunalProjectsData,
  updateCommunalProjectsData,
  updateHeroImage,
  addGalleryImage,
  updateGalleryImage,
  deleteGalleryImage
} = require('../controllers/communalProjectsController')

// Multer configuration for memory storage
const storage = multer.memoryStorage()
const upload = multer({ storage })

// Public routes
router.get('/', getCommunalProjectsData)

// Protected routes (Admin only)
router.put('/', auth, adminOnly, updateCommunalProjectsData)
router.put('/hero-image', auth, adminOnly, upload.single('image'), updateHeroImage)
router.post('/gallery-image', auth, adminOnly, upload.single('image'), addGalleryImage)
router.put('/gallery-image/:imageId', auth, adminOnly, upload.single('image'), updateGalleryImage)
router.delete('/gallery-image/:imageId', auth, adminOnly, deleteGalleryImage)

module.exports = router
