const mongoose = require('mongoose');

const NavItemSchema = new mongoose.Schema({
  group: { type: String, required: true, index: true },
  key: { type: String, required: true },
  name: { type: String, required: true },
  path: { type: String, default: '#' },
  imagePath: { type: String, default: null },
  // Optional when assets are stored on Cloudinary (used by seed script)
  cloudinaryPublicId: { type: String, default: null },
  displayOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

NavItemSchema.index({ group: 1, key: 1 }, { unique: true });
NavItemSchema.index({ group: 1, displayOrder: 1 });

module.exports = mongoose.model('NavItem', NavItemSchema);

