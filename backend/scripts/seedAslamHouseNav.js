/**
 * Upload Aslam Marble Suppliers hover images to Cloudinary
 * and upsert NavItem records with their URLs.
 *
 * Run from backend/:  node scripts/seedAslamHouseNav.js
 */
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
const NavItem = require('../models/NavItem')
const { uploadBuffer, deleteByPublicId } = require('../utils/cloudinary')
const dotenv = require('dotenv')

dotenv.config()

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stoneart'
const GROUP = 'aslam-house'

const assets = [
  {
    name: 'Visit Store',
    key: 'visit-store',
    displayOrder: 1,
    src: path.join(__dirname, '..', '..', 'my-project', 'src', 'assets', 'home', 'visit store', 'poojaroomm.jpeg'),
  },
  {
    name: 'About Us',
    key: 'about-us',
    displayOrder: 2,
    src: path.join(__dirname, '..', '..', 'my-project', 'src', 'assets', 'home', 'about us.jpeg'),
  },
  {
    name: 'Experience Centre',
    key: 'experience-centre',
    displayOrder: 3,
    src: path.join(__dirname, '..', '..', 'my-project', 'src', 'assets', 'home', 'experience center.jpeg'),
  },
  {
    name: 'Careers',
    key: 'careers',
    displayOrder: 4,
    src: path.join(__dirname, '..', '..', 'my-project', 'src', 'assets', 'home', 'careers.jpeg'),
  },
  {
    name: 'OUR ARTIST',
    key: 'artisans-of-tilak',
    displayOrder: 5,
    src: path.join(__dirname, '..', '..', 'my-project', 'src', 'assets', 'home', 'artisans of tilak.jpeg'),
  },
  {
    name: 'The Team',
    key: 'the-team',
    displayOrder: 6,
    src: path.join(__dirname, '..', '..', 'my-project', 'src', 'assets', 'house of marble', 'team', 'heading', 'Gemini_Generated_Image_ipme0eipme0eipme (1).png'),
  },
  {
    name: 'Our Clients',
    key: 'our-clients',
    displayOrder: 7,
    src: path.join(__dirname, '..', '..', 'my-project', 'src', 'assets', 'house of marble', 'our client', 'heading', 'Residential.jpeg'),
  },
]

const uploadAsset = async (src, folder) => {
  if (!fs.existsSync(src)) {
    console.warn('Source image missing, skipping:', src)
    return null
  }
  const buffer = fs.readFileSync(src)
  return uploadBuffer(buffer, folder)
}

const run = async () => {
  await mongoose.connect(MONGO_URI)
  console.log('Connected to MongoDB')

  for (const item of assets) {
    const upload = await uploadAsset(item.src, `aslam-house/${GROUP}`)
    if (!upload) continue

    const update = {
      group: GROUP,
      key: item.key,
      name: item.name,
      path: '#',
      imagePath: upload.secure_url,
      cloudinaryPublicId: upload.public_id,
      displayOrder: item.displayOrder,
      isActive: true,
    }

    const existing = await NavItem.findOne({ group: GROUP, key: item.key })
    if (existing?.cloudinaryPublicId && existing.cloudinaryPublicId !== upload.public_id) {
      await deleteByPublicId(existing.cloudinaryPublicId)
    }

    await NavItem.findOneAndUpdate(
      { group: GROUP, key: item.key },
      { $set: update },
      { upsert: true }
    )
    console.log('Seeded:', item.key, '->', upload.secure_url)
  }

  await mongoose.disconnect()
  console.log('Done.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

