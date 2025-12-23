const NavItem = require('../models/NavItem');
const { uploadBuffer, deleteByPublicId } = require('../utils/cloudinary');

exports.getNavItems = async (req, res) => {
  try {
    const { group, isActive } = req.query;
    const filter = {};
    if (group) filter.group = group;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const items = await NavItem.find(filter)
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();

    res.json({ success: true, data: items });
  } catch (error) {
    console.error('Error fetching nav items:', error);
    res.status(500).json({ success: false, message: 'Error fetching nav items', error: error.message });
  }
};

exports.createNavItem = async (req, res) => {
  try {
    const { group, key, name, path: linkPath, displayOrder, isActive } = req.body;

    if (!group || !key || !name) {
      return res.status(400).json({ success: false, message: 'group, key, and name are required' });
    }

    let imagePath = null;
    let cloudinaryPublicId = null;
    if (req.file?.buffer) {
      const upload = await uploadBuffer(req.file.buffer, `nav/${group}`);
      imagePath = upload.secure_url;
      cloudinaryPublicId = upload.public_id;
    }

    const navItem = await NavItem.create({
      group,
      key,
      name,
      path: linkPath || '#',
      imagePath,
      cloudinaryPublicId,
      displayOrder: displayOrder || 0,
      isActive: isActive !== undefined ? isActive : true
    });

    res.status(201).json({ success: true, data: navItem });
  } catch (error) {
    console.error('Error creating nav item:', error);
    const status = error.code === 11000 ? 409 : 400;
    res.status(status).json({ success: false, message: 'Error creating nav item', error: error.message });
  }
};

exports.updateNavItem = async (req, res) => {
  try {
    const { group, key, name, path: linkPath, displayOrder, isActive } = req.body;
    const updateData = {};

    if (group !== undefined) updateData.group = group;
    if (key !== undefined) updateData.key = key;
    if (name !== undefined) updateData.name = name;
    if (linkPath !== undefined) updateData.path = linkPath;
    if (displayOrder !== undefined) updateData.displayOrder = displayOrder;
    if (isActive !== undefined) updateData.isActive = isActive === 'true' || isActive === true;

    // handle new image via Cloudinary
    if (req.file?.buffer) {
      const existing = await NavItem.findById(req.params.id);
      const effectiveGroup = group || existing?.group || 'default';
      const upload = await uploadBuffer(req.file.buffer, `nav/${effectiveGroup}`);
      updateData.imagePath = upload.secure_url;
      updateData.cloudinaryPublicId = upload.public_id;
      if (existing?.cloudinaryPublicId && existing.cloudinaryPublicId !== upload.public_id) {
        await deleteByPublicId(existing.cloudinaryPublicId);
      }
    }

    const updated = await NavItem.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true, lean: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Nav item not found' });
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating nav item:', error);
    const status = error.code === 11000 ? 409 : 400;
    res.status(status).json({ success: false, message: 'Error updating nav item', error: error.message });
  }
};

exports.deleteNavItem = async (req, res) => {
  try {
    const deleted = await NavItem.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Nav item not found' });
    }
    if (deleted?.cloudinaryPublicId) {
      await deleteByPublicId(deleted.cloudinaryPublicId);
    }
    res.json({ success: true, message: 'Nav item deleted' });
  } catch (error) {
    console.error('Error deleting nav item:', error);
    res.status(500).json({ success: false, message: 'Error deleting nav item', error: error.message });
  }
};

