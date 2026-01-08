const MurtiProduct = require('../models/MurtiProduct');
const StoneProduct = require('../models/StoneProduct');
const HomeDecorProduct = require('../models/HomeDecorProduct');
const ShopByProduct = require('../models/ShopByProduct');
const LiveInventory = require('../models/LiveInventory');
const SpecialProduct = require('../models/SpecialProduct');

exports.globalSearch = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.trim() === '') {
            return res.status(200).json({
                success: true,
                results: []
            });
        }

        const searchQuery = {
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } },
                { category: { $regex: q, $options: 'i' } }
            ]
        };

        // Parallel search across collections
        const [
            murtis,
            stones,
            homeDecors,
            shopByItems,
            inventoryItems,
            specialItems
        ] = await Promise.all([
            MurtiProduct.find(searchQuery).limit(10).lean(),
            StoneProduct.find(searchQuery).limit(10).lean(),
            HomeDecorProduct.find(searchQuery).limit(10).lean(),
            ShopByProduct.find(searchQuery).limit(10).lean(),
            LiveInventory.find({ ...searchQuery, status: 'available' }).limit(10).lean(),
            SpecialProduct.find(searchQuery).limit(10).lean()
        ]);

        // Format results with types for the frontend
        const results = [
            ...murtis.map(item => ({ ...item, type: 'murti', path: `/murti/${item.category}/${item._id}` })),
            ...stones.map(item => ({ ...item, type: 'stone', path: `/products/${item.category?.toLowerCase()}/${item._id}` })),
            ...homeDecors.map(item => ({ ...item, type: 'homedecor', path: `/home-decor/${item.category}/${item._id}` })),
            ...shopByItems.map(item => ({ ...item, type: 'shopby', path: `/shop-by/${item.section}/${item.category}/${item._id}` })),
            ...inventoryItems.map(item => ({ ...item, type: 'inventory', path: `/services/live-inventory` })),
            ...specialItems.map(item => ({ ...item, type: 'special', path: `/${item.type === 'on-sale' ? 'on-sale' : 'limited-edition'}/${item.category}/${item._id}` }))
        ];

        res.status(200).json({
            success: true,
            count: results.length,
            results
        });

    } catch (error) {
        console.error('Global Search Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error performing search',
            error: error.message
        });
    }
};
