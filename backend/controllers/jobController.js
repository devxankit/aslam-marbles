const JobApplication = require('../models/JobApplication');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Ensure uploads directory exists
const resumesDir = path.join(__dirname, '..', 'uploads', 'resumes');
if (!fs.existsSync(resumesDir)) {
  fs.mkdirSync(resumesDir, { recursive: true });
}

// Multer config for resume uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, resumesDir),
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, '-');
    cb(null, `${Date.now()}-${safeName}`);
  }
});

const fileFilter = (_req, file, cb) => {
  const allowed = /pdf|doc|docx/;
  const extOk = allowed.test(path.extname(file.originalname).toLowerCase());
  const mimeOk = allowed.test(file.mimetype);
  if (extOk && mimeOk) return cb(null, true);
  cb(new Error('Only PDF, DOC, DOCX files are allowed'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Allow JSON submits (no file) and multipart (with resume)
const conditionalUpload = (req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  if (contentType.includes('multipart/form-data')) {
    return upload.single('resume')(req, res, next);
  }
  return next();
};

exports.uploadResume = conditionalUpload;

exports.createApplication = async (req, res, next) => {
  try {
    const {
      fullName,
      currentCity,
      currentPosition,
      email,
      department,
      applyingFor,
      phoneNo,
      resumeName
    } = req.body;

    if (!fullName || !currentCity || !email || !department || !applyingFor || !phoneNo) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const app = await JobApplication.create({
      fullName,
      currentCity,
      currentPosition,
      email: email.toLowerCase(),
      department,
      applyingFor,
      phoneNo,
      resumeName: resumeName || (req.file ? req.file.originalname : ''),
      resumePath: req.file ? `/uploads/resumes/${req.file.filename}` : null
    });

    return res.status(201).json({ success: true, application: app });
  } catch (err) {
    next(err);
  }
};

exports.getApplications = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status && status !== 'all' ? { status } : {};
    const apps = await JobApplication.find(filter).sort({ createdAt: -1 });
    return res.json({ success: true, applications: apps });
  } catch (err) {
    next(err);
  }
};

exports.updateApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const app = await JobApplication.findByIdAndUpdate(id, updates, { new: true });
    if (!app) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    return res.json({ success: true, application: app });
  } catch (err) {
    next(err);
  }
};

exports.deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const app = await JobApplication.findByIdAndDelete(id);
    if (!app) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    return res.json({ success: true, message: 'Application deleted' });
  } catch (err) {
    next(err);
  }
};


