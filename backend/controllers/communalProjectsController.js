const CommunalProjects = require('../models/CommunalProjects')
const { uploadBuffer, deleteByPublicId } = require('../utils/cloudinary')

// Get Communal Projects Data
const getCommunalProjectsData = async (req, res) => {
  try {
    let communalData = await CommunalProjects.findOne({ isActive: true })

    if (!communalData) {
      return res.status(404).json({
        success: false,
        message: 'Communal projects data not found'
      })
    }

    res.status(200).json({
      success: true,
      data: communalData
    })
  } catch (error) {
    console.error('Error fetching communal projects data:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while fetching communal projects data'
    })
  }
}

// Update Communal Projects Data
const updateCommunalProjectsData = async (req, res) => {
  try {
    const { title, subtitle, description, sectionTitle, sectionDescription } = req.body

    let communalData = await CommunalProjects.findOne({ isActive: true })

    if (!communalData) {
      return res.status(404).json({
        success: false,
        message: 'Communal projects data not found'
      })
    }

    if (title) communalData.title = title
    if (subtitle) communalData.subtitle = subtitle
    if (description) communalData.description = description
    if (sectionTitle) communalData.sectionTitle = sectionTitle
    if (sectionDescription) communalData.sectionDescription = sectionDescription

    await communalData.save()

    res.status(200).json({
      success: true,
      message: 'Communal projects data updated successfully',
      data: communalData
    })
  } catch (error) {
    console.error('Error updating communal projects data:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while updating communal projects data'
    })
  }
}

// Update Hero Image
const updateHeroImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      })
    }

    let communalData = await CommunalProjects.findOne({ isActive: true })

    if (!communalData) {
      return res.status(404).json({
        success: false,
        message: 'Communal projects data not found'
      })
    }

    // Delete old image from Cloudinary if exists
    if (communalData.heroImage && communalData.heroImage.publicId) {
      await deleteByPublicId(communalData.heroImage.publicId)
    }

    // Upload new image
    const result = await uploadBuffer(req.file.buffer, 'communal-projects/hero')

    communalData.heroImage = {
      url: result.secure_url,
      publicId: result.public_id,
      alt: req.body.alt || 'Communal Projects Hero'
    }

    await communalData.save()

    res.status(200).json({
      success: true,
      message: 'Hero image updated successfully',
      data: communalData
    })
  } catch (error) {
    console.error('Error updating hero image:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while updating hero image'
    })
  }
}

// Add Gallery Image
const addGalleryImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      })
    }

    const { alt, title, description, order, location, address, client, duration } = req.body

    let communalData = await CommunalProjects.findOne({ isActive: true })

    if (!communalData) {
      return res.status(404).json({
        success: false,
        message: 'Communal projects data not found'
      })
    }

    // Upload image to Cloudinary
    const result = await uploadBuffer(req.file.buffer, 'communal-projects/gallery')

    const newImage = {
      url: result.secure_url,
      publicId: result.public_id,
      alt: alt || 'Communal Project',
      title: title || `Communal Project ${communalData.galleryImages.length + 1}`,
      description: description || 'This magnificent communal project stands as a testament to our dedication to preserving traditional temple architecture. Built with high-quality marble and intricate carvings, it serves as a spiritual gathering place for the community.',
      location: location || '',
      address: address || '',
      client: client || '',
      duration: duration || '',
      order: parseInt(order) || communalData.galleryImages.length
    }

    communalData.galleryImages.push(newImage)
    await communalData.save()

    res.status(200).json({
      success: true,
      message: 'Gallery image added successfully',
      data: communalData
    })
  } catch (error) {
    console.error('Error adding gallery image:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while adding gallery image'
    })
  }
}

// Update Gallery Image
const updateGalleryImage = async (req, res) => {
  try {
    const { imageId } = req.params
    const { alt, title, description, order, location, address, client, duration } = req.body

    let communalData = await CommunalProjects.findOne({ isActive: true })

    if (!communalData) {
      return res.status(404).json({
        success: false,
        message: 'Communal projects data not found'
      })
    }

    const imageIndex = communalData.galleryImages.findIndex(img => img._id.toString() === imageId)

    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Gallery image not found'
      })
    }

    // If new image file is provided, update it
    if (req.file) {
      // Delete old image from Cloudinary
      if (communalData.galleryImages[imageIndex].publicId) {
        await deleteByPublicId(communalData.galleryImages[imageIndex].publicId)
      }

      // Upload new image
      const result = await uploadBuffer(req.file.buffer, 'communal-projects/gallery')

      communalData.galleryImages[imageIndex].url = result.secure_url
      communalData.galleryImages[imageIndex].publicId = result.public_id
    }

    // Update other fields
    if (alt) communalData.galleryImages[imageIndex].alt = alt
    if (title) communalData.galleryImages[imageIndex].title = title
    if (description) communalData.galleryImages[imageIndex].description = description
    if (location) communalData.galleryImages[imageIndex].location = location
    if (address) communalData.galleryImages[imageIndex].address = address
    if (client) communalData.galleryImages[imageIndex].client = client
    if (duration) communalData.galleryImages[imageIndex].duration = duration
    if (order !== undefined) communalData.galleryImages[imageIndex].order = parseInt(order)

    await communalData.save()

    res.status(200).json({
      success: true,
      message: 'Gallery image updated successfully',
      data: communalData
    })
  } catch (error) {
    console.error('Error updating gallery image:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while updating gallery image'
    })
  }
}

// Delete Gallery Image
const deleteGalleryImage = async (req, res) => {
  try {
    const { imageId } = req.params

    let communalData = await CommunalProjects.findOne({ isActive: true })

    if (!communalData) {
      return res.status(404).json({
        success: false,
        message: 'Communal projects data not found'
      })
    }

    const imageIndex = communalData.galleryImages.findIndex(img => img._id.toString() === imageId)

    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Gallery image not found'
      })
    }

    // Delete image from Cloudinary
    if (communalData.galleryImages[imageIndex].publicId) {
      await deleteByPublicId(communalData.galleryImages[imageIndex].publicId)
    }

    // Remove image from array
    communalData.galleryImages.splice(imageIndex, 1)
    await communalData.save()

    res.status(200).json({
      success: true,
      message: 'Gallery image deleted successfully',
      data: communalData
    })
  } catch (error) {
    console.error('Error deleting gallery image:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while deleting gallery image'
    })
  }
}

module.exports = {
  getCommunalProjectsData,
  updateCommunalProjectsData,
  updateHeroImage,
  addGalleryImage,
  updateGalleryImage,
  deleteGalleryImage
}
