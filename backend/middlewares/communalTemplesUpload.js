const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/') || file.mimetype === 'image/gif') {
            cb(null, true);
        } else {
            cb(new Error('Not an image! Please upload only images.'), false);
        }
    }
});

const communalTemplesUpload = upload.fields([
    { name: 'heroImage', maxCount: 1 },
    { name: 'whyChooseUsIcon', maxCount: 1 },
    { name: 'serviceIcon', maxCount: 1 },
    { name: 'stepIcon', maxCount: 1 },
    { name: 'stepGif', maxCount: 1 }
]);

module.exports = communalTemplesUpload;
