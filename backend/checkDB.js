const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const outputFile = path.join(__dirname, 'checkDB_output.txt');
fs.writeFileSync(outputFile, ''); // clear file

const models = [
    { name: 'MurtiPage', path: './models/MurtiPage' },
    { name: 'MurtiGroup', path: './models/MurtiGroup' },
    { name: 'MurtiCategory', path: './models/MurtiCategory' },
    { name: 'MurtiProduct', path: './models/MurtiProduct' },
    { name: 'HomeDecorPage', path: './models/HomeDecorPage' },
    { name: 'HomeDecorCategory', path: './models/HomeDecorCategory' },
    { name: 'HomeDecorProduct', path: './models/HomeDecorProduct' },
    { name: 'StoneProduct', path: './models/StoneProduct' },
    { name: 'TeamMember', path: './models/TeamMember' },
    { name: 'TrustedBy', path: './models/TrustedBy' },
    { name: 'HomePage', path: './models/HomePage' },
    { name: 'Blog', path: './models/Blog' }
];

const log = (msg) => {
    console.log(msg);
    fs.appendFileSync(outputFile, msg + '\n');
};

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        log('✅ MongoDB Connected');
        for (const m of models) {
            try {
                const Model = require(m.path);
                const count = await Model.countDocuments();
                log(`${m.name.padEnd(20)}: ${count} documents`);
            } catch (err) {
                log(`${m.name.padEnd(20)}: Error loading model or counting - ${err.message}`);
            }
        }
        process.exit();
    } catch (error) {
        log('❌ Error: ' + error);
        process.exit(1);
    }
};

checkDB();
