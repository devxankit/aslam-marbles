/**
 * Seed Our Products nav items to Cloudinary and NavItem collection.
 * Run from backend/:  node scripts/seedOurProductsNav.js
 */
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
const NavItem = require('../models/NavItem')
const { uploadBuffer, deleteByPublicId } = require('../utils/cloudinary')
const dotenv = require('dotenv')

dotenv.config()

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stoneart'
const GROUP = 'our-products-nav'

const assets = [
  { name: 'Sandstone', key: 'sandstone', displayOrder: 1, path: '/products/sandstone', src: ['our products', 'sandstone.jpg'] },
  { name: 'Limestone', key: 'limestone', displayOrder: 2, path: '/products/limestone', src: ['our products', 'limestone.jpg'] },
  { name: 'Marble', key: 'marble', displayOrder: 3, path: '/products/marble', src: ['our products', 'marble .jpg'] },
  { name: 'Granite', key: 'granite', displayOrder: 4, path: '/products/granite', src: ['our products', 'granite.jpg'] },
  { name: 'Slate', key: 'slate', displayOrder: 5, path: '/products/slate', src: ['our products', 'slatejpg.jpg'] },
  { name: 'Quartzite', key: 'quartzite', displayOrder: 6, path: '/products/quartzite', src: ['our products', 'quartzite.jpg'] },
  { name: 'Pebble Stones', key: 'pebble-stones', displayOrder: 7, path: '/products/pebble-stones', src: ['our products', 'pebble stones.jpg'] },
  { name: 'Cobble Stones', key: 'cobble-stones', displayOrder: 8, path: '/products/cobble-stones', src: ['our products', 'cobble stones.jpg'] },
  { name: 'Stone Chips', key: 'stone-chips', displayOrder: 9, path: '/products/stone-chips', src: ['our products', 'stone chips.jpg'] },
  { name: 'Basalt', key: 'basalt-stones', displayOrder: 10, path: '#', src: ['our products', 'basalt.jpg'] },
  { name: 'Soap Stone', key: 'soap-stones', displayOrder: 11, path: '#', src: ['our products', 'soap stone .jpg'] },
  { name: 'Travertine', key: 'travertine-stones', displayOrder: 12, path: '#', src: ['our products', 'travertine.jpg'] },
  { name: 'Natural Indian Stone', key: 'natural-indian-stones', displayOrder: 13, path: '/products/natural-indian-stones', src: ['our products', 'Natural Indian Stones', 'heading', 'Natural Stone Carving.jpg'] },
  { name: 'Modern Art', key: 'modern-art', displayOrder: 14, path: '/art/modern-art', src: ['ourcreation', 'Murti.jpeg'] },
  { name: 'Imported', key: 'imported', displayOrder: 15, path: '/art/imported', src: ['ourcreation', 'homedecor.jpeg'] },
  { name: 'Packaging', key: 'packaging', displayOrder: 16, path: '/art/packaging', src: ['ourcreation', 'Pooja.jpeg'] },
]

const uploadAsset = async (parts, folder) => {
  const src = path.join(__dirname, '..', '..', 'my-project', 'src', 'assets', ...parts)
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
      path: item.path || '#',
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

