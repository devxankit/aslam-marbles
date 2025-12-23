const express = require('express')
const router = express.Router()
const {
  getArtistData,
  updateArtistData,
  updateHeroImage,
  addGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  updateVisitStoreSection
} = require('../controllers/artistController')
const { uploadSingle } = require('../middlewares/artistUpload')
const { auth } = require('../middlewares/authMiddleware')

// Public routes
router.get('/', getArtistData)

// Protected routes (admin only)
router.put('/', auth, updateArtistData)
router.post('/hero-image', auth, uploadSingle, updateHeroImage)
router.post('/gallery', auth, uploadSingle, addGalleryImage)
router.put('/gallery/:imageId', auth, uploadSingle, updateGalleryImage)
router.delete('/gallery/:imageId', auth, deleteGalleryImage)
router.post('/visit-store', auth, uploadSingle, updateVisitStoreSection)

module.exports = router
