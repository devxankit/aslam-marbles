const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
const PoojaRoom = require('../models/PoojaRoom')
const { uploadLocalFile } = require('../utils/cloudinary')

dotenv.config({ path: path.join(__dirname, '..', '.env') })

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in .env')
    process.exit(1)
}

const ASSETS_BASE = 'c:\\Users\\victus\\Desktop\\StoneArt\\my-project\\src\\assets\\ourcreation\\pooja room'

const seed = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log('Connected to MongoDB')

        // Clear existing data
        await PoojaRoom.deleteMany({})
        console.log('Cleared existing Pooja Room data')

        const data = new PoojaRoom()

        // 1. Hero Section
        console.log('Uploading Hero Image...')
        const heroResult = await uploadLocalFile(path.join(ASSETS_BASE, 'headiing', '06fcbe87-a149-445b-912c-6787ef4a4d50.png'), 'pooja-room/hero')
        data.heroSection = {
            title: 'Welcome to Our Pooja Room Collection',
            subtitle: 'Aslam Marble Suppliers',
            image: { url: heroResult.secure_url, alt: 'Pooja Room Hero' }
        }

        // 2. Collection
        console.log('Uploading Collection Images...')
        const coll1 = await uploadLocalFile(path.join(ASSETS_BASE, 'images', '06fcbe87-a149-445b-912c-6787ef4a4d50.png'), 'pooja-room/collection')
        const coll2 = await uploadLocalFile(path.join(ASSETS_BASE, 'images', '14d31fa5-cfd7-4b90-a247-9748d279f3c7.png'), 'pooja-room/collection')
        const coll3 = await uploadLocalFile(path.join(ASSETS_BASE, 'images', '299a63e6-532b-4b95-960c-1547e879b758.png'), 'pooja-room/collection')
        const coll4 = await uploadLocalFile(path.join(ASSETS_BASE, 'images', '446d311a-f90e-4837-b736-3f8e6a5f4b2c.png'), 'pooja-room/collection')

        data.collection = [
            { name: 'Small Pooja Room', size: 'upto 50 Sqft', price: '12L', fullPrice: 1200000, image: { url: coll1.secure_url } },
            { name: 'Medium Pooja Room', size: 'upto 80 Sqft', price: '20L', fullPrice: 2000000, image: { url: coll2.secure_url } },
            { name: 'Large Pooja Room', size: 'Above 80 Sqft', price: '25.75L', fullPrice: 2575000, image: { url: coll3.secure_url } },
            { name: 'Grand Pooja Room', size: 'Custom Size', price: '35L', fullPrice: 3500000, image: { url: coll4.secure_url } }
        ]

        // 3. Consultation
        console.log('Uploading Consultation Images...')
        const cons1 = await uploadLocalFile(path.join(ASSETS_BASE, 'consultation lcons', 'Gemini_Generated_Image_h2oaaqh2oaaqh2oa.png'), 'pooja-room/consultation')
        const cons2 = await uploadLocalFile(path.join(ASSETS_BASE, 'consultation lcons', 'Gemini_Generated_Image_xtcirextcirextci.png'), 'pooja-room/consultation')

        data.consultation = {
            section1: {
                title: 'All We Need Is Your Space Dimensions And Pictures',
                description: 'We understand that every space is unique. Share your space\'s dimensions and pictures, and let our experts help you visualize the perfect marble solution tailored to your environment.',
                image: { url: cons1.secure_url }
            },
            section2: {
                title: 'Customised Solutions',
                description: 'Let us bring your vision to life with a custom-designed space that reflects your unique taste and lifestyle. Whether it\'s a traditional pooja room or a modern sanctuary, we\'ll work with you to create the perfect fit.',
                image: { url: cons2.secure_url }
            }
        }

        // 4. Services
        console.log('Uploading Service Icons...')
        const serviceIcons = [
            { name: 'Wall Cladding', file: '1wall.png' },
            { name: 'Floor Inlay', file: '2floor.png' },
            { name: 'Virtual Assistance', file: '3virtual.png' },
            { name: 'Custom Design', file: '4custom design.png' },
            { name: 'Visualisation', file: '5visualisation.png' },
            { name: 'Project Tracking', file: '6project tracking.png' }
        ]
        for (const s of serviceIcons) {
            console.log(`Uploading service icon: ${s.name}`)
            const res = await uploadLocalFile(path.join(ASSETS_BASE, 'icons', s.file), 'pooja-room/services')
            data.services.push({ name: s.name, icon: { url: res.secure_url, alt: s.name } })
        }

        // 5. Before/After
        console.log('Uploading Before/After Images...')
        const before = await uploadLocalFile(path.join(ASSETS_BASE, 'before&after', 'compare2.jpg'), 'pooja-room/before-after')
        const after = await uploadLocalFile(path.join(ASSETS_BASE, 'before&after', 'compare1.png'), 'pooja-room/before-after')
        data.beforeAfter = {
            title: 'Before and After',
            description: 'Witness the transformation from a simple space to a divine sanctuary.',
            beforeImage: { url: before.secure_url },
            afterImage: { url: after.secure_url }
        }

        // 6. Gallery
        console.log('Uploading Gallery Images...')
        const galleryFiles = [
            '1733296958645.jpeg', '1733300646054.jpeg', '4d2730d0-5d47-49f4-94b5-a8d151f7b39b.png',
            '81fe6d99-c983-460b-9cfb-586795089d56.png', '8d836775-b2f6-4c0a-8ab4-5b7c27a36e55.png', 'ca344ef3-3bd3-44dc-adeb-cd70d1b3c573.png'
        ]
        for (const file of galleryFiles) {
            console.log(`Uploading gallery image: ${file}`)
            const res = await uploadLocalFile(path.join(ASSETS_BASE, 'images', file), 'pooja-room/gallery')
            data.gallery.push({ url: res.secure_url, alt: 'Gallery Image' })
        }

        await data.save()
        console.log('Pooja Room data seeded successfully!')
        process.exit(0)
    } catch (error) {
        console.error('Error seeding data:', error)
        process.exit(1)
    }
}

seed()
