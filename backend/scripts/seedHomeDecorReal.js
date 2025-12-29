const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { cloudinary } = require('../utils/cloudinary');
const HomeDecorGroup = require('../models/HomeDecorGroup');
const HomeDecorCategory = require('../models/HomeDecorCategory');
const HomeDecorProduct = require('../models/HomeDecorProduct');

// Configure environment
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Configuration
const BASE_IMG_PATH = path.join(__dirname, '../../frontend/src/assets/ourcreation/home decore');

const MAPPINGS = [
    {
        group: 'Furniture',
        categories: [
            { name: 'Center Tables', folder: 'center table' },
            { name: 'Pedestal Columns', folder: 'pestal colums' },
            { name: 'Fire Places', folder: 'fire places' },
            // Reuse folder or skip if not found? 
            // For seeding, let's just seed what we have folders for.
            // The frontend duplicates images for Dining Tables etc.
            // We will create separate categories but maybe reuse images if logic allows, 
            // or just skip 'Dining Tables' if no folder exists, letting user add them later?
            // User said "fronted ko read kro", so I should try to replicate frontend structure.
            { name: 'Dining Tables', folder: 'center table', reuse: true },
            { name: 'Side Tables', folder: 'center table', reuse: true },
            { name: 'Marble Chair', folder: 'center table', reuse: true }
        ]
    },
    {
        group: 'Home Accents',
        categories: [
            { name: 'Lamps', folder: 'lamps' },
            { name: 'Pots & Vases', folder: 'pots&vases' },
            { name: 'Tableware', folder: 'tablesware' },
            { name: 'Bowls', folder: 'bowls' },
            { name: 'Bathroom Sets', folder: 'bathroom sets' },
            { name: 'Sculptures', folder: 'sculpture' },
            { name: 'Wall', folder: 'wall' },
            { name: 'Office & Desk', folder: 'office desk' },
            { name: 'Tulsi Gamla', folder: 'pots&vases', reuse: true },
            { name: 'Indoor Sculptures', folder: 'sculpture', reuse: true },
            { name: 'Outdoor Sculptures', folder: 'sculpture', reuse: true },
            { name: 'Mortar & Pestle', folder: 'tablesware', reuse: true },
            { name: 'Tray', folder: 'tablesware', reuse: true },
            { name: 'Coasters', folder: 'tablesware', reuse: true },
            { name: 'Candle Holders', folder: 'lamps', reuse: true },
            { name: 'Kitchen Accessories', folder: 'tablesware', reuse: true },
            { name: 'Bathroom Accessories', folder: 'bathroom sets', reuse: true },
            { name: 'Stone Sinks', folder: 'bathroom sets', reuse: true },
            { name: 'Bookends', folder: 'office desk', reuse: true },
            { name: 'Photo Frames', folder: 'office desk', reuse: true }
        ]
    }
];

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const uploadToCloudinary = async (filePath, folder) => {
    // Check if Cloudinary is configured via the imported instance
    const config = cloudinary.config();
    if (!config.cloud_name || !config.api_key || !config.api_secret) {
        console.warn('  ! Cloudinary credentials missing (checked config). specific images will be placeholders.');
        return {
            url: 'https://via.placeholder.com/600x400?text=Image+Upload+Required',
            publicId: null
        };
    }

    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: `home-decor-seed/${folder}`
        });
        return {
            url: result.secure_url,
            publicId: result.public_id
        };
    } catch (error) {
        console.error(`Upload failed for ${filePath}:`, error.message);
        return {
            url: 'https://via.placeholder.com/600x400?text=Upload+Failed',
            publicId: null
        };
    }
};

const seed = async () => {
    await connectDB();

    console.log('Clearing existing Home Decor data...');
    await HomeDecorGroup.deleteMany({});
    await HomeDecorCategory.deleteMany({});
    await HomeDecorProduct.deleteMany({});

    // Cache uploaded images to avoid re-uploading for reused categories
    // Map: folderPath -> [{ url, publicId, originalName }]
    const uploadedFolders = {};

    let groupOrder = 1;

    for (const groupConfig of MAPPINGS) {
        console.log(`Processing Group: ${groupConfig.group}`);
        const group = await HomeDecorGroup.create({
            name: groupConfig.group,
            displayOrder: groupOrder++
        });

        let catOrder = 1;
        for (const catConfig of groupConfig.categories) {
            console.log(`  > Category: ${catConfig.name} (Folder: ${catConfig.folder})`);

            const categoryId = catConfig.name.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, 'and');
            const category = new HomeDecorCategory({
                groupId: group._id,
                id: categoryId,
                name: catConfig.name,
                displayOrder: catOrder++,
                heroSection: {
                    title: catConfig.name,
                    subtitle: `Exclusive collection of ${catConfig.name}`,
                    image: {} // Will set later
                }
            });

            // Process Images
            const folderPath = path.join(BASE_IMG_PATH, catConfig.folder);

            if (!uploadedFolders[catConfig.folder]) {
                // Read and upload files
                if (fs.existsSync(folderPath)) {
                    const files = fs.readdirSync(folderPath).filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f));
                    const uploads = [];

                    console.log(`    Found ${files.length} images. Uploading...`);
                    for (const file of files) {
                        const filePath = path.join(folderPath, file);
                        const imageData = await uploadToCloudinary(filePath, catConfig.folder);
                        if (imageData) {
                            uploads.push({ ...imageData, originalName: file });
                        }
                    }
                    uploadedFolders[catConfig.folder] = uploads;
                } else {
                    console.warn(`    Folder not found: ${folderPath}`);
                    uploadedFolders[catConfig.folder] = [];
                }
            }

            const images = uploadedFolders[catConfig.folder];

            if (images.length > 0) {
                // Set Hero Image (use first one)
                category.heroSection.image = {
                    url: images[0].url,
                    publicId: images[0].publicId,
                    alt: catConfig.name
                };

                // Create Products
                // If 'reuse', we still create new product entries but linking to same images?
                // Or maybe we randomly pick subsets? 
                // Let's just create one product per image for now to populate the view.

                let prodOrder = 1;
                for (const img of images) {
                    await HomeDecorProduct.create({
                        categoryId: category.id,
                        name: `${catConfig.name} Item ${prodOrder}`,
                        price: 0, // Placeholder
                        sku: `${categoryId.toUpperCase().substring(0, 10)}-${1000 + prodOrder}`,
                        description: `Premium ${catConfig.name} item.`,
                        images: [{ url: img.url, publicId: img.publicId, alt: catConfig.name }],
                        displayOrder: prodOrder++
                    });
                }
            }

            await category.save();
        }
    }

    console.log('Seeding completed!');
    process.exit(0);
};

seed();
