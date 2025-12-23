/**
 * Optimized Database Query Utilities
 */

/**
 * Get products with optimized query
 * @param {Model} Model - Mongoose model
 * @param {string} categoryId - Category ID
 * @param {object} options - Query options
 */
const getOptimizedProducts = async (Model, categoryId, options = {}) => {
    const {
        page = 1,
        limit = 50,
        fields = 'name price images.url sku material size',
        sort = 'displayOrder'
    } = options;

    const skip = (page - 1) * limit;

    const products = await Model
        .find({ categoryId, inStock: true })
        .select(fields) // Only select needed fields
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(); // Return plain JS objects (faster)

    const total = await Model.countDocuments({ categoryId, inStock: true });

    return {
        products,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
        }
    };
};

/**
 * Get single product with minimal data
 */
const getProductById = async (Model, id) => {
    return await Model
        .findById(id)
        .select('name price images material size description sku isPreOrder inStock')
        .lean();
};

/**
 * Batch get products by IDs
 */
const getProductsByIds = async (Model, ids) => {
    return await Model
        .find({ _id: { $in: ids } })
        .select('name price images.url sku')
        .lean();
};

module.exports = {
    getOptimizedProducts,
    getProductById,
    getProductsByIds
};
