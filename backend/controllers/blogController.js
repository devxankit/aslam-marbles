const Blog = require('../models/Blog');

exports.getAllBlogs = async (req, res) => {
  try {
    const { isActive, category, page = 1, limit = 50 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;
    
    const filter = {};
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (category) filter.category = category;

    // Use Promise.all for parallel execution
    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .sort({ displayOrder: 1, createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean()
        .select('title description image category date displayOrder isActive'),
      Blog.countDocuments(filter)
    ]);

    res.json({ 
      success: true, 
      data: blogs,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ success: false, message: 'Error fetching blogs', error: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).lean();
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    res.status(500).json({ success: false, message: 'Error fetching blog', error: error.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, description, content, image, category, author, date, displayOrder, isActive } = req.body;
    const newBlog = new Blog({
      title,
      description,
      content: content || '',
      image,
      category,
      author: author || null,
      date: date || new Date().toLocaleDateString(),
      displayOrder: displayOrder || 0,
      isActive: isActive !== undefined ? isActive : true,
    });
    const blog = await newBlog.save();
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(400).json({ success: false, message: 'Error creating blog', error: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, description, content, image, category, author, date, displayOrder, isActive } = req.body;
    
    // Build update object
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (content !== undefined) updateData.content = content;
    if (image !== undefined) updateData.image = image;
    if (category !== undefined) updateData.category = category;
    if (author !== undefined) updateData.author = author || null;
    if (date !== undefined) updateData.date = date;
    if (displayOrder !== undefined) updateData.displayOrder = displayOrder;
    if (isActive !== undefined) updateData.isActive = isActive;

    // Use findByIdAndUpdate for better performance
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true, lean: true }
    );
    
    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    
    res.json({ success: true, data: updatedBlog });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(400).json({ success: false, message: 'Error updating blog', error: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    await Blog.deleteOne({ _id: req.params.id });
    res.json({ success: true, message: 'Blog removed' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ success: false, message: 'Error deleting blog', error: error.message });
  }
};

exports.updateDisplayOrder = async (req, res) => {
  try {
    const updates = req.body;
    const bulkOps = updates.map(item => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: { displayOrder: item.displayOrder } }
      }
    }));
    await Blog.bulkWrite(bulkOps);
    res.json({ success: true, message: 'Display order updated successfully' });
  } catch (error) {
    console.error('Error updating display order:', error);
    res.status(500).json({ success: false, message: 'Error updating display order', error: error.message });
  }
};

