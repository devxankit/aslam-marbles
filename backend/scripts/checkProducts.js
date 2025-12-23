const mongoose = require('mongoose');
const StoneProduct = require('../models/StoneProduct');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const checkProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        const products = await StoneProduct.find({ categoryId: 'sandstone' }).limit(5);
        console.log('Found ', products.length, ' sandstone products');
        products.forEach(p => {
            console.log('Product:', p.name);
            console.log('Image:', p.image);
            console.log('Images array:', p.images);
        });

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkProducts();
