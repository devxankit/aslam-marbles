/**
 * Seed Projects nav items to Cloudinary and NavItem collection.
 * Run from backend/:  node scripts/seedProjectsNav.js
 */
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
const NavItem = require('../models/NavItem')
const { uploadBuffer, deleteByPublicId } = require('../utils/cloudinary')
const dotenv = require('dotenv')

dotenv.config()

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stoneart'
const GROUP = 'projects-nav'

const assets = [
  {
    name: 'Communal',
    key: 'communal',
    displayOrder: 1,
    path: '/communal-projects',
    src: path.join(__dirname, '..', '..', 'my-project', 'src', 'assets', 'navabarhoverimage', 'communalimage.png'),
  },
  {
    name: 'Residential',
    key: 'residential',
    displayOrder: 2,
    path: '/residential-projects',
    src: path.join(__dirname, '..', '..', 'my-project', 'src', 'assets', 'navabarhoverimage', 'residentialimage.png'),
  },
  {
    name: 'International',
    key: 'international',
    displayOrder: 3,
    path: '/international-projects',
    src: path.join(__dirname, '..', '..', 'my-project', 'src', 'assets', 'navabarhoverimage', 'internationaliimage.png'),
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
    const upload = await uploadAsset(item.src, `nav/${GROUP}`)
    if (!upload) continue

    const update = {
      group: GROUP,
      key: item.key,
      name: item.name,
      path: item.path,
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

