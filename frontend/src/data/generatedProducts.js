
import { furnitureData, homeDecorData } from './categoryImages'

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

// Helper to get products by category slug
export const getProductsByCategorySlug = (slug, type) => {
    // Normalizing slug to category key
    // e.g., "center-tables" -> "Center Tables"
    // We need a map or smart search
    const data = type === 'furniture' ? furnitureData : homeDecorData;
    const key = Object.keys(data).find(k => k.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase());

    if (!key) return [];

    return generateProducts(key, data[key], type, type === 'furniture' ? 25000 : 5000);
}

// Helper to get single product by ID
export const getProductById = (id) => {
    const all = [...allFurnitureProducts, ...allHomeDecorProducts];
    return all.find(p => p.id === id);
}
