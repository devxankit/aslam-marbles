const mongoose = require('mongoose');
const MurtiProduct = require('../models/MurtiProduct');
const MurtiCategory = require('../models/MurtiCategory');
const connectDB = require('../config/db');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { cloudinary } = require('../utils/cloudinary');

dotenv.config();

// Helper to upload image to Cloudinary
const uploadImageToCloudinary = async (imagePath, categoryName) => {
    try {
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

        const result = await cloudinary.uploader.upload(base64Image, {
            folder: `murti-products/${categoryName}`,
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

// Category folder name to categoryId mapping (matching seedMurtis.js)
const categoryMapping = {
    'ganesha': 'ganesha',
    'durga devi': 'durga',
    'hanuman': 'hanuman',
    'radha krishna': 'radha-krishna',
    'ram darbar': 'ram-darbar',
    'saibaba': 'sai-baba',
    'lakshmi': 'vishnu-laxmi',
    'sarswati devi': 'saraswati',
    'shiv parvati': 'shiv-parivar',
    'krishna': 'krishna-ji',
    'shiv': 'shiva',
    'jain murti': 'jain-gods',
    'nandi': 'nandi',
    'balaji': 'balaji',
    'yugal': 'jugal-jodi',
    'buddha': 'buddha',
    'natraja': 'natraja',
    'vishnu-ji': 'vishnu-ji',
    'laddu-gopal': 'laddu-gopal',
    'kali': 'kali',
    'radha': 'radha',
    'ganesh-laxmi': 'ganesh-laxmi',
    'ganesh-laxmi-saraswati': 'ganesh-laxmi-saraswati'
};

const seed = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Clear existing products
        await MurtiProduct.deleteMany({});
        console.log('🗑️  Cleared existing Murti products\n');

        const murtiAssetsPath = path.join(__dirname, '../../frontend/src/assets/ourcreation/murti');

        // Get all category folders
        const folders = fs.readdirSync(murtiAssetsPath).filter(item => {
            const itemPath = path.join(murtiAssetsPath, item);
            return fs.statSync(itemPath).isDirectory() && categoryMapping[item];
        });

        console.log(`📦 Found ${folders.length} categories to process\n`);

        let totalProducts = 0;
        let totalImages = 0;

        for (const folderName of folders) {
            const categoryId = categoryMapping[folderName];
            console.log(`\n${'='.repeat(60)}`);
            console.log(`📂 Processing: ${folderName} → ${categoryId}`);
            console.log('='.repeat(60));

            // Find category in database
            const category = await MurtiCategory.findOne({ id: categoryId });
            if (!category) {
                console.log(`⚠️  Category ${categoryId} not found in database, skipping...`);
                continue;
            }

            // Get all images in the folder
            const categoryPath = path.join(murtiAssetsPath, folderName);
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
                const uploaded = await uploadImageToCloudinary(imagePath, categoryId);
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

                const product = new MurtiProduct({
                    categoryId: category.id,
                    name: `${category.name} Statue ${i + 1}`,
                    sku: `MT-${categoryId.toUpperCase().replace(/-/g, '').substring(0, 4)}-${Date.now().toString().slice(-6)}-${i + 1}`,
                    price: 25000 + (i * 5000), // Varying prices
                    material: 'Marble',
                    size: '12 Inches',
                    images: productImages,
                    isPreOrder: false,
                    inStock: true,
                    description: `Beautiful ${category.name} statue crafted with precision and devotion.`,
                    displayOrder: i + 1
                });

                await product.save();
                console.log(`   ✓ Product ${i + 1}: ${product.name} (${productImages.length} images)`);
                totalProducts++;
            }

            console.log(`✅ Completed ${categoryId}: ${productsToCreate} products created`);
        }

        console.log('\n' + '='.repeat(60));
        console.log('🎉 SEEDING COMPLETED SUCCESSFULLY!');
        console.log('='.repeat(60));
        console.log(`📊 Summary:`);
        console.log(`   • Categories processed: ${folders.length}`);
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
