const mongoose = require('mongoose')
const CommunalProjects = require('../models/CommunalProjects')
const { uploadLocalFile } = require('../utils/cloudinary')
const path = require('path')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stoneart'

// Local image paths (relative to backend folder)
const LOCAL_IMAGES = {
  hero: path.join(__dirname, '../../my-project/src/assets/communal/Screenshot 2025-12-02 113644.png'),
  gallery: [
    path.join(__dirname, '../../my-project/src/assets/communal/1733300550903.jpeg'),
    path.join(__dirname, '../../my-project/src/assets/communal/wmremove-transformed.jpeg'),
    path.join(__dirname, '../../my-project/src/assets/communal/wmremove-transformed (3).jpeg'),
    path.join(__dirname, '../../my-project/src/assets/communal/wmremove-transformed (4).jpeg'),
    path.join(__dirname, '../../my-project/src/assets/communal/wmremove-transformed (5).jpeg'),
    path.join(__dirname, '../../my-project/src/assets/communal/wmremove-transformed (6).jpeg')
  ]
}

const seedCommunalProjects = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI)
    console.log('MongoDB connected successfully')

    // Delete existing data
    await CommunalProjects.deleteMany({})
    console.log('Existing communal projects data deleted')

    // Upload hero image to Cloudinary
    console.log('Uploading hero image to Cloudinary...')
    const heroResult = await uploadLocalFile(LOCAL_IMAGES.hero, 'communal-projects/hero')
    console.log('Hero image uploaded:', heroResult.secure_url)

    // Upload gallery images to Cloudinary
    console.log('Uploading gallery images to Cloudinary...')
    const galleryImages = []
    
    for (let i = 0; i < LOCAL_IMAGES.gallery.length; i++) {
      console.log(`Uploading gallery image ${i + 1}/${LOCAL_IMAGES.gallery.length}...`)
      const result = await uploadLocalFile(LOCAL_IMAGES.gallery[i], 'communal-projects/gallery')
      
      galleryImages.push({
        url: result.secure_url,
        publicId: result.public_id,
        alt: `Communal Project ${i + 1}`,
        title: `Communal Project ${i + 1}`,
        description: 'This magnificent communal project stands as a testament to our dedication to preserving traditional temple architecture. Built with high-quality marble and intricate carvings, it serves as a spiritual gathering place for the community.',
        order: i
      })
      
      console.log(`Gallery image ${i + 1} uploaded:`, result.secure_url)
    }

    // Create communal projects data
    const communalData = await CommunalProjects.create({
      heroImage: {
        url: heroResult.secure_url,
        publicId: heroResult.public_id,
        alt: 'Communal Projects Hero'
      },
      title: 'COMMUNAL PROJECTS',
      subtitle: 'Building Sacred Spaces for Communities',
      description: 'Crafting magnificent communal temples and spiritual spaces that bring communities together through timeless architecture and exquisite craftsmanship.',
      sectionTitle: 'Our Communal Projects',
      sectionDescription: 'Showcasing our magnificent communal temple projects that bring communities together through divine architecture.',
      galleryImages: galleryImages,
      isActive: true
    })

    console.log('✅ Communal projects data seeded successfully!')
    console.log('📊 Summary:')
    console.log(`   - Hero Image: ${communalData.heroImage.url}`)
    console.log(`   - Gallery Images: ${communalData.galleryImages.length}`)
    console.log(`   - Title: ${communalData.title}`)

    mongoose.connection.close()
    console.log('MongoDB connection closed')
  } catch (error) {
    console.error('❌ Error seeding communal projects data:', error)
    mongoose.connection.close()
    process.exit(1)
  }
}

// Run the seed function
seedCommunalProjects()
