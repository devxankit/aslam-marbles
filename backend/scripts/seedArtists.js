const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')
const { cloudinary } = require('../utils/cloudinary')
const Artist = require('../models/Artist')

dotenv.config()

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB connected successfully')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    process.exit(1)
  }
}

// Upload image to Cloudinary
const uploadImageToCloudinary = async (imagePath, folder) => {
  try {
    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️  Image not found: ${imagePath}`)
      return null
    }

    console.log(`📤 Uploading: ${path.basename(imagePath)}`)
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: folder,
      resource_type: 'image'
    })
    
    console.log(`✅ Uploaded: ${result.secure_url}`)
    return {
      url: result.secure_url,
      publicId: result.public_id
    }
  } catch (error) {
    console.error(`❌ Error uploading ${imagePath}:`, error.message)
    return null
  }
}

// Main seeding function
const seedArtists = async () => {
  try {
    await connectDB()

    console.log('🚀 Starting Artist data seeding...')

    // Define image paths (relative to project root)
    const imagePaths = {
      hero: 'my-project/src/assets/house of marble/our artist/Artisan.jpeg',
      gallery: [
        'my-project/src/assets/house of marble/our artist/slide1.jpeg',
        'my-project/src/assets/house of marble/our artist/slide2.jpeg',
        'my-project/src/assets/house of marble/our artist/slide3.jpeg',
        'my-project/src/assets/house of marble/our artist/slide4.webp'
      ],
      visitStore: 'my-project/src/assets/house of marble/our artist/visite store.png'
    }

    // Convert relative paths to absolute paths
    const projectRoot = path.resolve(__dirname, '../../')
    const absolutePaths = {
      hero: path.join(projectRoot, imagePaths.hero),
      gallery: imagePaths.gallery.map(p => path.join(projectRoot, p)),
      visitStore: path.join(projectRoot, imagePaths.visitStore)
    }

    console.log('📁 Project root:', projectRoot)
    console.log('🖼️  Hero image path:', absolutePaths.hero)

    // Upload hero image
    console.log('\n📤 Uploading hero image...')
    const heroImage = await uploadImageToCloudinary(absolutePaths.hero, 'artist/hero')
    
    if (!heroImage) {
      console.error('❌ Failed to upload hero image')
      return
    }

    // Upload gallery images
    console.log('\n📤 Uploading gallery images...')
    const galleryImages = []
    
    for (let i = 0; i < absolutePaths.gallery.length; i++) {
      const imagePath = absolutePaths.gallery[i]
      const uploadResult = await uploadImageToCloudinary(imagePath, 'artist/gallery')
      
      if (uploadResult) {
        galleryImages.push({
          url: uploadResult.url,
          publicId: uploadResult.publicId,
          alt: 'Artisan',
          order: i + 1
        })
      }
    }

    // Upload visit store image
    console.log('\n📤 Uploading visit store image...')
    const visitStoreImage = await uploadImageToCloudinary(absolutePaths.visitStore, 'artist/visit-store')
    
    if (!visitStoreImage) {
      console.error('❌ Failed to upload visit store image')
      return
    }

    // Create artist data
    const artistData = {
      heroImage: heroImage,
      title: 'Our Artist',
      description: 'The artisans at Aslam Marble Suppliers blend traditional stone-carving heritage with modern precision. Their expert hands and creative vision bring each design to life, ensuring every marble creation is unique, authentic, and beautifully crafted.',
      galleryImages: galleryImages,
      sections: [
        {
          content: 'At Aslam Marble Suppliers, our artisans are involved at every stage of the creative journey. Their deep technical knowledge, combined with artistic intuition, allows them to contribute thoughtfully to the design and development of each masterpiece. Their insights elevate the final product, ensuring every piece is unique, meaningful, and crafted to perfection.',
          order: 1
        },
        {
          content: 'Our artisans\' incredible commitment to precision, creativity, and excellence has made Aslam Marble Suppliers a trusted name in the world of marble craftsmanship. Their legacy is etched into every sculpture and structure we create, standing as a timeless testament to their skill, passion, and the rich tradition of stone artistry.',
          order: 2
        },
        {
          content: 'A single creation often takes months of patient work — every cut measured, every pattern refined, every detail perfected. Their process is not simply craftsmanship; it is devotion. This dedication reflects in the purity, symmetry, and elegance of each finished marble piece.',
          order: 3
        }
      ],
      visitStoreSection: {
        image: visitStoreImage,
        buttonText: 'Visit Store',
        buttonLink: '/visit-store'
      },
      isActive: true
    }

    // Clear existing data and insert new data
    console.log('\n🗑️  Clearing existing artist data...')
    await Artist.deleteMany({})

    console.log('💾 Inserting new artist data...')
    const newArtist = new Artist(artistData)
    await newArtist.save()

    console.log('✅ Artist data seeded successfully!')
    console.log(`📊 Created artist page with:`)
    console.log(`   - Hero image: ${heroImage.url}`)
    console.log(`   - Gallery images: ${galleryImages.length}`)
    console.log(`   - Content sections: ${artistData.sections.length}`)
    console.log(`   - Visit store image: ${visitStoreImage.url}`)

  } catch (error) {
    console.error('❌ Error seeding artist data:', error)
  } finally {
    await mongoose.connection.close()
    console.log('🔌 Database connection closed')
  }
}

// Run the seeding function
if (require.main === module) {
  seedArtists()
}

module.exports = seedArtists
