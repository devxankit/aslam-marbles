const Location = require('../models/Location');
const { cloudinary } = require('../utils/cloudinary');

// @desc    Get all locations
// @route   GET /api/locations
// @access  Public
const getLocations = async (req, res) => {
    try {
        const { type, city } = req.query;
        const filter = { isActive: true };

        if (type) filter.type = type;
        if (city) filter['address.city'] = city;

        const locations = await Location.find(filter).sort({ displayOrder: 1 });
        res.json({ success: true, data: locations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single location
// @route   GET /api/locations/:id
// @access  Public
const getLocationById = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).json({ success: false, message: 'Location not found' });
        }
        res.json({ success: true, data: location });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create/Update location
// @route   POST /api/locations
// @access  Private/Admin
const upsertLocation = async (req, res) => {
    try {
        const { _id, name, type, address, contact, coordinates, openingHours, features, description, isActive, displayOrder, images } = req.body;

        let location;
        if (_id) {
            location = await Location.findById(_id);
            if (!location) {
                return res.status(404).json({ success: false, message: 'Location not found' });
            }
            Object.assign(location, { name, type, address, contact, coordinates, openingHours, features, description, isActive, displayOrder });
        } else {
            location = new Location({ name, type, address, contact, coordinates, openingHours, features, description, isActive, displayOrder });
        }

        // Handle image uploads
        if (images && Array.isArray(images)) {
            const uploadedImages = [];
            for (const img of images) {
                if (typeof img === 'string' && img.startsWith('data:image')) {
                    const result = await cloudinary.uploader.upload(img, {
                        folder: `locations/${location._id || 'temp'}`
                    });
                    uploadedImages.push({
                        url: result.secure_url,
                        publicId: result.public_id,
                        alt: name
                    });
                } else if (img.url) {
                    uploadedImages.push(img);
                }
            }
            location.images = uploadedImages;
        }

        await location.save();
        res.json({ success: true, data: location });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete location
// @route   DELETE /api/locations/:id
// @access  Private/Admin
const deleteLocation = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).json({ success: false, message: 'Location not found' });
        }

        // Delete images from Cloudinary
        for (const img of location.images) {
            if (img.publicId) {
                await cloudinary.uploader.destroy(img.publicId);
            }
        }

        await location.deleteOne();
        res.json({ success: true, message: 'Location deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getLocations,
    getLocationById,
    upsertLocation,
    deleteLocation
};
