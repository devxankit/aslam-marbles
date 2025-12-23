const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const StoneCategory = require('../models/StoneCategory');
const StoneProduct = require('../models/StoneProduct');
const connectDB = require('../config/db');

dotenv.config();

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const ASSETS_DIR = path.join(__dirname, '../../my-project/src/assets/our products');

// Helper to check file existence before upload
const fileExists = (relativePath) => {
    const fullPath = path.join(ASSETS_DIR, relativePath);
    return fs.existsSync(fullPath);
};

// Helper to upload image
const uploadImage = async (relativePath, folderName) => {
    try {
        const fullPath = path.join(ASSETS_DIR, relativePath);
        if (!fs.existsSync(fullPath)) {
            console.warn(`File not found: ${fullPath} (skipping upload)`);
            return null;
        }

        const result = await cloudinary.uploader.upload(fullPath, {
            folder: `stone-art/products/${folderName}`,
            use_filename: true,
            unique_filename: false
        });
        return {
            url: result.secure_url,
            alt: path.basename(relativePath, path.extname(relativePath))
        };
    } catch (error) {
        console.error(`Error uploading ${relativePath}:`, error.message);
        return null;
    }
};

const categories = [
    {
        id: 'sandstone',
        name: 'Sandstone',
        heroImage: 'sandstone.jpg',
        title: 'SANDSTONE',
        subtitle: 'Timeless Elegance Carved in Earth',
        description: 'Experience the raw beauty and unparalleled durability of our premium Sandstone collection.',
        stoneType: 'sandstone',
        origin: 'Rajasthan',
        products: [
            { name: 'Agra Red Sandstone', image: 'sandstone/agra red sandstone.jpg' },
            { name: 'Autumn Brown Sandstone', image: 'sandstone/automn brown sandstone.jpg' },
            { name: 'Bansi Pink Sandstone', image: 'sandstone/bansipink sandstone.jpg' },
            { name: 'Camel Dust Sandstone', image: 'sandstone/camel dust sandstone.jpg' },
            { name: 'Chocolate Sandstone', image: 'sandstone/chocolate sandstone.jpg' },
            { name: 'Dholpur Beige Sandstone', image: 'sandstone/dholpur beige sandstone.jpg' },
            { name: 'Fossil Mint Sandstone', image: 'sandstone/fossil mint sandstone.jpg' },
            { name: 'Jaisalmer Yellow Sandstone', image: 'sandstone/jaisalmer yellow sandstone.jpg' },
            { name: 'Jodhpur Pink Sandstone', image: 'sandstone/jodhpur pink sandstone.jpg' },
            { name: 'Kandla Grey Sandstone', image: 'sandstone/kandla grey sandstone.jpg' },
            { name: 'Lalitpur Grey Sandstone', image: 'sandstone/lalitpur grey standstone.jpg' },
            { name: 'Lalitpur Yellow Sandstone', image: 'sandstone/lalitpur yellow sandstone.jpg' },
            { name: 'Mandana Red Sandstone', image: 'sandstone/mandana red sandstone.jpg' },
            { name: 'Modak Sandstone', image: 'sandstone/modak standstone.jpg' },
            { name: 'Pantersandstone', image: 'sandstone/pantersandstone.jpg' },
            { name: 'Pink Mint Sandstone', image: 'sandstone/pink mint sandstone.jpg' },
            { name: 'Rainbow Sandstone', image: 'sandstone/rainbow sandstone.jpg' },
            { name: 'Raj Green Natural Sandstone', image: 'sandstone/raj green natural sandstone.jpg' },
            { name: 'Raveena Sandstone', image: 'sandstone/raveena sandstone.jpg' },
            { name: 'Sagar Black Sandstone', image: 'sandstone/sagar black sandstone.jpg' },
            { name: 'Teakwood Sandstone', image: 'sandstone/teakwood sandstone.jpg' },
            { name: 'White Mint Sandstone', image: 'sandstone/white mint sandstone.jpg' },
            { name: 'Yellow Mint Sandstone', image: 'sandstone/yellow mint sandstone.jpg' }
        ]
    },
    {
        id: 'granite',
        name: 'Granite',
        heroImage: 'granite.jpg',
        title: 'GRANITE',
        subtitle: 'Unmatched Strength and Eternal Beauty',
        description: 'Discover our extensive collection of granite varieties.',
        stoneType: 'granite',
        origin: 'India/Global',
        products: [
            { name: 'Alaska Gold', image: 'granite/ALASKA GOLD.jpeg' },
            { name: 'Alaska Red', image: 'granite/ALASKA RED.jpeg' },
            { name: 'Alaska White', image: 'granite/ALASKA WHITE.png' },
            { name: 'Anglo', image: 'granite/Anglo.jpeg' },
            { name: 'Antico Cream', image: 'granite/ANTICO CREAM.jpg' },
            { name: 'Arawali Leather Brown', image: 'granite/Arawali Leather Brown.jpeg' },
            { name: 'Artic Pearl', image: 'granite/ARTIC PEARL.jpeg' },
            { name: 'Avalon White', image: 'granite/AVALON WHITE.jpg' },
            { name: 'Azul Celeste', image: 'granite/AZUL CELESTE.jpg' },
            { name: 'Bala Flower', image: 'granite/BALA FLOWER.jpeg' },
            { name: 'Baltic Brown', image: 'granite/baltic brown.jpeg' },
            // Truncated list for brevity in seeding, but capturing main ones
            // Assuming user wants ALL, so I'll try to include as many as plausible without timeout
            { name: 'Bangal Brown', image: 'granite/BANGAL BROWN.jpeg' },
            { name: 'Bangal Green', image: 'granite/BANGAL GREEN.jpg' },
            { name: 'Bianca Rosa', image: 'granite/BIANCA ROSA.jpeg' },
            { name: 'Biscotti White', image: 'granite/BISCOTTI WHITE.jpeg' },
            { name: 'Black Markino', image: 'granite/black-markino.jpeg' },
            { name: 'Blue Dunes', image: 'granite/BLUE DUNES.jpg' },
            { name: 'Blue Flower', image: 'granite/BLUE FLOWER.jpeg' },
            { name: 'Brazil Brown', image: 'granite/brazil brown.jpeg' },
            { name: 'Bruno Red', image: 'granite/Bruno Red.jpeg' },
            { name: 'C White', image: 'granite/C WHITE.jpeg' },
            { name: 'Cheema Blue', image: 'granite/Cheema Blue.jpeg' },
            { name: 'Cherry Brown', image: 'granite/Cherry Brown.jpeg' },
            { name: 'Chesnut Brown', image: 'granite/Chesnut Brown.jpeg' },
            { name: 'Chima Pink', image: 'granite/Chima Pink.png' },
            { name: 'China White', image: 'granite/China White.jpeg' },
            { name: 'Commando', image: 'granite/Commando.jpeg' },
            { name: 'Copper Silk', image: 'granite/Copper Silk.jpeg' },
            { name: 'Coral Black', image: 'granite/CORAL BLACK.jpeg' },
            { name: 'Crystal Brown', image: 'granite/CRYSTAL BROWN.jpeg' },
            { name: 'Crystal Blue', image: 'granite/Crystal Bue.jpeg' },
            { name: 'Crystal Yellow', image: 'granite/CRYSTAL YELLOW.jpeg' },
            { name: 'Delicatus White', image: 'granite/DELICATUS WHITE.jpg' },
            { name: 'Dessert Brown', image: 'granite/DESSERT BROWN.jpeg' },
            { name: 'Dessert Gold', image: 'granite/DESSERT GOLD.jpeg' },
            { name: 'Dessert Green', image: 'granite/DESSERT GREEN.jpeg' },
            { name: 'Dessert Pink', image: 'granite/Dessert Pink.jpeg' },
            { name: 'Espen White', image: 'granite/ESPEN WHITE.png' },
            { name: 'Fish Black', image: 'granite/fish-black.jpeg' },
            { name: 'Forrest Green', image: 'granite/FORREST GREEN.jpeg' },
            { name: 'Ganpati Marquino', image: 'granite/GANPATI MARQUINO.jpeg' },
            { name: 'Green Peal', image: 'granite/GREEN PEAL.jpeg' },
            { name: 'Jirawal White', image: 'granite/Jirawal White.jpeg' },
            { name: 'Korana', image: 'granite/KORANA.jpeg' },
            { name: 'Kotkasta', image: 'granite/KOTKASTA.jpg' },
            { name: 'Meral Black', image: 'granite/Meral-Black.jpeg' },
            { name: 'Metallica', image: 'granite/Metallica.jpeg' },
            { name: 'Monte Cristo', image: 'granite/MONTE CRISTO.jpeg' },
            { name: 'Nasoli', image: 'granite/Nasoli.jpeg' },
            { name: 'New Paradise Black', image: 'granite/New Paradise Black.jpeg' },
            { name: 'Nosra Gold', image: 'granite/NOSRA GOLD.jpeg' },
            { name: 'Nosra Green', image: 'granite/NOSRA GREEN.jpeg' },
            { name: 'Oyster White', image: 'granite/OYSTER WHITE.jpeg' },
            { name: 'P White', image: 'granite/P-White.jpeg' },
            { name: 'Penthar Yellow', image: 'granite/PENTHAR YELLOW.jpeg' },
            { name: 'Petrous Cream', image: 'granite/PETROUS CREAM.jpg' },
            { name: 'R Black', image: 'granite/R Black.jpeg' },
            { name: 'Raniwara', image: 'granite/RANIWARA.jpeg' },
            { name: 'Rosy Pink', image: 'granite/Rosy Pink.png' },
            { name: 'Royal Cream', image: 'granite/ROYAL CREAM.jpeg' },
            { name: 'Silky Red', image: 'granite/Silky Red.jpeg' },
            { name: 'Silver Star', image: 'granite/Silver Star.jpeg' },
            { name: 'Sira Grey', image: 'granite/SIRA GREY.jpeg' },
            { name: 'S White Big', image: 'granite/swhite-big-480x640.jpeg' },
            { name: 'T Brown', image: 'granite/T Brown.jpeg' },
            { name: 'Tiger', image: 'granite/Tiger.jpeg' },
            { name: 'Tropical Brown', image: 'granite/TROPICAL BROWN.jpeg' },
            { name: 'Venice Cream', image: 'granite/VENICE CREAM.jpg' },
            { name: 'Whisper White', image: 'granite/WHISPER WHITE.jpeg' },
            { name: 'Wine Red', image: 'granite/Wine Red.jpeg' }
        ]
    },
    {
        id: 'limestone',
        name: 'Limestone',
        heroImage: 'limestone/flowery-gold-marble.jpg',
        title: 'LIMESTONE',
        subtitle: 'Elegant Natural Stone for Timeless Beauty',
        description: 'Discover our stunning range of limestone varieties.',
        stoneType: 'limestone',
        origin: 'Unknown',
        products: [
            { name: 'Asian Gold Marble', image: 'limestone/asian-gold-marble.jpg' },
            { name: 'Flowery Gold Marble', image: 'limestone/flowery-gold-marble.jpg' },
            { name: 'Fossil Gold Limestone', image: 'limestone/fossil-gold-limestone.jpg' },
            { name: 'Galaxy Gold Limestone', image: 'limestone/galaxy-gold-limestone.jpg' },
            { name: 'Ita Gold Limestone', image: 'limestone/ita-gold-limestone.jpg' },
            { name: 'Jaisalmer Gold Limestone', image: 'limestone/jaisalmer-gold-limestone.jpg' },
            { name: 'Kota Blue Limestone', image: 'limestone/kota-blue-limestone.jpg' },
            { name: 'Kota Brown Limestone', image: 'limestone/kota-brown-limestone.jpg' },
            { name: 'Kota Honey Limestone', image: 'limestone/kota-honey-limestone.jpg' },
            { name: 'Pink Limestone', image: 'limestone/pink-limestone.jpg' }
        ]
    },
    {
        id: 'marble',
        name: 'Marble',
        heroImage: 'marble .jpg',
        title: 'MARBLE',
        subtitle: 'Luxury and Elegance in Every Slab',
        description: 'Explore our premium collection of marble varieties.',
        stoneType: 'marble',
        origin: 'Rajasthan',
        products: [
            { name: 'Black Gold Marble', image: 'marble/black-gold-marble.jpg' },
            { name: 'Bruno White Marble', image: 'marble/bruno-white-marble.jpg' },
            { name: 'Cappuccino Brown Marble', image: 'marble/cappuccino-brown-marble.jpg' },
            { name: 'Carbon Black Marble', image: 'marble/carbon-black-marble.jpg' },
            { name: 'Cherry Gold Marble', image: 'marble/cherry-gold-marble.jpg' },
            { name: 'Choco Brown Marble', image: 'marble/choco-brown-marble.jpg' },
            { name: 'Crocodile Green Marble', image: 'marble/crocodile-green-marble.jpg' },
            { name: 'Fantasy Black Marble', image: 'marble/fantasy-black-marble.jpg' },
            { name: 'Fantasy Brown Marble', image: 'marble/fantasy-brown-marble.jpg' },
            { name: 'Fantasy Grey Marble', image: 'marble/fantasy-grey-marble.jpg' },
            { name: 'Indian Toronto Marble', image: 'marble/indian-toronto-marblejpg.jpg' },
            { name: 'Indian White Marble', image: 'marble/indian-white-marble.jpg' },
            { name: 'Katni Beige Marble', image: 'marble/katni-beige-marble.jpg' },
            { name: 'Levanto Red Marble', image: 'marble/levanto-red-marble.jpg' },
            { name: 'Liner Black Marble', image: 'marble/liner-black-marble.jpg' },
            { name: 'Liner Grey Marble', image: 'marble/liner-grey-marble.jpg' },
            { name: 'Majestic Gold Marble', image: 'marble/majestic-gold-marble.jpg' },
            { name: 'Makrana White Marble', image: 'marble/makrana-white-marble.jpg' },
            { name: 'Marine Black Marble', image: 'marble/marine-black-marble.jpg' },
            { name: 'Molten Black Marble', image: 'marble/molten-black-marble.jpg' },
            { name: 'Oman Red Marble', image: 'marble/oman-red-marble.jpg' },
            { name: 'Onyx Green Marble', image: 'marble/onyx-green-marble.jpg' },
            { name: 'Onyx Pink Marble', image: 'marble/onyx-pink-marble-stone.jpg' },
            { name: 'Opel White Marble', image: 'marble/opel-white-marble.jpg' },
            { name: 'Panther Brown Marble', image: 'marble/panther-brown-marble.jpg' },
            { name: 'Panther Indian White Marble', image: 'marble/panther-indian-white-marble.jpg' },
            { name: 'Panther Yellow Indian Marble', image: 'marble/panther-yellow-indian-marble.jpg' },
            { name: 'Perlato Beige Marble', image: 'marble/perlato-beige-marble.jpg' },
            { name: 'Pista White Marble', image: 'marble/pista-white-marble.jpg' },
            { name: 'Purple White Marble', image: 'marble/purple-white-marble.jpg' },
            { name: 'Rainforest Brown Marble', image: 'marble/rainforest-brown-marble.jpg' },
            { name: 'Rainforest Gold Marble', image: 'marble/rainforest-gold-marble.jpg' },
            { name: 'Rainforest Green Marble', image: 'marble/rainforest-green-marble.jpg' },
            { name: 'Rajnagar White Marble', image: 'marble/rajnagar-white-marble.jpg' },
            { name: 'Rose Wood Marble', image: 'marble/rose-wood-marble.jpg' },
            { name: 'Silver Grey Marble', image: 'marble/silver-grey-marble.jpg' },
            { name: 'Smoke Grey Marble', image: 'marble/smoke-grey-marble.jpg' },
            { name: 'Spider Green Marble', image: 'marble/spider-green-marble.jpg' },
            { name: 'Teak Brown Marble', image: 'marble/teak-brown-marble.jpg' },
            { name: 'Udaipur Green Marble', image: 'marble/udaipur-green-marble.jpg' },
            { name: 'Udaipur Pink Marble', image: 'marble/udaipur-pink-marble.jpg' },
            { name: 'Wonder Beige Marble', image: 'marble/wonder-beige-marble.jpg' },
            { name: 'Wonder Pink Marble', image: 'marble/wonder-pink-marble.jpg' }
        ]
    },
    {
        id: 'slate',
        name: 'Slate',
        heroImage: 'slatejpg.jpg',
        title: 'SLATE',
        subtitle: 'Natural Elegance for Timeless Spaces',
        description: 'Discover our exquisite collection of slate stones.',
        stoneType: 'slate',
        origin: 'India',
        products: [
            { name: 'Autumn Rustic Slate', image: 'slate/autumn-rustic-slate.jpg' },
            { name: 'Black Rustic Slate', image: 'slate/black-rustic-slate.jpg' },
            { name: 'California Gold Slate', image: 'slate/california-gold-slate.jpg' },
            { name: 'Chocolate Limestone', image: 'slate/chocolate-limestone.jpg' },
            { name: 'Cobble Stones', image: 'slate/cobble stones.jpg' },
            { name: 'Copper Slate Natural', image: 'slate/copper-slate-natural.jpg' },
            { name: 'Dark Black Slate Stone', image: 'slate/dark-black-slate-stone.jpg' },
            { name: 'Dark Black Slate', image: 'slate/dark-black-slate.jpg' },
            { name: 'Deoli Green Slate', image: 'slate/deoli-green-slate.jpg' },
            { name: 'Golden Slate', image: 'slate/golden-slate-slate.jpg' },
            { name: 'Himachal Green Slate', image: 'slate/himachal-green-slate.jpg' },
            { name: 'Himachal White Slate', image: 'slate/himachal-white-slate.jpg' },
            { name: 'Indian Autumn Slate', image: 'slate/indian-autumn-slate.jpg' },
            { name: 'Jack Black Slate', image: 'slate/jack-black-slate.jpg' },
            { name: 'Jack Kund Multi Color', image: 'slate/jack-kund-multi-color.jpg' },
            { name: 'M Green Rustic Slate', image: 'slate/m-green-rustic-slate.jpg' },
            { name: 'M Green Slate', image: 'slate/m-green-slate.jpg' },
            { name: 'N Green Slate', image: 'slate/n-green-slate.jpg' },
            { name: 'Ocean Green Slate', image: 'slate/ocean-green-slate.jpg' },
            { name: 'Pink Color Slate', image: 'slate/pink-color-slate.jpg' },
            { name: 'Raja Red Slate Stone', image: 'slate/raja-red-slate-stone.jpg' },
            { name: 'Shimla White Slate', image: 'slate/shimla-white-slate.jpg' },
            { name: 'Silver Grey Slate', image: 'slate/silver-grey-slate.jpg' },
            { name: 'Silver Shine Grey Slate Stone', image: 'slate/silver-shine-grey-slate-stone.jpg' },
            { name: 'Silver Shine Slate', image: 'slate/silver-shine-slate.jpg' },
            { name: 'Terra Red Slate', image: 'slate/terra-red-slate.jpg' },
            { name: 'Veneer Slate Sheet', image: 'slate/veneer-slate-sheet.jpg' },
            { name: 'Vijaya Gold Slate', image: 'slate/vijaya-gold-slate.jpg' },
            { name: 'Yellow Multi Slate', image: 'slate/yellow-multi-slate.jpg' },
            { name: 'Yellow Rustic Slate', image: 'slate/yellow-rustic-slate.jpg' },
            { name: 'Z Grey Slate', image: 'slate/z-grey-slate.jpg' },
            { name: 'Zeera Green Slate', image: 'slate/zeera-green-slate.jpg' }
        ]
    },
    {
        id: 'quartzite',
        name: 'Quartzite',
        heroImage: 'quartzite.jpg',
        title: 'QUARTZITE',
        subtitle: 'Durable Beauty for Lasting Impressions',
        description: 'Discover our exceptional collection of quartzite stones.',
        stoneType: 'quartzite',
        origin: 'North India',
        products: [
            { name: 'Brown Quartzite', image: 'quartizte/brown-quartzite.jpg' },
            { name: 'Crazy Quartzite Stone', image: 'quartizte/crazy-quartzite stone.jpg' },
            { name: 'Grey Quartzite', image: 'quartizte/grey-quartzite.jpg' },
            { name: 'Ivory Quartzite', image: 'quartizte/ivory-quartzite.jpg' },
            { name: 'Red Quartzite', image: 'quartizte/red-quartzite.jpg' },
            { name: 'Star Black Quartzite', image: 'quartizte/star-black-quartzite.jpg' },
            { name: 'Veneer Quartzite Sheet', image: 'quartizte/veneer quartzite sheet.jpg' },
            { name: 'White Quartzite', image: 'quartizte/white-quartzite.jpg' },
            { name: 'Woodland Quartzite', image: 'quartizte/woodland-quartzite.jpg' }
        ]
    },
    {
        id: 'pebble-stones',
        name: 'Pebble Stones',
        heroImage: 'pebble stones.jpg',
        title: 'PEBBLE STONES',
        subtitle: 'Natural Accents for Refined Spaces',
        description: 'Discover the textural beauty of our pebble collection.',
        stoneType: 'pebble-stones',
        origin: 'International & Domestic',
        products: [
            { name: 'Antique Natural Pebbles', image: 'stone pebbles/antique-natural-pebbles.jpg' },
            { name: 'Aqua Onyx Polished Pebbles', image: 'stone pebbles/Aqua Onyx Polished Pebbles.jpg' },
            { name: 'Beige Sandstone Pebbles', image: 'stone pebbles/Beige Sandstone Pebbles.jpg' },
            { name: 'Beige River Pebbles', image: 'stone pebbles/beige-river-pebbles.jpg' },
            { name: 'Black Granite Pebbles', image: 'stone pebbles/Black Granite Pebbles.jpg' },
            { name: 'Black Onyx Polished Pebbles', image: 'stone pebbles/Black Onyx Polished Pebbles.jpg' },
            { name: 'Black Polished Pebbles', image: 'stone pebbles/Black Polished Pebbles.jpg' },
            { name: 'Black Basalt Pebbles', image: 'stone pebbles/black-basalt-pebbles.jpg' },
            { name: 'Black River Pebbles', image: 'stone pebbles/black-river-pebblesr.jpg' },
            { name: 'Blue Onyx Polished Pebbles', image: 'stone pebbles/Blue Onyx Polished Pebbles.jpg' },
            { name: 'Brown Polished Pebbles', image: 'stone pebbles/Brown Polished Pebbles.jpg' },
            { name: 'Brown River Pebbles', image: 'stone pebbles/brown-river-pebbles.jpg' },
            { name: 'Chocolate River Pebbles', image: 'stone pebbles/chocolate-river-pebbles.jpg' },
            { name: 'Classic Grey Pebbles', image: 'stone pebbles/Classic Grey Pebbles.jpg' },
            { name: 'Colored Marble Pebbles', image: 'stone pebbles/Colored Marble Pebbles.jpg' },
            { name: 'Forest Brown Pebbles', image: 'stone pebbles/Forest Brown Pebbles.jpg' },
            { name: 'Forest Green Pebbles', image: 'stone pebbles/Forest Green Pebbles.jpg' },
            { name: 'Green Marble Pebbles', image: 'stone pebbles/Green Marble Pebbles.jpg' },
            { name: 'Green Onyx Polished Pebbles', image: 'stone pebbles/Green Onyx Polished Pebbles.jpg' },
            { name: 'Green River Pebble', image: 'stone pebbles/green-river-pebblejpg.jpg' },
            { name: 'Grey Sandstone Pebbles', image: 'stone pebbles/Grey Sandstone Pebbles.jpg' },
            { name: 'Grey River Pebbles', image: 'stone pebbles/grey-river-pebbles.jpg' },
            { name: 'Lava Natural Stone', image: 'stone pebbles/lava-natueal-stone.jpg' },
            { name: 'Lemon Onyx Polished Pebbles', image: 'stone pebbles/Lemon Onyx Polished Pebbles.jpg' },
            { name: 'Mint Sandstone Pebbles', image: 'stone pebbles/Mint Sandstone Pebbles.jpg' },
            { name: 'Mix Onyx Polished Pebbles', image: 'stone pebbles/Mix Onyx Polished Pebbles.jpg' },
            { name: 'Mix Boulder River Pebbles', image: 'stone pebbles/mix-boulder-river-pebbles.jpg' },
            { name: 'Mixed River Pebbles', image: 'stone pebbles/mixed river-pebbles.jpg' },
            { name: 'Orange Onyx Polished Pebbles', image: 'stone pebbles/Orange Onyx Polished Pebbles.jpg' },
            { name: 'Pink Granite Pebbles', image: 'stone pebbles/Pink Granite Pebbles.jpg' },
            { name: 'Pink Onyx Polished Pebbles', image: 'stone pebbles/Pink Onyx Polished Pebbles.jpg' },
            { name: 'Purple Onyx Polished Pebbles', image: 'stone pebbles/Purple Onyx Polished Pebbles.jpg' },
            { name: 'Rainbow Sandstone Pebbles', image: 'stone pebbles/Rainbow Sandstone Pebbles.jpg' },
            { name: 'Red Onyx Polished Pebbles', image: 'stone pebbles/Red Onyx Polished Pebbles.jpg' },
            { name: 'Red Polished Pebbles', image: 'stone pebbles/Red Polished Pebbles.jpg' },
            { name: 'Red Sandstone Pebbles', image: 'stone pebbles/Red Sandstone Pebbles.jpg' },
            { name: 'River Polished Pebbles', image: 'stone pebbles/River Polished Pebbles.jpg' },
            { name: 'Silver Grey Pebbles', image: 'stone pebbles/Silver Grey Pebbles.jpg' },
            { name: 'Teak Sandstone Pebbles', image: 'stone pebbles/Teak Sandstone Pebbles.jpg' },
            { name: 'White Granite Pebbles', image: 'stone pebbles/White Granite Pebbles.jpg' },
            { name: 'White Marble Pebbles', image: 'stone pebbles/White Marble Pebbles.jpg' },
            { name: 'White Onyx Polished Pebbles', image: 'stone pebbles/White Onyx Polished Pebbles.jpg' },
            { name: 'White Polished Pebbles', image: 'stone pebbles/White Polished Pebbles.jpg' },
            { name: 'White Quartz Pebbles', image: 'stone pebbles/White Quartz Pebbles.jpg' },
            { name: 'White River Pebble', image: 'stone pebbles/white river pebble.jpg' },
            { name: 'Yellow Onyx Polished Pebbles', image: 'stone pebbles/Yellow Onyx Polished Pebbles.jpg' },
            { name: 'Yellow Sandstone Pebbles', image: 'stone pebbles/Yellow Sandstone Pebbles.jpg' },
            { name: 'Yellow River Pebbles', image: 'stone pebbles/yellow-river-pebbles.jpg' },
            { name: 'Zebra Black Pebbles', image: 'stone pebbles/Zebra Black Pebbles.jpg' }
        ]
    },
    {
        id: 'cobble-stones',
        name: 'Cobble Stones',
        heroImage: 'cobble stones.jpg',
        title: 'COBBLE STONES',
        subtitle: 'Heritage Craftsmanship for Modern Pathways',
        description: 'Our premium cobbles are hand-finished to provide a rustic yet elegant touch.',
        stoneType: 'cobble-stones',
        origin: 'North India',
        products: [
            { name: 'Autumn Brown Sandstone', image: 'stone cobbles/Autumn Brown Sandstone.jpg' },
            { name: 'Beige Sandstone Cobbles', image: 'stone cobbles/Beige Sandstone Cobbles.jpg' },
            { name: 'Black Granite Cobbles', image: 'stone cobbles/Black Granite Cobbles.jpg' },
            { name: 'Black Limestone Cobbles', image: 'stone cobbles/Black Limestone Cobbles.jpg' },
            { name: 'Black Sandstone Cobbles', image: 'stone cobbles/Black Sandstone Cobbles.jpg' },
            { name: 'Blue Limestone Cobbles', image: 'stone cobbles/Blue Limestone Cobbles.jpg' },
            { name: 'Camel Dust Sandstone', image: 'stone cobbles/Camel Dust Sandstone.jpg' },
            { name: 'Chocolate Sandstone Cobbles', image: 'stone cobbles/Chocolate Sandstone Cobbles.jpg' },
            { name: 'Grey Granite Cobbles', image: 'stone cobbles/Grey Granite Cobbles.jpg' },
            { name: 'Grey Sandstone Cobbles', image: 'stone cobbles/Grey Sandstone Cobbles.jpg' },
            { name: 'Jodhpur Brown Sandstone', image: 'stone cobbles/Jodhpur Brown Sandstone.jpg' },
            { name: 'Jodhpur Pink Sandstone', image: 'stone cobbles/Jodhpur Pink Sandstone.jpg' },
            { name: 'Mandana Red Sandstone', image: 'stone cobbles/Mandana Red Sandstone.jpg' },
            { name: 'Mint Sandstone Cobbles', image: 'stone cobbles/Mint Sandstone Cobbles.jpg' },
            { name: 'Modak Sandstone Cobbles', image: 'stone cobbles/Modak Sandstone Cobbles.jpg' },
            { name: 'Rainbow Sandstone Cobbles', image: 'stone cobbles/Rainbow Sandstone Cobbles.jpg' },
            { name: 'Raj Green Sandstone Cobbles', image: 'stone cobbles/Raj Green Sandstone Cobbles.jpg' },
            { name: 'Raveena Sandstone Cobbles', image: 'stone cobbles/raveena-sandstone-cobbles-.jpg' },
            { name: 'Red Granite Cobbles', image: 'stone cobbles/Red Granite Cobbles.jpg' },
            { name: 'Red Sandstone Cobbles', image: 'stone cobbles/Red Sandstone Cobbles.jpg' },
            { name: 'Teakwood Sandstone Cobbles', image: 'stone cobbles/Teakwood Sandstone Cobbles.jpg' },
            { name: 'White Granite Cobbles', image: 'stone cobbles/White Granite Cobbles.jpg' },
            { name: 'Yellow Limestone Cobbles', image: 'stone cobbles/Yellow Limestone Cobbles.jpg' },
            { name: 'Yellow Mint Sandstone', image: 'stone cobbles/Yellow Mint Sandstone.jpeg' },
            { name: 'Yellow Sandstone Cobbles', image: 'stone cobbles/Yellow Sandstone Cobbles.jpg' }
        ]
    },
    {
        id: 'stone-chips',
        name: 'Stone Chips',
        heroImage: 'soap stone .jpg',
        title: 'STONE CHIPS',
        subtitle: 'Versatile Textures for Landscape Design',
        description: 'Our premium selection of crushed stone chips.',
        stoneType: 'stone-chips',
        origin: 'Domestic',
        products: [
            { name: 'Black Stone Chips', image: 'stone chips/Black Stone Chips.jpg' },
            { name: 'Chocolate Stone Chips', image: 'stone chips/Chocolate Stone Chips.jpg' },
            { name: 'Green Stone Chips', image: 'stone chips/Green Stone Chips.jpg' },
            { name: 'Grey Stone Chips', image: 'stone chips/Grey Stone Chips.jpg' },
            { name: 'Lemon Stone Chips', image: 'stone chips/Lemon Stone Chips.jpg' },
            { name: 'Pink Stone Chips', image: 'stone chips/Pink Stone Chips.jpg' },
            { name: 'Red Stone Chips', image: 'stone chips/Red Stone Chips.jpg' },
            { name: 'White Stone Chips', image: 'stone chips/White Stone Chips.jpg' },
            { name: 'Yellow Stone Chips', image: 'stone chips/Yellow Stone Chips.jpg' }
        ]
    },
    {
        id: 'basalt-stones',
        name: 'Basalt',
        heroImage: 'basalt.jpg',
        title: 'BASALT STONES',
        subtitle: 'Volcanic Elegance for Modern Design',
        description: 'Known for its durability and rich dark tones.',
        stoneType: 'basalt-stones',
        origin: 'Domestic & International',
        products: [
            { name: 'Basalt Stone', image: 'basalt.jpg' },
            { name: 'Black Basalt Pebbles', image: 'stone pebbles/black-basalt-pebbles.jpg' }
        ]
    },
    {
        id: 'soap-stones',
        name: 'Soap Stone',
        heroImage: 'soap stone .jpg',
        title: 'SOAP STONE',
        subtitle: 'Smooth Texture, Timeless Appeal',
        description: 'Renowned for its soft feel and heat resistance.',
        stoneType: 'soap-stones',
        origin: 'Domestic',
        products: [
            { name: 'Soap Stone', image: 'soap stone .jpg' }
        ]
    },
    {
        id: 'travertine-stones',
        name: 'Travertine',
        heroImage: 'travertine.jpg',
        title: 'TRAVERTINE',
        subtitle: 'Classic Elegance from Rome to Your Home',
        description: 'Characterized by its pitted holes and troughs.',
        stoneType: 'travertine-stones',
        origin: 'International',
        products: [
            { name: 'Travertine Stone', image: 'travertine.jpg' }
        ]
    },
    {
        id: 'natural-indian-stones',
        name: 'Natural Indian Stone',
        heroImage: 'Natural Indian Stones/Natural Stone Carving.jpg',
        title: 'NATURAL INDIAN STONES',
        subtitle: 'The Soul of Indian Craftsmanship',
        description: 'Experience the versatile applications of authentic Indian stones.',
        stoneType: 'natural-indian-stones',
        origin: 'Pan India',
        products: [
            { name: 'Natural Stone Carving', image: 'Natural Indian Stones/Natural Stone Carving.jpg' },
            { name: 'Natural Stone Mosaic', image: 'Natural Indian Stones/Natural Stone Mosaic.jpg' },
            { name: 'Natural Stone Veneer', image: 'Natural Indian Stones/Natural Stone Veneer.jpg' },
            { name: 'Natural Monolith Stone', image: 'Natural Indian Stones/Natural Monolith Stone.jpg' },
            { name: 'Stone Roof Tile', image: 'Natural Indian Stones/Stone Roof Tile.jpg' },
            { name: 'Stone Pier Cap', image: 'Natural Indian Stones/Stone Pier Cap.jpg' },
            { name: 'Natural Stone Circle', image: 'Natural Indian Stones/Natural Stone Circle.jpg' },
            { name: 'Natural Crazy Stone', image: 'Natural Indian Stones/Natural Crazy Stone.jpg' },
            { name: 'Natural Stone Palisade', image: 'Natural Indian Stones/Natural Stone Palisade.jpg' },
            { name: 'Natural Stepping Stone', image: 'Natural Indian Stones/Natural Stepping Stone.jpg' },
            { name: 'Natural Stone Lintel', image: 'Natural Indian Stones/Natural Stone Lintel.jpg' },
            { name: 'Natural Stone Kerb', image: 'Natural Indian Stones/Natural Stone Kerb.jpg' },
            { name: 'Natural Stone Step', image: 'Natural Indian Stones/Natural Stone Step.jpg' },
            { name: 'Stone Wall Cladding', image: 'Natural Indian Stones/Stone Wall Cladding.jpg' },
            { name: 'Stone Wall Panel', image: 'Natural Indian Stones/Stone Wall Panel.jpg' },
            { name: 'Kandla Grey Sandstone Wall Panels', image: 'Natural Indian Stones/kandla-grey-sandstone-wall-panels.jpg' }
        ]
    },
    {
        id: 'modern-art',
        name: 'Modern Art',
        heroImage: '../ourcreation/Murti.jpeg',
        title: 'MODERN ART',
        subtitle: 'Contemporary Expressions in Stone',
        description: 'Explore our collection of modern abstract art and contemporary stone sculptures.',
        stoneType: 'modern-art',
        origin: 'International',
        products: []
    },
    {
        id: 'imported',
        name: 'Imported',
        heroImage: '../ourcreation/homedecor.jpeg',
        title: 'IMPORTED',
        subtitle: 'Exquisite Stones from Around the World',
        description: 'Discover our premium selection of imported stones.',
        stoneType: 'imported',
        origin: 'Global',
        products: []
    },
    {
        id: 'packaging',
        name: 'Packaging',
        heroImage: '../ourcreation/Pooja.jpeg',
        title: 'PACKAGING',
        subtitle: 'Secure & Premium Packaging Standards',
        description: 'We ensure that every masterpiece reaches you safely.',
        stoneType: 'packaging',
        origin: 'Internal',
        products: []
    }
];

