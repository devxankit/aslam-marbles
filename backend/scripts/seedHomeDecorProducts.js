const mongoose = require('mongoose');
const HomeDecorProduct = require('../models/HomeDecorProduct');
const HomeDecorCategory = require('../models/HomeDecorCategory');
const connectDB = require('../config/db');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { cloudinary } = require('../utils/cloudinary');

dotenv.config({ path: path.join(__dirname, '../.env') });

// Helper to upload image to Cloudinary
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('\n❌ CRITICAL ERROR: Cloudinary credentials missing in .env file.');
    console.error('Please ensure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are set.\n');
    process.exit(1);
}

const uploadImageToCloudinary = async (imagePath, categoryName) => {
    try {
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

        const result = await cloudinary.uploader.upload(base64Image, {
            folder: `home-decor/products/${categoryName}`,
            resource_type: 'image'
        });

        return {
            url: result.secure_url,
            publicId: result.public_id,
            alt: path.basename(imagePath, path.extname(imagePath))
        };
    } catch (error) {
        console.error(`Error uploading ${imagePath}:`, error.message);
        return null;
    }
};

// Folder mapping
const folderMapping = {
    'dining-tables': 'center table',
    'center-tables': 'center table',
    'side-tables': 'center table',
    'marble-chair': 'center table',
    'pedestal-columns': 'pestal colums',
    'fire-places': 'fire places',
    'tulsi-gamla': 'pots&vases',
    'pots-vases': 'pots&vases',
    'indoor-sculptures': 'sculpture',
    'outdoor-sculptures': 'sculpture',
    'mortar-pestle': 'tablesware',
    'bowls': 'bowls',
    'tray': 'tablesware',
    'coasters': 'tablesware',
    'candle-holders': 'tablesware',
    'kitchen-accessories': 'tablesware',
    'bathroom-accessories': 'bathroom sets',
    'stone-sinks': 'bathroom sets',
    'bookends': 'office desk',
    'photo-frames': 'office desk',
    'chess-sets': 'games',
    'ludo': 'games',
    'tic-tac-toe': 'games',
    '3d-wall-murals': 'wall',
    'inlay-wall-art': 'wall'
};

const seed = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Clear existing products
        await HomeDecorProduct.deleteMany({});
        console.log('🗑️  Cleared existing Home Decor products\n');

        const homeDecorAssetsPath = path.join(__dirname, '../../my-project/src/assets/ourcreation/home decore');

        // Get all categories from database
        const categories = await HomeDecorCategory.find();
        console.log(`📦 Found ${categories.length} categories to process\n`);

        let totalProducts = 0;
        let totalImages = 0;

        for (const category of categories) {
            const folderName = folderMapping[category.id];
            if (!folderName) {
                console.log(`⚠️  No folder mapping for ${category.id}, skipping...`);
                continue;
            }

            console.log(`\n${'='.repeat(60)}`);
            console.log(`📂 Processing: ${category.name} (${category.id})`);
            console.log('='.repeat(60));

            // Get all images in the folder
            const categoryPath = path.join(homeDecorAssetsPath, folderName);
            if (!fs.existsSync(categoryPath)) {
                console.log(`⚠️  Folder not found: ${folderName}`);
                continue;
            }

            const imageFiles = fs.readdirSync(categoryPath).filter(file => {
                return ['.png', '.jpg', '.jpeg', '.webp'].includes(path.extname(file).toLowerCase());
            });

            if (imageFiles.length === 0) {
                console.log(`⚠️  No images found in ${folderName}`);
                continue;
            }

            console.log(`📸 Found ${imageFiles.length} images`);
            console.log(`📤 Uploading to Cloudinary...`);

            // Upload all images to Cloudinary
            const uploadedImages = [];
            for (let i = 0; i < imageFiles.length; i++) {
                const imagePath = path.join(categoryPath, imageFiles[i]);
                const uploaded = await uploadImageToCloudinary(imagePath, category.id);
                if (uploaded) {
                    uploadedImages.push(uploaded);
                    process.stdout.write(`\r   Progress: ${i + 1}/${imageFiles.length} images uploaded`);
                }
            }
            console.log('\n');

            totalImages += uploadedImages.length;

            // Create products - group images in sets of 3
            const productsToCreate = Math.ceil(uploadedImages.length / 3);
            console.log(`💾 Creating ${productsToCreate} products...`);

            for (let i = 0; i < productsToCreate; i++) {
                const productImages = uploadedImages.slice(i * 3, (i + 1) * 3);

                // Generate unique SKU
                const timestamp = Date.now().toString().slice(-6);
                const sku = `HD-${category.id.toUpperCase().replace(/-/g, '').substring(0, 4)}-${timestamp}-${i + 1}`;

                const product = new HomeDecorProduct({
                    categoryId: category.id,
                    name: `${category.name} ${i + 1}`,
                    sku: sku,
                    price: 15000 + (i * 3000), // Varying prices
                    material: 'Marble',
                    size: 'Standard',
                    images: productImages,
                    isPreOrder: false,
                    inStock: true,
                    description: `Beautiful ${category.name.toLowerCase()} crafted from premium marble.`,
                    displayOrder: i + 1
                });

                await product.save();
                console.log(`   ✓ Product ${i + 1}: ${product.name} (${productImages.length} images)`);
                totalProducts++;
            }

            console.log(`✅ Completed ${category.id}: ${productsToCreate} products created`);
        }

        console.log('\n' + '='.repeat(60));
        console.log('🎉 SEEDING COMPLETED SUCCESSFULLY!');
        console.log('='.repeat(60));
        console.log(`📊 Summary:`);
        console.log(`   • Categories processed: ${categories.length}`);
        console.log(`   • Total images uploaded: ${totalImages}`);
        console.log(`   • Total products created: ${totalProducts}`);
        console.log('='.repeat(60) + '\n');

        process.exit(0);
    } catch (err) {
        console.error('\n❌ Error during seeding:', err);
        process.exit(1);
    }
};

seed();
