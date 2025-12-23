const multer = require('multer')

// Configure multer for memory storage
const storage = multer.memoryStorage()

// File filter for images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed'), false)
  }
}

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
})

// Single image upload
const uploadSingle = upload.single('image')

// Multiple images upload (for gallery)
const uploadMultiple = upload.array('images', 10)

module.exports = {
  uploadSingle,
  uploadMultiple
}
