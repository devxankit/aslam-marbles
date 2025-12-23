const InternationalProjects = require('../models/InternationalProjects')
const { uploadBuffer, deleteByPublicId } = require('../utils/cloudinary')

// Get International Projects Data
const getInternationalProjectsData = async (req, res) => {
    try {
        let internationalData = await InternationalProjects.findOne({ isActive: true })

        if (!internationalData) {
            return res.status(404).json({
                success: false,
                message: 'International projects data not found'
            })
        }

        res.status(200).json({
            success: true,
            data: internationalData
        })
    } catch (error) {
        console.error('Error fetching international projects data:', error)
        res.status(500).json({
            success: false,
            message: 'Server error while fetching international projects data'
        })
    }
}

// Update International Projects Data
const updateInternationalProjectsData = async (req, res) => {
    try {
        const { title, subtitle, description, sectionTitle, sectionDescription } = req.body

        let internationalData = await InternationalProjects.findOne({ isActive: true })

        if (!internationalData) {
            internationalData = new InternationalProjects({
                heroImage: {
                    url: 'https://via.placeholder.com/1200x600',
                    publicId: 'temp_placeholder_' + Date.now()
                }
            })
        }

        if (title) internationalData.title = title
        if (subtitle) internationalData.subtitle = subtitle
        if (description) internationalData.description = description
        if (sectionTitle) internationalData.sectionTitle = sectionTitle
        if (sectionDescription) internationalData.sectionDescription = sectionDescription

        await internationalData.save()

        res.status(200).json({
            success: true,
            message: 'International projects data updated successfully',
            data: internationalData
        })
    } catch (error) {
        console.error('Error updating international projects data:', error)
        res.status(500).json({
            success: false,
            message: 'Server error while updating international projects data'
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

        let internationalData = await InternationalProjects.findOne({ isActive: true })

        if (!internationalData) {
            internationalData = new InternationalProjects({
                heroImage: { url: '', publicId: '' }
            })
        }

        // Delete old image from Cloudinary if exists
        if (internationalData.heroImage && internationalData.heroImage.publicId && !internationalData.heroImage.publicId.startsWith('temp_')) {
            await deleteByPublicId(internationalData.heroImage.publicId)
        }

        // Upload new image
        const result = await uploadBuffer(req.file.buffer, 'international-projects/hero')

        internationalData.heroImage = {
            url: result.secure_url,
            publicId: result.public_id,
            alt: req.body.alt || 'International Projects Hero'
        }

        await internationalData.save()

        res.status(200).json({
            success: true,
            message: 'Hero image updated successfully',
            data: internationalData
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

        let internationalData = await InternationalProjects.findOne({ isActive: true })

        if (!internationalData) {
            internationalData = new InternationalProjects({
                heroImage: { url: 'placeholder', publicId: 'placeholder' }
            })
        }

        // Upload image to Cloudinary
        const result = await uploadBuffer(req.file.buffer, 'international-projects/gallery')

        const newImage = {
            url: result.secure_url,
            publicId: result.public_id,
            alt: alt || 'International Project',
            title: title || `International Project ${internationalData.galleryImages.length + 1}`,
            description: description || 'An iconic international project.',
            location: location || '',
            address: address || '',
            client: client || '',
            duration: duration || '',
            order: parseInt(order) || internationalData.galleryImages.length
        }

        internationalData.galleryImages.push(newImage)
        await internationalData.save()

        res.status(200).json({
            success: true,
            message: 'Gallery image added successfully',
            data: internationalData
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

        let internationalData = await InternationalProjects.findOne({ isActive: true })

        if (!internationalData) {
            return res.status(404).json({
                success: false,
                message: 'International projects data not found'
            })
        }

        const imageIndex = internationalData.galleryImages.findIndex(img => img._id.toString() === imageId)

        if (imageIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Gallery image not found'
            })
        }

        // If new image file is provided, update it
        if (req.file) {
            // Delete old image from Cloudinary
            if (internationalData.galleryImages[imageIndex].publicId) {
                await deleteByPublicId(internationalData.galleryImages[imageIndex].publicId)
            }

            // Upload new image
            const result = await uploadBuffer(req.file.buffer, 'international-projects/gallery')

            internationalData.galleryImages[imageIndex].url = result.secure_url
            internationalData.galleryImages[imageIndex].publicId = result.public_id
        }

        // Update other fields
        if (alt) internationalData.galleryImages[imageIndex].alt = alt
        if (title) internationalData.galleryImages[imageIndex].title = title
        if (description) internationalData.galleryImages[imageIndex].description = description
        if (location) internationalData.galleryImages[imageIndex].location = location
        if (address) internationalData.galleryImages[imageIndex].address = address
        if (client) internationalData.galleryImages[imageIndex].client = client
        if (duration) internationalData.galleryImages[imageIndex].duration = duration
        if (order !== undefined) internationalData.galleryImages[imageIndex].order = parseInt(order)

        await internationalData.save()

        res.status(200).json({
            success: true,
            message: 'Gallery image updated successfully',
            data: internationalData
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

        let internationalData = await InternationalProjects.findOne({ isActive: true })

        if (!internationalData) {
            return res.status(404).json({
                success: false,
                message: 'International projects data not found'
            })
        }

        const imageIndex = internationalData.galleryImages.findIndex(img => img._id.toString() === imageId)

        if (imageIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Gallery image not found'
            })
        }

        // Delete image from Cloudinary
        if (internationalData.galleryImages[imageIndex].publicId) {
            await deleteByPublicId(internationalData.galleryImages[imageIndex].publicId)
        }

        // Remove image from array
        internationalData.galleryImages.splice(imageIndex, 1)
        await internationalData.save()

        res.status(200).json({
            success: true,
            message: 'Gallery image deleted successfully',
            data: internationalData
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
    getInternationalProjectsData,
    updateInternationalProjectsData,
    updateHeroImage,
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage
}
