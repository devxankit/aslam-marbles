const StoneCategory = require('../models/StoneCategory');
const StoneProduct = require('../models/StoneProduct');
const asyncHandler = require('express-async-handler');
const cloudinary = require('cloudinary').v2;

// Cloudinary config (ensure env vars are set)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadBase64ToCloudinary = async (base64String, folder) => {
    try {
        if (!base64String || !base64String.startsWith('data:image')) return null;

        const result = await cloudinary.uploader.upload(base64String, {
            folder: `stone-art/products/${folder}`,
            resource_type: 'image'
        });
        return result.secure_url;
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        throw new Error('Image upload failed');
    }
};

// @desc    Get all stone categories
// @route   GET /api/stone-products/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
    // Ensure default stone categories exist
    const defaultIds = [
        'monument', 'agate',
        'packaging-slab', 'packaging-tiles', 'packaging-artifacts', 'packaging-other'
    ];
    const existingDefault = await StoneCategory.find({ id: { $in: defaultIds } });

    if (existingDefault.length < defaultIds.length) {
        const stoneDefaults = [
            { id: 'monument', name: 'Monument', title: 'MONUMENT', subtitle: 'Timeless Tributes in Stone', description: 'Honor and celebrate legacies with our expertly crafted stone monuments.', origin: 'India' },
            { id: 'agate', name: 'Agate', title: 'AGATE', subtitle: 'Exotic Elegance and Natural patterns', description: 'Discover the mesmerizing beauty of agate, featuring unique colors and patterns.', origin: 'India' }
        ];

        const packagingDefaults = [
            { id: 'packaging-slab', name: 'Slab Packaging', title: 'SLAB PACKAGING', origin: 'Internal' },
            { id: 'packaging-tiles', name: 'Tiles Packaging', title: 'TILES PACKAGING', origin: 'Internal' },
            { id: 'packaging-artifacts', name: 'Artifacts Packaging', title: 'ARTIFACTS PACKAGING', origin: 'Internal' },
            { id: 'packaging-other', name: 'Other Packaging', title: 'OTHER PACKAGING', origin: 'Internal' }
        ];

        const allDefaults = [...stoneDefaults, ...packagingDefaults];

        for (const def of allDefaults) {
            const exists = existingDefault.find(c => c.id === def.id);
            if (!exists) {
                await StoneCategory.create({
                    id: def.id,
                    name: def.name,
                    heroSection: {
                        image: { url: 'https://images.unsplash.com/photo-1596422846543-75c6fc183f24?q=80&w=2070&auto=format&fit=crop', alt: def.name },
                        title: def.title,
                        subtitle: def.subtitle || 'Premium Collection',
                        description: def.description || 'Finest quality stones for your needs.'
                    },
                    origin: def.origin,
                    stoneType: 'stones'
                });
            }
        }
    }

    const categories = await StoneCategory.find({}).sort({ name: 1 });
    res.json(categories);
});

// @desc    Get category details by ID (e.g. 'sandstone')
// @route   GET /api/stone-products/categories/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
    const category = await StoneCategory.findOne({ id: req.params.id });
    if (category) {
        res.json(category);
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
});

// @desc    Get products by category ID
// @route   GET /api/stone-products/category/:categoryId
// @access  Public
const getProductsByCategory = asyncHandler(async (req, res) => {
    const products = await StoneProduct.find({ categoryId: req.params.categoryId }).sort({ displayOrder: 1 });
    res.json(products);
});

// @desc    Update or create a category (Admin)
// @route   POST /api/stone-products/categories
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
    const { id, name, heroSection, meta, stoneType, origin } = req.body;

    let category = await StoneCategory.findOne({ id });

    // Handle Hero Image Upload
    if (heroSection?.image?.url && heroSection.image.url.startsWith('data:image')) {
        const uploadedUrl = await uploadBase64ToCloudinary(heroSection.image.url, 'headers');
        if (uploadedUrl) {
            heroSection.image.url = uploadedUrl;
        }
    }

    if (category) {
        category.name = name || category.name;
        category.heroSection = heroSection || category.heroSection;
        category.meta = meta || category.meta;
        category.stoneType = stoneType || category.stoneType;
        category.origin = origin || category.origin;

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } else {
        category = await StoneCategory.create({
            id,
            name,
            heroSection,
            meta,
            stoneType,
            origin
        });
        res.status(201).json(category);
    }
});

// @desc    Create a product
// @route   POST /api/stone-products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const productData = req.body;

    // Handle Product Image Upload
    if (productData.image?.url && productData.image.url.startsWith('data:image')) {
        const uploadedUrl = await uploadBase64ToCloudinary(productData.image.url, productData.categoryId || 'misc');
        if (uploadedUrl) {
            productData.image.url = uploadedUrl;
        }
    }

    const product = await StoneProduct.create(productData);
    res.status(201).json(product);
});

// @desc    Update a product
// @route   PUT /api/stone-products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const product = await StoneProduct.findById(req.params.id);

    if (product) {
        // Handle Image Upload
        if (req.body.image?.url && req.body.image.url.startsWith('data:image')) {
            const uploadedUrl = await uploadBase64ToCloudinary(req.body.image.url, product.categoryId || 'misc');
            if (uploadedUrl) {
                req.body.image.url = uploadedUrl;
            }
        }

        product.name = req.body.name || product.name;
        product.categoryId = req.body.categoryId || product.categoryId;
        product.image = req.body.image || product.image;

        product.specifications = req.body.specifications || product.specifications;
        product.description = req.body.description || product.description;
        product.displayOrder = req.body.displayOrder || product.displayOrder;
        product.inStock = req.body.inStock !== undefined ? req.body.inStock : product.inStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete a product
// @route   DELETE /api/stone-products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await StoneProduct.findById(req.params.id);

    if (product) {
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Get single product by ID
// @route   GET /api/stone-products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await StoneProduct.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

module.exports = {
    getCategories,
    getCategoryById,
    getProductsByCategory,
    updateCategory,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById
};
