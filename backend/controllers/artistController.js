const Artist = require('../models/Artist')
const { uploadBuffer, deleteByPublicId } = require('../utils/cloudinary')

// Get artist page data
const getArtistData = async (req, res) => {
  try {
    const artistData = await Artist.findOne({ isActive: true })
    
    if (!artistData) {
      return res.status(404).json({
        success: false,
        message: 'Artist page data not found'
      })
    }

    res.status(200).json({
      success: true,
      data: artistData
    })
  } catch (error) {
    console.error('Error fetching artist data:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while fetching artist data'
    })
  }
}

// Update artist page data
const updateArtistData = async (req, res) => {
  try {
    const { title, description, sections } = req.body
    
    let artistData = await Artist.findOne({ isActive: true })
    
    if (!artistData) {
      return res.status(404).json({
        success: false,
        message: 'Artist page data not found'
      })
    }

    // Update basic fields
    if (title) artistData.title = title
    if (description) artistData.description = description
    if (sections) artistData.sections = sections

    await artistData.save()

    res.status(200).json({
      success: true,
      message: 'Artist data updated successfully',
      data: artistData
    })
  } catch (error) {
    console.error('Error updating artist data:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while updating artist data'
    })
  }
}

// Update hero image
const updateHeroImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      })
    }

    let artistData = await Artist.findOne({ isActive: true })
    
    if (!artistData) {
      return res.status(404).json({
        success: false,
        message: 'Artist page data not found'
      })
    }

    // Delete old image from Cloudinary
    if (artistData.heroImage?.publicId) {
      await deleteByPublicId(artistData.heroImage.publicId)
    }

    // Upload new image to Cloudinary
    const result = await uploadBuffer(req.file.buffer, 'artist/hero')

    // Update hero image
    artistData.heroImage = {
      url: result.secure_url,
      publicId: result.public_id
    }

    await artistData.save()

    res.status(200).json({
      success: true,
      message: 'Hero image updated successfully',
      data: artistData
    })
  } catch (error) {
    console.error('Error updating hero image:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while updating hero image'
    })
  }
}

// Add gallery image
const addGalleryImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      })
    }

    const { alt, order } = req.body

    let artistData = await Artist.findOne({ isActive: true })
    
    if (!artistData) {
      return res.status(404).json({
        success: false,
        message: 'Artist page data not found'
      })
    }

    // Upload image to Cloudinary
    const result = await uploadBuffer(req.file.buffer, 'artist/gallery')

    // Add to gallery
    const newImage = {
      url: result.secure_url,
      publicId: result.public_id,
      alt: alt || 'Artisan',
      order: parseInt(order) || artistData.galleryImages.length
    }

    artistData.galleryImages.push(newImage)
    await artistData.save()

    res.status(200).json({
      success: true,
      message: 'Gallery image added successfully',
      data: artistData
    })
  } catch (error) {
    console.error('Error adding gallery image:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while adding gallery image'
    })
  }
}

// Update gallery image
const updateGalleryImage = async (req, res) => {
  try {
    const { imageId } = req.params
    const { alt, order } = req.body

    let artistData = await Artist.findOne({ isActive: true })
    
    if (!artistData) {
      return res.status(404).json({
        success: false,
        message: 'Artist page data not found'
      })
    }

    const imageIndex = artistData.galleryImages.findIndex(img => img._id.toString() === imageId)
    
    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Gallery image not found'
      })
    }

    // Update image if new file provided
    if (req.file) {
      // Delete old image from Cloudinary
      await deleteByPublicId(artistData.galleryImages[imageIndex].publicId)
      
      // Upload new image
      const result = await uploadBuffer(req.file.buffer, 'artist/gallery')
      
      artistData.galleryImages[imageIndex].url = result.secure_url
      artistData.galleryImages[imageIndex].publicId = result.public_id
    }

    // Update other fields
    if (alt !== undefined) artistData.galleryImages[imageIndex].alt = alt
    if (order !== undefined) artistData.galleryImages[imageIndex].order = parseInt(order)

    await artistData.save()

    res.status(200).json({
      success: true,
      message: 'Gallery image updated successfully',
      data: artistData
    })
  } catch (error) {
    console.error('Error updating gallery image:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while updating gallery image'
    })
  }
}

// Delete gallery image
const deleteGalleryImage = async (req, res) => {
  try {
    const { imageId } = req.params

    let artistData = await Artist.findOne({ isActive: true })
    
    if (!artistData) {
      return res.status(404).json({
        success: false,
        message: 'Artist page data not found'
      })
    }

    const imageIndex = artistData.galleryImages.findIndex(img => img._id.toString() === imageId)
    
    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Gallery image not found'
      })
    }

    // Delete from Cloudinary
    await deleteByPublicId(artistData.galleryImages[imageIndex].publicId)

    // Remove from array
    artistData.galleryImages.splice(imageIndex, 1)
    await artistData.save()

    res.status(200).json({
      success: true,
      message: 'Gallery image deleted successfully',
      data: artistData
    })
  } catch (error) {
    console.error('Error deleting gallery image:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while deleting gallery image'
    })
  }
}

// Update visit store section
const updateVisitStoreSection = async (req, res) => {
  try {
    const { buttonText, buttonLink } = req.body

    let artistData = await Artist.findOne({ isActive: true })
    
    if (!artistData) {
      return res.status(404).json({
        success: false,
        message: 'Artist page data not found'
      })
    }

    // Update image if provided
    if (req.file) {
      // Delete old image from Cloudinary
      if (artistData.visitStoreSection?.image?.publicId) {
        await deleteByPublicId(artistData.visitStoreSection.image.publicId)
      }

      // Upload new image
      const result = await uploadBuffer(req.file.buffer, 'artist/visit-store')
      
      if (!artistData.visitStoreSection) {
        artistData.visitStoreSection = {}
      }
      
      artistData.visitStoreSection.image = {
        url: result.secure_url,
        publicId: result.public_id
      }
    }

    // Update other fields
    if (buttonText !== undefined) {
      if (!artistData.visitStoreSection) artistData.visitStoreSection = {}
      artistData.visitStoreSection.buttonText = buttonText
    }
    if (buttonLink !== undefined) {
      if (!artistData.visitStoreSection) artistData.visitStoreSection = {}
      artistData.visitStoreSection.buttonLink = buttonLink
    }

    await artistData.save()

    res.status(200).json({
      success: true,
      message: 'Visit store section updated successfully',
      data: artistData
    })
  } catch (error) {
    console.error('Error updating visit store section:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while updating visit store section'
    })
  }
}

module.exports = {
  getArtistData,
  updateArtistData,
  updateHeroImage,
  addGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  updateVisitStoreSection
}
