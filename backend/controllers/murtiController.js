const MurtiGroup = require('../models/MurtiGroup');
const MurtiCategory = require('../models/MurtiCategory');
const MurtiProduct = require('../models/MurtiProduct');
const MurtiPage = require('../models/MurtiPage');
const asyncHandler = require('express-async-handler');
const cloudinary = require('cloudinary').v2;

// @desc    Get Murti Page data
// @route   GET /api/murtis/page
// @access  Public
const getMurtiPageData = asyncHandler(async (req, res) => {
    const data = await MurtiPage.findOne();
    res.json({ success: true, data });
});

// @desc    Get Murti Hierarchy (Groups -> Categories)
// @route   GET /api/murtis/hierarchy
// @access  Public
const getMurtiHierarchy = asyncHandler(async (req, res) => {
    const groups = await MurtiGroup.find().sort({ displayOrder: 1 });
    const hierarchy = await Promise.all(groups.map(async (group) => {
        const categories = await MurtiCategory.find({ groupId: group._id }).sort({ displayOrder: 1 });
        return {
            _id: group._id,
            name: group.name,
            categories
        };
    }));
    res.json({ success: true, data: hierarchy });
});

// @desc    Get Category Details
// @route   GET /api/murtis/category/:id
// @access  Public
const getMurtiCategory = asyncHandler(async (req, res) => {
    const category = await MurtiCategory.findOne({ id: req.params.id });
    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }
    res.json({ success: true, data: category });
});

// @desc    Get Products by Category
// @route   GET /api/murtis/products/:categoryId
// @access  Public
const getMurtiProducts = asyncHandler(async (req, res) => {
    const products = await MurtiProduct.find({ categoryId: req.params.categoryId }).sort({ displayOrder: 1 });
    res.json({ success: true, data: products });
});

// @desc    Get Single Product
// @route   GET /api/murtis/product/:id
// @access  Public
const getMurtiProduct = asyncHandler(async (req, res) => {
    const product = await MurtiProduct.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }
    res.json({ success: true, data: product });
});

// Admin Controllers

// @desc    Update Murti Page Data
// @route   PUT /api/murtis/page
// @access  Private/Admin
const updateMurtiPage = asyncHandler(async (req, res) => {
    let page = await MurtiPage.findOne();
    if (page) {
        Object.assign(page, req.body);
        await page.save();
    } else {
        page = await MurtiPage.create(req.body);
    }
    res.json({ success: true, data: page });
});

// @desc    Create/Update Murti Group
// @route   POST /api/murtis/groups
// @access  Private/Admin
const upsertMurtiGroup = asyncHandler(async (req, res) => {
    const { _id, name, displayOrder } = req.body;
    let group;
    if (_id) {
        group = await MurtiGroup.findByIdAndUpdate(_id, { name, displayOrder }, { new: true });
    } else {
        group = await MurtiGroup.create({ name, displayOrder });
    }
    res.json({ success: true, data: group });
});

// @desc    Create/Update Murti Category
// @route   POST /api/murtis/categories
// @access  Private/Admin
const upsertMurtiCategory = asyncHandler(async (req, res) => {
    const { _id, groupId, id, name, heroSection, displayOrder } = req.body;
    let category;
    if (_id) {
        category = await MurtiCategory.findByIdAndUpdate(_id, { groupId, id, name, heroSection, displayOrder }, { new: true });
    } else {
        category = await MurtiCategory.create({ groupId, id, name, heroSection, displayOrder });
    }
    res.json({ success: true, data: category });
});

// @desc    Upsert Murti Product
// @route   POST /api/murtis/products
// @access  Private/Admin
const upsertMurtiProduct = asyncHandler(async (req, res) => {
    const { _id, categoryId, name, sku, price, material, size, images, isPreOrder, description, displayOrder, inStock } = req.body;

    // Handle Images (expecting array of strings or {url, alt})
    const processedImages = await Promise.all((images || []).map(async (img) => {
        const url = typeof img === 'string' ? img : img.url;
        if (url && url.startsWith('data:image')) {
            const uploadedUrl = await uploadBase64ToCloudinary(url, `products/${categoryId}`);
            return { url: uploadedUrl, alt: name };
        }
        return typeof img === 'string' ? { url: img, alt: name } : img;
    }));

    let product;
    if (_id) {
        product = await MurtiProduct.findByIdAndUpdate(_id, {
            categoryId, name, sku, price, material, size, images: processedImages, isPreOrder, description, displayOrder, inStock
        }, { new: true });
    } else {
        product = await MurtiProduct.create({
            categoryId, name, sku, price, material, size, images: processedImages, isPreOrder, description, displayOrder, inStock
        });
    }
    res.json({ success: true, data: product });
});

// @desc    Delete Murti Product
// @route   DELETE /api/murtis/products/:id
// @access  Private/Admin
const deleteMurtiProduct = asyncHandler(async (req, res) => {
    const product = await MurtiProduct.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }
    await product.deleteOne();
    res.json({ success: true, message: 'Product removed' });
});

const uploadBase64ToCloudinary = async (base64String, folder) => {
    try {
        const result = await cloudinary.uploader.upload(base64String, {
            folder: `stone-art/murtis/${folder}`,
            resource_type: 'image'
        });
        return result.secure_url;
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        throw new Error('Image upload failed');
    }
};

module.exports = {
    getMurtiPageData,
    getMurtiHierarchy,
    getMurtiCategory,
    getMurtiProducts,
    getMurtiProduct,
    updateMurtiPage,
    upsertMurtiGroup,
    upsertMurtiCategory,
    upsertMurtiProduct,
    deleteMurtiProduct
};
