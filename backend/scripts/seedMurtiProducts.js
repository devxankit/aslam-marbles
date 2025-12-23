const mongoose = require('mongoose');
const MurtiProduct = require('../models/MurtiProduct');
const connectDB = require('../config/db');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const DATA_DIR = path.join(__dirname, '../../my-project/src/data');

const extractProducts = (content) => {
    // Very simple regex to extract base data from the JS files
    // This is a bit hacky but works for this specific structure
    const products = [];
    const productRegex = /\{[\s\S]*?id:\s*'(.*?)'[\s\S]*?name:\s*'(.*?)'[\s\S]*?sku:\s*'(.*?)'[\s\S]*?price:\s*(\d+)[\s\S]*?material:\s*'(.*?)'[\s\S]*?size:\s*'(.*?)'[\s\S]*?description:\s*'(.*?)'/g;

    let match;
    while ((match = productRegex.exec(content)) !== null) {
        products.push({
            id: match[1],
            name: match[2],
            sku: match[3],
            price: parseInt(match[4]),
            material: match[5],
            size: match[6],
            description: match[7],
            images: [] // Images are tricky because of imports, we'll placeholder them
        });
    }
    return products;
};

const getCategoryIdFromFile = (filename) => {
    return filename.replace('Products.js', '').replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
};

const seed = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        await MurtiProduct.deleteMany({});

        const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('Products.js'));

        for (const file of files) {
            const categoryId = getCategoryIdFromFile(file);
            console.log(`Processing category: ${categoryId} from ${file}`);

            const content = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
            const products = extractProducts(content);

            if (products.length > 0) {
                const productsToInsert = products.map(p => ({
                    ...p,
                    categoryId,
                    images: [{ url: 'https://via.placeholder.com/600x800', alt: p.name }] // Placeholder for now
                }));
                await MurtiProduct.insertMany(productsToInsert);
                console.log(`   Seeded ${productsToInsert.length} products.`);
            }
        }

        console.log('Seeding products finished (with placeholders for images).');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seed();
