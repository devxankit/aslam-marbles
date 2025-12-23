const FAQ = require('../models/FAQ');

exports.getAllFAQs = async (req, res) => {
  try {
    const { pageKey, location, isActive } = req.query;
    
    const filter = {};
    if (pageKey) filter.pageKey = pageKey;
    if (location) filter.location = location;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const faqs = await FAQ.find(filter)
      .sort({ displayOrder: 1, createdAt: 1 })
      .lean();

    res.json({ success: true, data: faqs });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ success: false, message: 'Error fetching FAQs', error: error.message });
  }
};

exports.getFAQById = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id).lean();
    if (!faq) {
      return res.status(404).json({ success: false, message: 'FAQ not found' });
    }
    res.json({ success: true, data: faq });
  } catch (error) {
    console.error('Error fetching FAQ by ID:', error);
    res.status(500).json({ success: false, message: 'Error fetching FAQ', error: error.message });
  }
};

exports.createFAQ = async (req, res) => {
  try {
    const { pageKey, location, question, answer, displayOrder, isActive } = req.body;
    const newFAQ = new FAQ({
      pageKey: pageKey.toLowerCase(),
      location: location || null,
      question,
      answer,
      displayOrder,
      isActive: isActive !== undefined ? isActive : true,
    });
    const faq = await newFAQ.save();
    res.status(201).json({ success: true, data: faq });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    res.status(400).json({ success: false, message: 'Error creating FAQ', error: error.message });
  }
};

exports.updateFAQ = async (req, res) => {
  try {
    const { pageKey, location, question, answer, displayOrder, isActive } = req.body;
    
    // Build update object
    const updateData = {};
    if (pageKey) updateData.pageKey = pageKey.toLowerCase();
    if (location !== undefined) updateData.location = location;
    if (question) updateData.question = question;
    if (answer) updateData.answer = answer;
    if (displayOrder !== undefined) updateData.displayOrder = displayOrder;
    if (isActive !== undefined) updateData.isActive = isActive;

    // Use findByIdAndUpdate for better performance
    const updatedFAQ = await FAQ.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true, lean: true }
    );
    
    if (!updatedFAQ) {
      return res.status(404).json({ success: false, message: 'FAQ not found' });
    }
    
    res.json({ success: true, data: updatedFAQ });
  } catch (error) {
    console.error('Error updating FAQ:', error);
    res.status(400).json({ success: false, message: 'Error updating FAQ', error: error.message });
  }
};

exports.deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ success: false, message: 'FAQ not found' });
    }
    await FAQ.deleteOne({ _id: req.params.id });
    res.json({ success: true, message: 'FAQ removed' });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    res.status(500).json({ success: false, message: 'Error deleting FAQ', error: error.message });
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
    await FAQ.bulkWrite(bulkOps);
    res.json({ success: true, message: 'Display order updated successfully' });
  } catch (error) {
    console.error('Error updating display order:', error);
    res.status(500).json({ success: false, message: 'Error updating display order', error: error.message });
  }
};
