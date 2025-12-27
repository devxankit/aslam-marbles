
import { furnitureData, homeDecorData, limitedEditionData, onSaleData } from './categoryImages'

// Helper to generate products from image arrays
const generateProducts = (categoryName, images, type, basePrice = 15000) => {
    if (!images || images.length === 0) return []

    return images.map((img, index) => ({
        id: `${type}-${categoryName.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`,
        name: `${categoryName} Design ${index + 1}`,
        sku: `${type.toUpperCase().substring(0, 3)}-${categoryName.substring(0, 3).toUpperCase()}-${index + 1}00`,
        price: basePrice + (index * 2500),
        images: [img],
        description: `Premium hand-crafted ${categoryName} made from high-quality materials. Perfect for adding elegance to your space.`,
        material: 'Natural Stone / Premium Marble',
        size: 'Standard',
        isPreOrder: false,
        category: categoryName,
        type: type // 'furniture' or 'decor'
    }))
}

// Generate all Furniture Products
export const allFurnitureProducts = Object.entries(furnitureData).reduce((acc, [category, images]) => {
    return [...acc, ...generateProducts(category, images, 'furniture', 25000)]
}, [])

// Generate all Home Decor Products
export const allHomeDecorProducts = Object.entries(homeDecorData).reduce((acc, [category, images]) => {
    return [...acc, ...generateProducts(category, images, 'decor', 5000)]
}, [])

// Generate all Limited Edition Products
export const allLimitedEditionProducts = Object.entries(limitedEditionData).reduce((acc, [category, images]) => {
    return [...acc, ...generateProducts(category, images, 'limited', 50000)]
}, [])

// Generate all On Sale Products
export const allOnSaleProducts = Object.entries(onSaleData).reduce((acc, [category, images]) => {
    return [...acc, ...generateProducts(category, images, 'sale', 12000)]
}, [])

// Helper to get products by category slug
export const getProductsByCategorySlug = (slug, type) => {
    let data;
    let basePrice = 5000;

    if (type === 'furniture') {
        data = furnitureData;
        basePrice = 25000;
    } else if (type === 'limited') {
        data = limitedEditionData;
        basePrice = 50000;
    } else if (type === 'sale') {
        data = onSaleData;
        basePrice = 12000;
    } else {
        data = homeDecorData;
    }

    const key = Object.keys(data).find(k => k.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase());

    if (!key) return [];

    return generateProducts(key, data[key], type, basePrice);
}

// Helper to get single product by ID
export const getProductById = (id) => {
    const all = [...allFurnitureProducts, ...allHomeDecorProducts, ...allLimitedEditionProducts, ...allOnSaleProducts];
    return all.find(p => p.id === id);
}
