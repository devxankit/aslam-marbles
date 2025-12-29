const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const { cloudinary } = require('../utils/cloudinary');
const SpecialProduct = require('../models/SpecialProduct');

// Configure environment
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const limitedEditionData = {
    'Limited Series': [
        'https://images.unsplash.com/photo-1544006659-f0b21f04cb1b?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1515898913320-f38370edab7a?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1505373396105-8f6a90800600?auto=format&fit=crop&q=80&w=1200'
    ]
};

const onSaleData = {
    'Exclusive Offers': [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=1200'
    ]
};

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const uploadToCloudinary = async (url, folder) => {
    // Check config
    const config = cloudinary.config();
    if (!config.cloud_name || !config.api_key || !config.api_secret) {
        console.warn('  ! Cloudinary credentials missing. Using original URL.');
        return {
            url: url,
            publicId: null
        };
    }

    try {
        const result = await cloudinary.uploader.upload(url, {
            folder: `special-collections/${folder}`
        });
        return {
            url: result.secure_url,
            publicId: result.public_id
        };
    } catch (error) {
        console.error(`Upload failed for ${url}:`, error.message);
        return {
            url: url, // Fallback to original URL
            publicId: null
        };
    }
};

const seed = async () => {
    await connectDB();

    console.log('Clearing existing Special Products...');
    await SpecialProduct.deleteMany({});

    // Seed Limited Edition
    console.log('Seeding Limited Edition...');
    const leCategoryName = 'Limited Series';
    const leImages = limitedEditionData[leCategoryName];
    let leOrder = 1;
    for (const imgUrl of leImages) {
        const upload = await uploadToCloudinary(imgUrl, 'limited-edition');
        await SpecialProduct.create({
            collectionType: 'limited-edition',
            categorySlug: 'limited-series',
            name: `${leCategoryName} Masterpiece ${leOrder}`,
            price: 50000 + (leOrder * 5000),
            description: `Exquisite, rare, and handcrafted limited edition masterpiece.`,
            sku: `LE-LS-${1000 + leOrder}`,
            images: [{ url: upload.url, publicId: upload.publicId, alt: 'Limited Edition' }],
            displayOrder: leOrder++
        });
    }

    // Seed On Sale
    console.log('Seeding On Sale...');
    const osCategoryName = 'Exclusive Offers';
    const osImages = onSaleData[osCategoryName];
    let osOrder = 1;
    for (const imgUrl of osImages) {
        const upload = await uploadToCloudinary(imgUrl, 'on-sale');
        await SpecialProduct.create({
            collectionType: 'on-sale',
            categorySlug: 'exclusive-offers',
            name: `${osCategoryName} Deal ${osOrder}`,
            price: 12000 + (osOrder * 1000),
            description: `Premium quality product at an exceptional value.`,
            sku: `SALE-EO-${1000 + osOrder}`,
            images: [{ url: upload.url, publicId: upload.publicId, alt: 'On Sale' }],
            displayOrder: osOrder++
        });
    }

    console.log('Seeding completed!');
    process.exit(0);
};

seed();
