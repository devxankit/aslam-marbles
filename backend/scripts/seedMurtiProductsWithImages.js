const mongoose = require('mongoose');
const MurtiProduct = require('../models/MurtiProduct');
const MurtiCategory = require('../models/MurtiCategory');
const connectDB = require('../config/db');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const cloudinary = require('../utils/cloudinary');

dotenv.config();

// Helper to upload image to Cloudinary
const uploadImageToCloudinary = async (imagePath) => {
    try {
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

        const result = await cloudinary.uploader.upload(base64Image, {
            folder: 'murti-products',
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

// Product data mapping
const productDataFiles = {
    'ganesha': {
        file: 'ganeshaProducts.js',
        images: [
            '1_63841395-1556-4433-827c-521461904da0-770c1cc7-0c2f-4de7-8602-33640c7ae54f.png',
            '1764919631-efca90c8.jpg',
            '2_1d27178c-a68b-4c62-a77f-d73565004fb4-a1e2f886-fcc8-493b-b9d4-f1a28eaef80f.png',
            '2_2bd4173c-5e21-4b18-86a6-c8c8a9e8fdf2-7a3700c6-f4e6-4897-9867-2eef13bb2612.png',
            'IMG_0017-Enhanced-NR-2-8c3e4245-4c76-4a17-9b83-814d7ca141b5.png',
            'IMG_0022-Enhanced-NR-2-2-1c108dc8-79bf-4f0c-bd30-ba84293a2460.png',
            'IMG_0035-Enhanced-NR-2-3054512a-37cb-4fa3-b4b2-5a7759b3e9f2.png',
            'IMG_0065-Enhanced-NR-2_de361ada-cece-43cd-84c6-7fd063275109-49f31e13-6956-4617-9ea9-c408e6f13477.png',
            'IMG_0466-Enhanced-NR-2-f6709233-6e7e-4902-be12-0bd6380982ff.png'
        ],
        products: [
            {
                name: 'Ganesha 12" | Swiss White (Imported)',
                sku: 'MT-701',
                price: 45000,
                material: 'Swiss White (Imported)',
                size: '12 Inches',
                imageIndexes: [0, 1, 2],
                isPreOrder: false,
                description: 'Exquisitely crafted Ganesha statue in Swiss White marble, featuring intricate golden detailing and traditional design.'
            },
            {
                name: 'Ganesha 12" | Cultured Marble',
                sku: 'MT-702',
                price: 18000,
                material: 'Cultured Marble',
                size: '12 Inches',
                imageIndexes: [3, 4, 5],
                isPreOrder: true,
                description: 'Beautiful Ganesha statue crafted in cultured marble with traditional detailing and divine presence.'
            },
            {
                name: 'Ganesha 12" | Swiss White',
                sku: 'MT-703',
                price: 44000,
                material: 'Swiss White',
                size: '12 Inches',
                imageIndexes: [6, 7, 8],
                isPreOrder: false,
                description: 'Premium Ganesha statue in Swiss White marble with fine craftsmanship and elegant design.'
            },
            {
                name: 'Ganesha 12" | Swiss White',
                sku: 'MT-704',
                price: 43500,
                material: 'Swiss White',
                size: '12 Inches',
                imageIndexes: [0, 3, 6],
                isPreOrder: false,
                description: 'Elegant Ganesha statue with traditional motifs, crafted in Swiss White marble.'
            },
            {
                name: 'Ganesha 12" | Swiss White',
                sku: 'MT-705',
                price: 44500,
                material: 'Swiss White',
                size: '12 Inches',
                imageIndexes: [1, 4, 7],
                isPreOrder: true,
                description: 'Divine Ganesha statue featuring intricate carvings and premium Swiss White marble.'
            }
        ]
    }
};

const seed = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing products
        await MurtiProduct.deleteMany({});
        console.log('Cleared existing Murti products');

        // Process each category
        for (const [categoryId, data] of Object.entries(productDataFiles)) {
            console.log(`\n📦 Processing category: ${categoryId}`);

            // Find category in database
            const category = await MurtiCategory.findOne({ id: categoryId });
            if (!category) {
                console.log(`⚠️  Category ${categoryId} not found in database, skipping...`);
                continue;
            }

            // Upload images to Cloudinary
            const uploadedImages = [];
            const imagesPath = path.join(__dirname, '../../my-project/src/assets/ourcreation/murti', categoryId);

            console.log(`📤 Uploading ${data.images.length} images to Cloudinary...`);
            for (const imageName of data.images) {
                const imagePath = path.join(imagesPath, imageName);
                if (fs.existsSync(imagePath)) {
                    const uploaded = await uploadImageToCloudinary(imagePath);
                    if (uploaded) {
                        uploadedImages.push(uploaded);
                        console.log(`   ✓ Uploaded: ${imageName}`);
                    }
                } else {
                    console.log(`   ✗ File not found: ${imagePath}`);
                }
            }

            // Create products
            console.log(`💾 Creating ${data.products.length} products...`);
            for (const productData of data.products) {
                const productImages = productData.imageIndexes.map(idx => uploadedImages[idx]).filter(Boolean);

                const product = new MurtiProduct({
                    categoryId: category.id,
                    name: productData.name,
                    sku: productData.sku,
                    price: productData.price,
                    material: productData.material,
                    size: productData.size,
                    images: productImages,
                    isPreOrder: productData.isPreOrder,
                    inStock: true,
                    description: productData.description,
                    displayOrder: data.products.indexOf(productData) + 1
                });

                await product.save();
                console.log(`   ✓ Created: ${productData.name}`);
            }

            console.log(`✅ Completed ${categoryId}: ${data.products.length} products created`);
        }

        console.log('\n🎉 Seeding completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error during seeding:', err);
        process.exit(1);
    }
};

seed();
