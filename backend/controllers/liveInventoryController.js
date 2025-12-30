const LiveInventory = require('../models/LiveInventory');
const LiveInventoryPage = require('../models/LiveInventoryPage');
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
        return {
            url: result.secure_url,
            publicId: result.public_id
        };
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

// @desc    Get live inventory page settings
// @route   GET /api/live-inventory/settings
// @access  Public
const getPageSettings = asyncHandler(async (req, res) => {
    let settings = await LiveInventoryPage.findOne();
    if (!settings) {
        settings = await LiveInventoryPage.create({});
    }
    res.json(settings);
});

// @desc    Update live inventory page settings
// @route   PUT /api/live-inventory/settings
// @access  Private/Admin
const updatePageSettings = asyncHandler(async (req, res) => {
    let settings = await LiveInventoryPage.findOne();
    if (!settings) {
        settings = await LiveInventoryPage.create({});
    }

    const { headSection, horizontalSection } = req.body;

    if (headSection) {
        settings.headSection.title = headSection.title || settings.headSection.title;
        settings.headSection.subtitle = headSection.subtitle || settings.headSection.subtitle;
        settings.headSection.description = headSection.description || settings.headSection.description;

        if (headSection.heroImage?.url && headSection.heroImage.url.startsWith('data:image')) {
            const uploaded = await uploadBase64ToCloudinary(headSection.heroImage.url, 'page-assets');
            if (uploaded) {
                settings.headSection.heroImage = uploaded;
            }
        }
    }

    if (horizontalSection) {
        if (horizontalSection.image?.url && horizontalSection.image.url.startsWith('data:image')) {
            const uploaded = await uploadBase64ToCloudinary(horizontalSection.image.url, 'page-assets');
            if (uploaded) {
                settings.horizontalSection.image = uploaded;
            }
        }
    }

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
});

// @desc    Create live inventory item
// @route   POST /api/live-inventory
// @access  Private/Admin
const createInventoryItem = asyncHandler(async (req, res) => {
    const itemData = req.body;

    if (itemData.image?.url && itemData.image.url.startsWith('data:image')) {
        const uploaded = await uploadBase64ToCloudinary(itemData.image.url, itemData.category || 'misc');
        if (uploaded) {
            itemData.image.url = uploaded.url;
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
            const uploaded = await uploadBase64ToCloudinary(req.body.image.url, req.body.category || 'misc');
            if (uploaded) {
                req.body.image.url = uploaded.url;
            }
        }

        item.name = req.body.name || item.name;
        item.category = req.body.category || item.category;
        item.image = req.body.image || item.image;
        item.specifications = req.body.specifications || item.specifications;
        item.status = req.body.status || item.status;
        item.displayOrder = req.body.displayOrder !== undefined ? req.body.displayOrder : item.displayOrder;
        item.isPublic = req.body.isPublic !== undefined ? req.body.isPublic : item.isPublic;
        item.price = req.body.price !== undefined ? req.body.price : item.price;

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
    deleteInventoryItem,
    getPageSettings,
    updatePageSettings
};
