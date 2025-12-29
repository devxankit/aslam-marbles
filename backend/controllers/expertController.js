const ExpertConsultation = require('../models/ExpertConsultation');

// POST /api/expert-consultations
exports.createConsultation = async (req, res, next) => {
  try {
    const {
      type,
      fullName,
      email,
      phone,
      city,
      aboutYourself,
      lookingFor,
      budget,
      timeline,
      additionalInfo,
      designReferences,
      source
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !city || !aboutYourself) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: fullName, email, phone, city, aboutYourself'
      });
    }

    const consultation = await ExpertConsultation.create({
      type: type || 'DOMESTIC',
      fullName,
      email: email.toLowerCase(),
      phone,
      city,
      aboutYourself,
      lookingFor,
      budget,
      timeline,
      additionalInfo,
      designReferences: designReferences || [],
      status: 'new',
      source: source || 'homepage-popup'
    });

    return res.status(201).json({
      success: true,
      message: 'Consultation request submitted successfully',
      consultation
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/expert-consultations (Admin only)
exports.getConsultations = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    let filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } }
      ];
    }

    const consultations = await ExpertConsultation.find(filter)
      .sort({ createdAt: -1 })
      .limit(1000);

    return res.json({
      success: true,
      consultations,
      count: consultations.length
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/expert-consultations/:id
exports.getConsultation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const consultation = await ExpertConsultation.findById(id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }

    return res.json({
      success: true,
      consultation
    });
  } catch (err) {
    next(err);
  }
};

// PUT /api/expert-consultations/:id
exports.updateConsultation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const consultation = await ExpertConsultation.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }

    return res.json({
      success: true,
      message: 'Consultation updated successfully',
      consultation
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/expert-consultations/:id
exports.deleteConsultation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const consultation = await ExpertConsultation.findByIdAndDelete(id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }

    return res.json({
      success: true,
      message: 'Consultation deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

