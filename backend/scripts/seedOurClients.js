const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')
const { cloudinary } = require('../utils/cloudinary')
const OurClients = require('../models/OurClients')

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
const seedOurClients = async () => {
  try {
    await connectDB()

    console.log('🚀 Starting Our Clients data seeding...')

    // Define image paths (relative to project root)
    const imagePaths = {
      heading: [
        'my-project/src/assets/house of marble/our client/heading/Residential.jpeg',
        'my-project/src/assets/house of marble/our client/heading/06fcbe87-a149-445b-912c-6787ef4a4d50.png'
      ]
    }

    // Convert relative paths to absolute paths
    const projectRoot = path.resolve(__dirname, '../../')
    const absolutePaths = {
      heading: imagePaths.heading.map(p => path.join(projectRoot, p))
    }

    console.log('📁 Project root:', projectRoot)

    // Upload heading images
    console.log('\n📤 Uploading heading images...')
    const headingImages = []
    
    for (let i = 0; i < absolutePaths.heading.length; i++) {
      const imagePath = absolutePaths.heading[i]
      const uploadResult = await uploadImageToCloudinary(imagePath, 'our-clients/heading')
      
      if (uploadResult) {
        headingImages.push({
          url: uploadResult.url,
          publicId: uploadResult.publicId,
          alt: 'Our Clients',
          order: i + 1
        })
      }
    }

    if (headingImages.length === 0) {
      console.error('❌ No heading images were uploaded successfully')
      return
    }

    // Create our clients data
    const ourClientsData = {
      headingImages: headingImages,
      title: 'Our Valued Clients',
      contentSections: [
        {
          content: 'At Aslam Marble Suppliers, we take immense pride in the trust and confidence that our clients place in us. Over the years, we have had the privilege of serving a diverse range of clients, from individual homeowners seeking exquisite marble pieces for their personal spaces to large-scale commercial and institutional projects. Our commitment to quality, craftsmanship, and customer satisfaction has made us a preferred choice for clients across India and beyond.',
          order: 1
        },
        {
          content: 'Each project we undertake is a testament to our dedication to excellence. We work closely with our clients to understand their vision and bring it to life through our masterful craftsmanship. From residential temples and home decor to grand communal spaces and international projects, our portfolio reflects the diversity and scale of our expertise.',
          order: 2
        }
      ],
      isActive: true
    }

    // Clear existing data and insert new data
    console.log('\n🗑️  Clearing existing our clients data...')
    await OurClients.deleteMany({})

    console.log('💾 Inserting new our clients data...')
    const newOurClients = new OurClients(ourClientsData)
    await newOurClients.save()

    console.log('✅ Our Clients data seeded successfully!')
    console.log(`📊 Created our clients page with:`)
    console.log(`   - Heading images: ${headingImages.length}`)
    console.log(`   - Content sections: ${ourClientsData.contentSections.length}`)

  } catch (error) {
    console.error('❌ Error seeding our clients data:', error)
  } finally {
    await mongoose.connection.close()
    console.log('🔌 Database connection closed')
  }
}

// Run the seeding function
if (require.main === module) {
  seedOurClients()
}

module.exports = seedOurClients
