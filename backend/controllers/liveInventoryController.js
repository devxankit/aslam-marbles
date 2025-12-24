const LiveInventory = require('../models/LiveInventory');
const asyncHandler = require('express-async-handler');
const cloudinary = require('cloudinary').v2;

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadBase64ToCloudinary = async (base64String, folder) => {
    try {
        if (!base64String || !base64String.startsWith('data:image')) return null;

        const result = await cloudinary.uploader.upload(base64String, {
            folder: `stone-art/inventory/${folder}`,
            resource_type: 'image'
        });
        return result.secure_url;
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        throw new Error('Image upload failed');
    }
};

// @desc    Get all live inventory
// @route   GET /api/live-inventory
// @access  Public
const getLiveInventory = asyncHandler(async (req, res) => {
    const filter = req.query.public === 'false' ? {} : { isPublic: true };
    const inventory = await LiveInventory.find(filter).sort({ displayOrder: 1, createdAt: -1 });
    res.json(inventory);
});

// @desc    Create live inventory item
// @route   POST /api/live-inventory
// @access  Private/Admin
const createInventoryItem = asyncHandler(async (req, res) => {
    const itemData = req.body;

    if (itemData.image?.url && itemData.image.url.startsWith('data:image')) {
        const uploadedUrl = await uploadBase64ToCloudinary(itemData.image.url, itemData.category || 'misc');
        if (uploadedUrl) {
            itemData.image.url = uploadedUrl;
        }
    }

    const item = await LiveInventory.create(itemData);
    res.status(201).json(item);
});

// @desc    Update live inventory item
// @route   PUT /api/live-inventory/:id
// @access  Private/Admin
const updateInventoryItem = asyncHandler(async (req, res) => {
    const item = await LiveInventory.findById(req.params.id);

    if (item) {
        if (req.body.image?.url && req.body.image.url.startsWith('data:image')) {
            const uploadedUrl = await uploadBase64ToCloudinary(req.body.image.url, req.body.category || 'misc');
            if (uploadedUrl) {
                req.body.image.url = uploadedUrl;
            }
        }

        item.name = req.body.name || item.name;
        item.category = req.body.category || item.category;
        item.image = req.body.image || item.image;
        item.specifications = req.body.specifications || item.specifications;
        item.status = req.body.status || item.status;
        item.displayOrder = req.body.displayOrder !== undefined ? req.body.displayOrder : item.displayOrder;
        item.isPublic = req.body.isPublic !== undefined ? req.body.isPublic : item.isPublic;

        const updatedItem = await item.save();
        res.json(updatedItem);
    } else {
        res.status(404);
        throw new Error('Inventory item not found');
    }
});

// @desc    Delete live inventory item
// @route   DELETE /api/live-inventory/:id
// @access  Private/Admin
const deleteInventoryItem = asyncHandler(async (req, res) => {
    const item = await LiveInventory.findById(req.params.id);

    if (item) {
        await item.deleteOne();
        res.json({ message: 'Inventory item removed' });
    } else {
        res.status(404);
        throw new Error('Inventory item not found');
    }
});

module.exports = {
    getLiveInventory,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem
};
