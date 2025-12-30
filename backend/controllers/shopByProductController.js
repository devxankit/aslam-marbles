const ShopByProduct = require('../models/ShopByProduct');
const { cloudinary, deleteByPublicId } = require('../utils/cloudinary');

// Get all products for a specific category within a section
exports.getProductsByCategory = async (req, res) => {
    try {
        const { section, category } = req.params;
        const products = await ShopByProduct.find({
            section,
            categorySlug: category,
            isLive: true
        }).sort({ displayOrder: 1, createdAt: -1 });

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all products (for admin) optionally filtered
exports.getAllProducts = async (req, res) => {
    try {
        const { section, category } = req.query;
        let query = {};
        if (section) query.section = section;
        if (category) query.categorySlug = category;

        const products = await ShopByProduct.find(query).sort({ updatedAt: -1 });
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create or Update Product
exports.upsertProduct = async (req, res) => {
    try {
        const { id, section, categorySlug, name, price, description, displayOrder, specifications } = req.body;

        let existingImages = req.body.images;

        // Robust parsing of existing images
        if (!existingImages) {
            existingImages = [];
        } else if (typeof existingImages === 'string') {
            try {
                existingImages = JSON.parse(existingImages);
            } catch (e) {
                existingImages = [];
            }
        } else if (Array.isArray(existingImages)) {
            existingImages = existingImages.map(img => {
                if (typeof img === 'string') {
                    try { return JSON.parse(img); } catch (e) { return null; }
                }
                return img;
            }).filter(Boolean);
        }

        if (!Array.isArray(existingImages)) existingImages = [];

        // Upload new images
        let newImages = [];
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file =>
                cloudinary.uploader.upload(file.path, {
                    folder: `shop-by/${section}/${categorySlug}`
                })
            );
            const uploadedResults = await Promise.all(uploadPromises);
            newImages = uploadedResults.map(result => ({
                url: result.secure_url,
                publicId: result.public_id,
                alt: name
            }));
        }

        const finalImages = [...existingImages, ...newImages];

        let product;
        if (id) {
            product = await ShopByProduct.findById(id);
            if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

            // Delete removed images
            const currentPublicIds = product.images.map(img => img.publicId).filter(pid => pid);
            const keptPublicIds = existingImages.map(img => img.publicId).filter(pid => pid);
            const toDelete = currentPublicIds.filter(pid => !keptPublicIds.includes(pid));

            for (const pid of toDelete) await deleteByPublicId(pid);

            product.name = name;
            product.price = price;
            product.description = description;
            product.displayOrder = displayOrder;
            product.images = finalImages;
            product.specifications = typeof specifications === 'string' ? JSON.parse(specifications) : specifications;
            product.section = section;
            product.categorySlug = categorySlug;

            await product.save();
        } else {
            product = await ShopByProduct.create({
                section,
                categorySlug,
                name,
                price,
                description,
                images: finalImages,
                displayOrder,
                specifications: typeof specifications === 'string' ? JSON.parse(specifications) : specifications
            });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error('Upsert Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await ShopByProduct.findById(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

        // Delete images
        if (product.images && product.images.length > 0) {
            for (const img of product.images) {
                if (img.publicId) await deleteByPublicId(img.publicId);
            }
        }

        await product.deleteOne();
        res.status(200).json({ success: true, message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await ShopByProduct.findById(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
