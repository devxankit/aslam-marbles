const SpecialProduct = require('../models/SpecialProduct');
const { deleteByPublicId } = require('../utils/cloudinary');
const { cloudinary } = require('../utils/cloudinary');

// @desc    Get all products by collection type
// @route   GET /api/special-products/:type
// @access  Public
exports.getProductsByType = async (req, res) => {
    try {
        const { type } = req.params;
        const { category } = req.query;

        let query = { collectionType: type };
        if (category) {
            query.categorySlug = category;
        }

        const products = await SpecialProduct.find(query).sort({ displayOrder: 1, createdAt: -1 });
        res.json({ success: true, data: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get single product header
// @route   GET /api/special-products/:type/:id
// @access  Public
exports.getProductById = async (req, res) => {
    try {
        const product = await SpecialProduct.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

// @desc    Create/Update a product
// @route   POST /api/special-products
// @access  Private/Admin
exports.upsertProduct = async (req, res) => {
    try {
        const { id, collectionType, categorySlug, name, price, description, displayOrder, sku, specifications } = req.body;
        let existingImages = req.body.images;

        // Robust parsing of existing images
        if (!existingImages) {
            existingImages = [];
        } else if (typeof existingImages === 'string') {
            try {
                existingImages = JSON.parse(existingImages);
            } catch (e) {
                console.error('JSON Parse error for images:', e);
                existingImages = [];
            }
        } else if (Array.isArray(existingImages)) {
            // In case middleware split it or something
            existingImages = existingImages.map(img => {
                if (typeof img === 'string') {
                    try { return JSON.parse(img); } catch (e) { return null; }
                }
                return img;
            }).filter(Boolean);
        }

        if (!Array.isArray(existingImages)) existingImages = [];

        // Handle Image Uploads if files are present
        let newImages = [];
        if (req.files && req.files.length > 0) {
            // Upload new images
            const uploadPromises = req.files.map(file =>
                cloudinary.uploader.upload(file.path, {
                    folder: `special-collections/${collectionType}`
                })
            );

            const uploadedResults = await Promise.all(uploadPromises);

            newImages = uploadedResults.map(result => ({
                url: result.secure_url,
                publicId: result.public_id,
                alt: name
            }));
        }

        // Combine existing and new
        let finalImages = [...existingImages, ...newImages];

        let product;

        if (id) {
            // Update
            product = await SpecialProduct.findById(id);
            if (!product) {
                return res.status(404).json({ success: false, message: 'Product not found' });
            }

            // Check for removed images to delete from Cloudinary
            const currentPublicIds = product.images.map(img => img.publicId).filter(pid => pid);
            const keptPublicIds = existingImages.map(img => img.publicId).filter(pid => pid); // Only check against existing, not new
            const toDelete = currentPublicIds.filter(pid => !keptPublicIds.includes(pid));

            for (const pid of toDelete) {
                await deleteByPublicId(pid);
            }

            product.name = name;
            product.price = price;
            product.description = description;
            product.displayOrder = displayOrder;
            product.sku = sku;
            product.images = finalImages;
            product.specifications = typeof specifications === 'string' ? JSON.parse(specifications) : specifications;

            await product.save();
        } else {
            // Create
            product = await SpecialProduct.create({
                collectionType,
                categorySlug: categorySlug || 'general',
                name,
                price,
                description,
                images: finalImages,
                displayOrder,
                sku,
                specifications: typeof specifications === 'string' ? JSON.parse(specifications) : specifications
            });
        }

        res.json({ success: true, data: product });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/special-products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
    try {
        const product = await SpecialProduct.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Delete images from Cloudinary
        if (product.images && product.images.length > 0) {
            for (const img of product.images) {
                if (img.publicId) {
                    await deleteByPublicId(img.publicId);
                }
            }
        }

        await product.deleteOne(); // or remove() depending on Mongoose version
        res.json({ success: true, message: 'Product deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