const seedStoneProducts = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        for (const cat of categories) {
            console.log(`Processing Category: ${cat.name}`);

            // 1. Handle Hero Image
            let heroImgUrl = '';
            if (cat.heroImage) {
                let imagePath = cat.heroImage;
                if (imagePath.startsWith('../')) {
                    imagePath = path.join('..', imagePath);
                }
                const uploaded = await uploadImage(imagePath, 'headers');
                if (uploaded) heroImgUrl = uploaded.url;
            }

            // 2. Upsert Category
            const existingCat = await StoneCategory.findOne({ id: cat.id });

            const categoryUpdate = {
                id: cat.id,
                name: cat.name,
                heroSection: {
                    title: cat.title,
                    subtitle: cat.subtitle,
                    description: cat.description
                },
                stoneType: cat.stoneType,
                origin: cat.origin
            };

            // Only update image if we uploaded a new one or if one doesn't exist
            if (heroImgUrl) {
                categoryUpdate.heroSection.image = { url: heroImgUrl, alt: cat.name };
            } else if (!existingCat) {
                categoryUpdate.heroSection.image = { url: 'https://via.placeholder.com/1200x400', alt: cat.name };
            } else {
                categoryUpdate.heroSection.image = existingCat.heroSection.image; // Keep existing
            }

            const savedCategory = await StoneCategory.findOneAndUpdate(
                { id: cat.id },
                categoryUpdate,
                { upsert: true, new: true }
            );

            // 3. Process Products
            if (cat.products && cat.products.length > 0) {
                for (const prod of cat.products) {
                    const uploadedProd = await uploadImage(prod.image, cat.id);
                    if (uploadedProd) {
                        await StoneProduct.findOneAndUpdate(
                            { name: prod.name, categoryId: cat.id },
                            {
                                categoryId: cat.id,
                                name: prod.name,
                                image: { url: uploadedProd.url, alt: prod.name },
                                specifications: {
                                    origin: cat.origin,
                                    color: 'Standard'
                                },
                                description: `${prod.name} - ${cat.origin}`
                            },
                            { upsert: true }
                        );
                        console.log(`   - Synced Product: ${prod.name}`);
                    }
                }
            }
        }

        console.log('Seeding completed successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedStoneProducts();
