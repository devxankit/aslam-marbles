const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')
const ResidentialProjects = require('../models/ResidentialProjects')
const InternationalProjects = require('../models/InternationalProjects')
const { uploadLocalFile } = require('../utils/cloudinary')

// Load env vars
dotenv.config({ path: path.join(__dirname, '..', '.env') })

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in .env')
    process.exit(1)
}

const RESIDENTIAL_ASSETS_PATH = 'c:\\Users\\victus\\Desktop\\StoneArt\\my-project\\src\\assets\\residential'
const RESIDENTIAL_HERO_PATH = 'c:\\Users\\victus\\Desktop\\StoneArt\\my-project\\src\\assets\\residential\\headignimage\\a81fbe96-e50f-413e-94f0-fc1f7aba5b4c.png'

const INTERNATIONAL_ASSETS_PATH = 'c:\\Users\\victus\\Desktop\\StoneArt\\my-project\\src\\assets\\international'
const INTERNATIONAL_HERO_PATH = 'c:\\Users\\victus\\Desktop\\StoneArt\\my-project\\src\\assets\\international\\heading image\\446d311a-f90e-4837-b736-3f8e6a5f4b2c.png'

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log('MongoDB connected')
    } catch (error) {
        console.error('MongoDB connection error:', error)
        process.exit(1)
    }
}

const seedResidential = async () => {
    console.log('--- Seeding Residential Projects ---')
    try {
        let project = await ResidentialProjects.findOne()
        if (!project) {
            console.log('Creating new ResidentialProjects document...')
            project = new ResidentialProjects({
                heroImage: { url: 'placeholder', publicId: 'placeholder' } // Temporary
            })
        }

        // 1. Upload Hero Image
        console.log('Uploading Residential Hero Image...')
        try {
            if (fs.existsSync(RESIDENTIAL_HERO_PATH)) {
                const result = await uploadLocalFile(RESIDENTIAL_HERO_PATH, 'residential_projects/hero')
                project.heroImage = {
                    url: result.secure_url,
                    publicId: result.public_id,
                    alt: 'Residential Projects Hero'
                }
                console.log('Hero image uploaded.')
            } else {
                console.log('Residential Hero Image not found at:', RESIDENTIAL_HERO_PATH)
            }
        } catch (err) {
            console.error('Error uploading residential hero image:', err)
        }

        // 2. Upload Gallery Images
        console.log('Uploading Residential Gallery Images...')
        try {
            const files = fs.readdirSync(RESIDENTIAL_ASSETS_PATH)

            // Clear existing gallery images to avoid duplicates or messy state, 
            // OR we can just append. For a clean seed, clearing is often better 
            // IF we are sure we want to replace. 
            // Since the user asked to "feed" the backend, I'll clear strictly if I'm fully replacing, 
            // but to be safe and avoid deleting data if this is run multiple times, 
            // I will check if the image (by approx name) is already there? 
            // No, simplest is to reset galleryImages for this bulk operation.
            project.galleryImages = []

            for (const file of files) {
                const fullPath = path.join(RESIDENTIAL_ASSETS_PATH, file)
                // Skip directories and the heading image directory if it's there
                if (fs.statSync(fullPath).isDirectory()) continue

                // Skip if it is not an image (basic check)
                if (!file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) continue

                console.log(`Uploading ${file}...`)
                const result = await uploadLocalFile(fullPath, 'residential_projects/gallery')

                // Use filename as title (remove extension and replace dashes/underscores with spaces)
                const titleFromFilename = file.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
                const formattedTitle = titleFromFilename.charAt(0).toUpperCase() + titleFromFilename.slice(1);

                project.galleryImages.push({
                    url: result.secure_url,
                    publicId: result.public_id,
                    title: formattedTitle,
                    description: 'Beautiful residential stone work.',
                    location: 'India',
                    address: '',
                    client: '',
                    duration: ''
                })
            }
        } catch (err) {
            console.error('Error reading/uploading residential gallery images:', err)
        }

        await project.save()
        console.log('Residential Projects saved successfully.')

    } catch (error) {
        console.error('Error seeding Residential Projects:', error)
    }
}

const seedInternational = async () => {
    console.log('--- Seeding International Projects ---')
    try {
        let project = await InternationalProjects.findOne()
        if (!project) {
            console.log('Creating new InternationalProjects document...')
            project = new InternationalProjects({
                heroImage: { url: 'placeholder', publicId: 'placeholder' }
            })
        }

        // 1. Upload Hero Image
        console.log('Uploading International Hero Image...')
        try {
            if (fs.existsSync(INTERNATIONAL_HERO_PATH)) {
                const result = await uploadLocalFile(INTERNATIONAL_HERO_PATH, 'international_projects/hero')
                project.heroImage = {
                    url: result.secure_url,
                    publicId: result.public_id,
                    alt: 'International Projects Hero'
                }
                console.log('Hero image uploaded.')
            } else {
                console.log('International Hero Image not found at:', INTERNATIONAL_HERO_PATH)
            }
        } catch (err) {
            console.error('Error uploading international hero image:', err)
        }

        // 2. Upload Gallery Images
        console.log('Uploading International Gallery Images...')
        try {
            const files = fs.readdirSync(INTERNATIONAL_ASSETS_PATH)

            project.galleryImages = []

            for (const file of files) {
                const fullPath = path.join(INTERNATIONAL_ASSETS_PATH, file)
                if (fs.statSync(fullPath).isDirectory()) continue
                if (!file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) continue

                console.log(`Uploading ${file}...`)
                const result = await uploadLocalFile(fullPath, 'international_projects/gallery')

                // Use filename as title
                const titleFromFilename = file.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
                const formattedTitle = titleFromFilename.charAt(0).toUpperCase() + titleFromFilename.slice(1);

                project.galleryImages.push({
                    url: result.secure_url,
                    publicId: result.public_id,
                    title: formattedTitle,
                    description: 'Exquisite international stone architecture.',
                    location: 'International',
                    address: '',
                    client: '',
                    duration: ''
                })
            }
        } catch (err) {
            console.error('Error reading/uploading international gallery images:', err)
        }

        await project.save()
        console.log('International Projects saved successfully.')

    } catch (error) {
        console.error('Error seeding International Projects:', error)
    }
}

const run = async () => {
    await connectDB()
    await seedResidential()
    await seedInternational()
    console.log('Seeding completed. Exiting...')
    process.exit(0)
}

run()
