const Testimonial = require('../models/Testimonial');

exports.getAllTestimonials = async (req, res) => {
  try {
    const { isActive, limit = 100 } = req.query;
    
    const filter = {};
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const testimonials = await Testimonial.find(filter)
      .sort({ displayOrder: 1, createdAt: 1 })
      .limit(parseInt(limit))
      .lean()
      .select('name location designation review rating image displayOrder isActive');

    res.json({ success: true, data: testimonials });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ success: false, message: 'Error fetching testimonials', error: error.message });
  }
};

exports.getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id).lean();
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, data: testimonial });
  } catch (error) {
    console.error('Error fetching testimonial by ID:', error);
    res.status(500).json({ success: false, message: 'Error fetching testimonial', error: error.message });
  }
};

exports.createTestimonial = async (req, res) => {
  try {
    const { name, location, designation, review, rating, image, displayOrder, isActive } = req.body;
    const newTestimonial = new Testimonial({
      name,
      location,
      designation: designation || null,
      review,
      rating: rating || 5,
      image: image || null,
      displayOrder: displayOrder || 0,
      isActive: isActive !== undefined ? isActive : true,
    });
    const testimonial = await newTestimonial.save();
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(400).json({ success: false, message: 'Error creating testimonial', error: error.message });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const { name, location, designation, review, rating, image, displayOrder, isActive } = req.body;
    
    // Build update object
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (location !== undefined) updateData.location = location;
    if (designation !== undefined) updateData.designation = designation || null;
    if (review !== undefined) updateData.review = review;
    if (rating !== undefined) updateData.rating = rating;
    if (image !== undefined) updateData.image = image || null;
    if (displayOrder !== undefined) updateData.displayOrder = displayOrder;
    if (isActive !== undefined) updateData.isActive = isActive;

    // Use findByIdAndUpdate for better performance
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true, lean: true }
    );
    
    if (!updatedTestimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    
    res.json({ success: true, data: updatedTestimonial });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(400).json({ success: false, message: 'Error updating testimonial', error: error.message });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    await Testimonial.deleteOne({ _id: req.params.id });
    res.json({ success: true, message: 'Testimonial removed' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ success: false, message: 'Error deleting testimonial', error: error.message });
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
    await Testimonial.bulkWrite(bulkOps);
    res.json({ success: true, message: 'Display order updated successfully' });
  } catch (error) {
    console.error('Error updating display order:', error);
    res.status(500).json({ success: false, message: 'Error updating display order', error: error.message });
  }
};

