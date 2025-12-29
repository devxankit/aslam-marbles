const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const SpecialProduct = require('../models/SpecialProduct');

async function checkData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const onSaleCount = await SpecialProduct.countDocuments({ collectionType: 'on-sale' });
        const limitedCount = await SpecialProduct.countDocuments({ collectionType: 'limited-edition' });

        console.log(`On Sale Count: ${onSaleCount}`);
        console.log(`Limited Edition Count: ${limitedCount}`);

        if (onSaleCount > 0) {
            const sample = await SpecialProduct.findOne({ collectionType: 'on-sale' });
            console.log('Sample On Sale:', JSON.stringify(sample, null, 2));
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkData();
