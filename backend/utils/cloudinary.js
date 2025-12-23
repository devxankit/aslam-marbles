const cloudinary = require('cloudinary').v2
const dotenv = require('dotenv')

dotenv.config()

const {
  CLOUDINARY_URL,
  Cloudinary_URL,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = process.env

if (CLOUDINARY_URL || Cloudinary_URL) {
  cloudinary.config({
    url: CLOUDINARY_URL || Cloudinary_URL
  })
} else {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
  })
}

const uploadBuffer = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image'
      },
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      }
    )
    stream.end(buffer)
  })
}

const uploadLocalFile = (filePath, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      {
        folder,
        resource_type: 'image'
      },
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      }
    )
  })
}

const deleteByPublicId = async (publicId) => {
  if (!publicId) return
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (err) {
    console.warn('[cloudinary] delete failed', err.message || err)
  }
}

module.exports = { cloudinary, uploadBuffer, uploadLocalFile, deleteByPublicId }

