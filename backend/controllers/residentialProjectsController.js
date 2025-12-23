const ResidentialProjects = require('../models/ResidentialProjects')
const { uploadBuffer, deleteByPublicId } = require('../utils/cloudinary')

// Get Residential Projects Data
const getResidentialProjectsData = async (req, res) => {
    try {
        let residentialData = await ResidentialProjects.findOne({ isActive: true })

        // If not found, create default one (optional, helps with first load)
        if (!residentialData) {
            // Create a default instance if none exists
            const defaultData = new ResidentialProjects({
                heroImage: {
                    url: 'https://res.cloudinary.com/demo/image/upload/v1611090000/sample.jpg', // Placeholder
                    publicId: 'placeholder_id',
                    alt: 'Residential Projects Hero'
                }
            });
            // We generally shouldn't auto-create with invalid placeholder data in prod, but for dev it helps.
            // Actually, let's just return 404 or empty structure if that's better.
            // But for consistency with frontend expectations, returning null or default might be better.
            // Let's stick to returning 404 if not found, but considering the user wants to manage it, 
            // maybe we should facilitate creation. For now, 404.

            // Actually, if I look at `CommunalProjects`, it seemed to expect data to exist.
            // I will return 404 if not found.
        }

        if (!residentialData) {
            return res.status(404).json({
                success: false,
                message: 'Residential projects data not found'
            })
        }

        res.status(200).json({
            success: true,
            data: residentialData
        })
    } catch (error) {
        console.error('Error fetching residential projects data:', error)
        res.status(500).json({
            success: false,
            message: 'Server error while fetching residential projects data'
        })
    }
}

// Update Residential Projects Data (Text fields)
const updateResidentialProjectsData = async (req, res) => {
    try {
        const { title, subtitle, description, sectionTitle, sectionDescription } = req.body

        let residentialData = await ResidentialProjects.findOne({ isActive: true })

        if (!residentialData) {
            // Create if doesn't exist (Seed)
            // This part requires an initial hero image which we might not have in this request.
            // So we assume it exists or we handle it.
            // If the user uses the 'Save Content' button, they send this data. 
            // If data doesn't exist, we should probably create it.
            residentialData = new ResidentialProjects({
                // defaults will be used
                heroImage: { // Mock hero image necessary for schema validation if required
                    url: 'https://via.placeholder.com/1200x600',
                    publicId: 'temp_placeholder_' + Date.now()
                }
            })
        }

        if (title) residentialData.title = title
        if (subtitle) residentialData.subtitle = subtitle
        if (description) residentialData.description = description
        if (sectionTitle) residentialData.sectionTitle = sectionTitle
        if (sectionDescription) residentialData.sectionDescription = sectionDescription

        await residentialData.save()

        res.status(200).json({
            success: true,
            message: 'Residential projects data updated successfully',
            data: residentialData
        })
    } catch (error) {
        console.error('Error updating residential projects data:', error)
        res.status(500).json({
            success: false,
            message: 'Server error while updating residential projects data'
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

        let residentialData = await ResidentialProjects.findOne({ isActive: true })

        if (!residentialData) {
            // Create new if not exists
            residentialData = new ResidentialProjects({
                heroImage: { url: '', publicId: '' } // will be overwritten
            })
        }

        // Delete old image from Cloudinary if exists
        if (residentialData.heroImage && residentialData.heroImage.publicId && !residentialData.heroImage.publicId.startsWith('temp_')) {
            await deleteByPublicId(residentialData.heroImage.publicId)
        }

        // Upload new image
        const result = await uploadBuffer(req.file.buffer, 'residential-projects/hero')

        residentialData.heroImage = {
            url: result.secure_url,
            publicId: result.public_id,
            alt: req.body.alt || 'Residential Projects Hero'
        }

        await residentialData.save()

        res.status(200).json({
            success: true,
            message: 'Hero image updated successfully',
            data: residentialData
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

        let residentialData = await ResidentialProjects.findOne({ isActive: true })

        if (!residentialData) {
            // If main doc doesn't exist, we can't add gallery image easily without hero.
            // But we can create it.
            residentialData = new ResidentialProjects({
                heroImage: { url: 'placeholder', publicId: 'placeholder' }
            })
        }

        // Upload image to Cloudinary
        const result = await uploadBuffer(req.file.buffer, 'residential-projects/gallery')

        const newImage = {
            url: result.secure_url,
            publicId: result.public_id,
            alt: alt || 'Residential Project',
            title: title || `Residential Project ${residentialData.galleryImages.length + 1}`,
            description: description || 'A beautiful residential project.',
            location: location || '',
            address: address || '',
            client: client || '',
            duration: duration || '',
            order: parseInt(order) || residentialData.galleryImages.length
        }

        residentialData.galleryImages.push(newImage)
        await residentialData.save()

        res.status(200).json({
            success: true,
            message: 'Gallery image added successfully',
            data: residentialData
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

        let residentialData = await ResidentialProjects.findOne({ isActive: true })

        if (!residentialData) {
            return res.status(404).json({
                success: false,
                message: 'Residential projects data not found'
            })
        }

        const imageIndex = residentialData.galleryImages.findIndex(img => img._id.toString() === imageId)

        if (imageIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Gallery image not found'
            })
        }

        // If new image file is provided, update it
        if (req.file) {
            // Delete old image from Cloudinary
            if (residentialData.galleryImages[imageIndex].publicId) {
                await deleteByPublicId(residentialData.galleryImages[imageIndex].publicId)
            }

            // Upload new image
            const result = await uploadBuffer(req.file.buffer, 'residential-projects/gallery')

            residentialData.galleryImages[imageIndex].url = result.secure_url
            residentialData.galleryImages[imageIndex].publicId = result.public_id
        }

        // Update other fields
        if (alt) residentialData.galleryImages[imageIndex].alt = alt
        if (title) residentialData.galleryImages[imageIndex].title = title
        if (description) residentialData.galleryImages[imageIndex].description = description
        if (location) residentialData.galleryImages[imageIndex].location = location
        if (address) residentialData.galleryImages[imageIndex].address = address
        if (client) residentialData.galleryImages[imageIndex].client = client
        if (duration) residentialData.galleryImages[imageIndex].duration = duration
        if (order !== undefined) residentialData.galleryImages[imageIndex].order = parseInt(order)

        await residentialData.save()

        res.status(200).json({
            success: true,
            message: 'Gallery image updated successfully',
            data: residentialData
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

        let residentialData = await ResidentialProjects.findOne({ isActive: true })

        if (!residentialData) {
            return res.status(404).json({
                success: false,
                message: 'Residential projects data not found'
            })
        }

        const imageIndex = residentialData.galleryImages.findIndex(img => img._id.toString() === imageId)

        if (imageIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Gallery image not found'
            })
        }

        // Delete image from Cloudinary
        if (residentialData.galleryImages[imageIndex].publicId) {
            await deleteByPublicId(residentialData.galleryImages[imageIndex].publicId)
        }

        // Remove image from array
        residentialData.galleryImages.splice(imageIndex, 1)
        await residentialData.save()

        res.status(200).json({
            success: true,
            message: 'Gallery image deleted successfully',
            data: residentialData
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
    getResidentialProjectsData,
    updateResidentialProjectsData,
    updateHeroImage,
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage
}
