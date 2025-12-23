const OurClients = require('../models/OurClients')
const { uploadBuffer, deleteByPublicId } = require('../utils/cloudinary')

// Get our clients page data
const getOurClientsData = async (req, res) => {
  try {
    const clientsData = await OurClients.findOne({ isActive: true })
    
    if (!clientsData) {
      return res.status(404).json({
        success: false,
        message: 'Our Clients page data not found'
      })
    }

    res.status(200).json({
      success: true,
      data: clientsData
    })
  } catch (error) {
    console.error('Error fetching our clients data:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while fetching our clients data'
    })
  }
}

// Update our clients page data (title and content)
const updateOurClientsData = async (req, res) => {
  try {
    const { title, contentSections } = req.body
    
    let clientsData = await OurClients.findOne({ isActive: true })
    
    if (!clientsData) {
      return res.status(404).json({
        success: false,
        message: 'Our Clients page data not found'
      })
    }

    // Update basic fields
    if (title) clientsData.title = title
    if (contentSections) clientsData.contentSections = contentSections

    await clientsData.save()

    res.status(200).json({
      success: true,
      message: 'Our Clients data updated successfully',
      data: clientsData
    })
  } catch (error) {
    console.error('Error updating our clients data:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while updating our clients data'
    })
  }
}

// Add heading image
const addHeadingImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      })
    }

    const { alt, order } = req.body

    let clientsData = await OurClients.findOne({ isActive: true })
    
    if (!clientsData) {
      return res.status(404).json({
        success: false,
        message: 'Our Clients page data not found'
      })
    }

    // Upload image to Cloudinary
    const result = await uploadBuffer(req.file.buffer, 'our-clients/heading')

    // Add to heading images
    const newImage = {
      url: result.secure_url,
      publicId: result.public_id,
      alt: alt || 'Our Clients',
      order: parseInt(order) || clientsData.headingImages.length
    }

    clientsData.headingImages.push(newImage)
    await clientsData.save()

    res.status(200).json({
      success: true,
      message: 'Heading image added successfully',
      data: clientsData
    })
  } catch (error) {
    console.error('Error adding heading image:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while adding heading image'
    })
  }
}

// Update heading image
const updateHeadingImage = async (req, res) => {
  try {
    const { imageId } = req.params
    const { alt, order } = req.body

    let clientsData = await OurClients.findOne({ isActive: true })
    
    if (!clientsData) {
      return res.status(404).json({
        success: false,
        message: 'Our Clients page data not found'
      })
    }

    const imageIndex = clientsData.headingImages.findIndex(img => img._id.toString() === imageId)
    
    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Heading image not found'
      })
    }

    // Update image if new file provided
    if (req.file) {
      // Delete old image from Cloudinary
      await deleteByPublicId(clientsData.headingImages[imageIndex].publicId)
      
      // Upload new image
      const result = await uploadBuffer(req.file.buffer, 'our-clients/heading')
      
      clientsData.headingImages[imageIndex].url = result.secure_url
      clientsData.headingImages[imageIndex].publicId = result.public_id
    }

    // Update other fields
    if (alt !== undefined) clientsData.headingImages[imageIndex].alt = alt
    if (order !== undefined) clientsData.headingImages[imageIndex].order = parseInt(order)

    await clientsData.save()

    res.status(200).json({
      success: true,
      message: 'Heading image updated successfully',
      data: clientsData
    })
  } catch (error) {
    console.error('Error updating heading image:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while updating heading image'
    })
  }
}

// Delete heading image
const deleteHeadingImage = async (req, res) => {
  try {
    const { imageId } = req.params

    let clientsData = await OurClients.findOne({ isActive: true })
    
    if (!clientsData) {
      return res.status(404).json({
        success: false,
        message: 'Our Clients page data not found'
      })
    }

    const imageIndex = clientsData.headingImages.findIndex(img => img._id.toString() === imageId)
    
    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Heading image not found'
      })
    }

    // Delete from Cloudinary
    await deleteByPublicId(clientsData.headingImages[imageIndex].publicId)

    // Remove from array
    clientsData.headingImages.splice(imageIndex, 1)
    await clientsData.save()

    res.status(200).json({
      success: true,
      message: 'Heading image deleted successfully',
      data: clientsData
    })
  } catch (error) {
    console.error('Error deleting heading image:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while deleting heading image'
    })
  }
}

module.exports = {
  getOurClientsData,
  updateOurClientsData,
  addHeadingImage,
  updateHeadingImage,
  deleteHeadingImage
}
