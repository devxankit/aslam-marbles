const HomeDecorPage = require('../models/HomeDecorPage');
const HomeDecorGroup = require('../models/HomeDecorGroup');
const HomeDecorCategory = require('../models/HomeDecorCategory');
const HomeDecorProduct = require('../models/HomeDecorProduct');
const { cloudinary } = require('../utils/cloudinary');

// @desc    Get main Home Decor page data
// @route   GET /api/home-decor/page
// @access  Public
const getHomeDecorPage = async (req, res) => {
    try {
        const page = await HomeDecorPage.findOne({ isActive: true });
        res.json({ success: true, data: page });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update Home Decor page
// @route   POST /api/home-decor/page
// @access  Private/Admin
const updateHomeDecorPage = async (req, res) => {
    try {
        let page = await HomeDecorPage.findOne();

        if (!page) {
            page = new HomeDecorPage(req.body);
        } else {
            Object.assign(page, req.body);
        }

        // Handle image upload if base64 provided
        if (req.body.heroSection?.image?.url?.startsWith('data:image')) {
            const result = await cloudinary.uploader.upload(req.body.heroSection.image.url, {
                folder: 'home-decor/page-headers'
            });
            page.heroSection.image = {
                url: result.secure_url,
                publicId: result.public_id,
                alt: req.body.heroSection.image.alt || 'Home Decor'
            };
        }

        await page.save();
        res.json({ success: true, data: page });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get hierarchy (groups + categories)
// @route   GET /api/home-decor/hierarchy
// @access  Public
const getHierarchy = async (req, res) => {
    try {
        const groups = await HomeDecorGroup.find().sort({ displayOrder: 1 });
        const categories = await HomeDecorCategory.find().sort({ displayOrder: 1 });

        const hierarchy = groups.map(group => ({
            _id: group._id,
            name: group.name,
            displayOrder: group.displayOrder,
            categories: categories.filter(cat => cat.groupId.toString() === group._id.toString())
        }));

        res.json({ success: true, data: hierarchy });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Upsert group
// @route   POST /api/home-decor/groups
// @access  Private/Admin
const upsertGroup = async (req, res) => {
    try {
        const { _id, name, displayOrder } = req.body;

        let group;
        if (_id) {
            group = await HomeDecorGroup.findByIdAndUpdate(_id, { name, displayOrder }, { new: true });
        } else {
            group = await HomeDecorGroup.create({ name, displayOrder });
        }

        res.json({ success: true, data: group });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Upsert category
// @route   POST /api/home-decor/categories
// @access  Private/Admin
const upsertCategory = async (req, res) => {
    try {
        const { _id, groupId, id, name, displayOrder, heroSection } = req.body;

        let category;
        if (_id) {
            category = await HomeDecorCategory.findById(_id);
            Object.assign(category, { groupId, id, name, displayOrder, heroSection });
        } else {
            category = new HomeDecorCategory({ groupId, id, name, displayOrder, heroSection });
        }

        // Handle hero image upload
        if (heroSection?.image?.url?.startsWith('data:image')) {
            const result = await cloudinary.uploader.upload(heroSection.image.url, {
                folder: `home-decor/categories/${id}`
            });
            category.heroSection.image = {
                url: result.secure_url,
                publicId: result.public_id,
                alt: heroSection.image.alt || name
            };
        }

        await category.save();
        res.json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get category by ID
// @route   GET /api/home-decor/category/:id
// @access  Public
const getCategoryById = async (req, res) => {
    try {
        const category = await HomeDecorCategory.findOne({ id: req.params.id });
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get products by category
// @route   GET /api/home-decor/products/:categoryId
// @access  Public
const getProductsByCategory = async (req, res) => {
    try {
        const products = await HomeDecorProduct.find({ categoryId: req.params.categoryId })
            .sort({ displayOrder: 1 });
        res.json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single product
// @route   GET /api/home-decor/product/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await HomeDecorProduct.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Upsert product
// @route   POST /api/home-decor/products
// @access  Private/Admin
const upsertProduct = async (req, res) => {
    try {
        const { _id, categoryId, name, sku, price, material, size, dimensions, description, isPreOrder, inStock, displayOrder, images } = req.body;

        let product;
        if (_id) {
            product = await HomeDecorProduct.findById(_id);
            Object.assign(product, { categoryId, name, sku, price, material, size, dimensions, description, isPreOrder, inStock, displayOrder });
        } else {
            product = new HomeDecorProduct({ categoryId, name, sku, price, material, size, dimensions, description, isPreOrder, inStock, displayOrder });
        }

        // Handle image uploads
        if (images && Array.isArray(images)) {
            const uploadedImages = [];
            for (const img of images) {
                if (typeof img === 'string' && img.startsWith('data:image')) {
                    const result = await cloudinary.uploader.upload(img, {
                        folder: `home-decor/products/${categoryId}`
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
            product.images = uploadedImages;
        }

        await product.save();
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete product
// @route   DELETE /api/home-decor/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await HomeDecorProduct.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Delete images from Cloudinary
        for (const img of product.images) {
            if (img.publicId) {
                await cloudinary.uploader.destroy(img.publicId);
            }
        }

        await product.deleteOne();
        res.json({ success: true, message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getHomeDecorPage,
    updateHomeDecorPage,
    getHierarchy,
    upsertGroup,
    upsertCategory,
    getCategoryById,
    getProductsByCategory,
    getProductById,
    upsertProduct,
    deleteProduct
};
