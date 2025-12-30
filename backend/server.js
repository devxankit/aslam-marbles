const express = require('express');
// server update 9 - Force Restart & Verify
console.log('--- BACKEND SERVER RESTARTING (Update 9) ---');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const compression = require('compression');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const appointmentRoutes = require('./routes/appointments');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const jobRoutes = require('./routes/jobs');
const expertConsultationRoutes = require('./routes/expertConsultations');
const orderRoutes = require('./routes/orders');
const paymentRoutes = require('./routes/payments');
const faqRoutes = require('./routes/faqs');
const testimonialRoutes = require('./routes/testimonials');
const blogRoutes = require('./routes/blogs');
const navItemRoutes = require('./routes/navItems');
const aboutUsRoutes = require('./routes/aboutUs');
const experienceCentreRoutes = require('./routes/experienceCentre');
const teamRoutes = require('./routes/team');
const careersRoutes = require('./routes/careers');
const artistRoutes = require('./routes/artists');
const ourClientsRoutes = require('./routes/ourClients');
const communalProjectsRoutes = require('./routes/communalProjects');
const residentialProjectsRoutes = require('./routes/residentialProjects');
const internationalProjectsRoutes = require('./routes/internationalProjects');
const poojaRoomRoutes = require('./routes/poojaRoomRoutes');
const dreamTempleRoutes = require('./routes/dreamTempleRoutes');
const translationRoutes = require('./routes/translationRoutes');
const communalTemplesRoutes = require('./routes/communalTemplesRoutes');
const jainTemplesRoutes = require('./routes/jainTemplesRoutes');

dotenv.config();

const app = express();

// Compression middleware - compress all responses
app.use(compression());

// Core middleware
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176',
    'http://localhost:5177',
    'http://localhost:3000',
    'https://aslam-marbles.vercel.app'
  ],
  credentials: true
}));

// Compression middleware for better performance
app.use(compression());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logger (lightweight) - only in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, _res, next) => {
    console.log(`[REQ] ${req.method} ${req.originalUrl}`);
    next();
  });
}

// Static (if needed)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DB connect
connectDB(process.env.MONGODB_URI);

// DB readiness guard: avoid 500s/hangs when Mongo is down. Return 503 instead.
const requireDbReady = (req, res, next) => {
  if (mongoose.connection?.readyState === 1) return next();
  return res.status(503).json({
    success: false,
    message: 'Service temporarily unavailable (database not connected). Please try again shortly.'
  });
};

// Routes
// Allow translation + health even if DB is down (translation has fallback provider & in-memory cache)
app.use('/api/v1/translate', translationRoutes);
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running', dbReady: mongoose.connection?.readyState === 1 });
});

// Everything else needs DB
app.use('/api', requireDbReady);

app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/expert-consultations', expertConsultationRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/nav-items', navItemRoutes);
app.use('/api/about-us', aboutUsRoutes);
app.use('/api/experience-centre', experienceCentreRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/careers', careersRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/our-clients', ourClientsRoutes);
app.use('/api/communal-projects', communalProjectsRoutes);
app.use('/api/residential-projects', residentialProjectsRoutes);
app.use('/api/international-projects', internationalProjectsRoutes);
app.use('/api/pooja-room', poojaRoomRoutes);
app.use('/api/dream-temple', dreamTempleRoutes);
app.use('/api/communal-temples', communalTemplesRoutes);
app.use('/api/jain-temples', jainTemplesRoutes);
app.use('/api/stone-products', require('./routes/stoneProductRoutes'));
app.use('/api/ams-design-hub', require('./routes/tsaDesignHubRoutes'));
app.use('/api/murtis', require('./routes/murtiRoutes'));
app.use('/api/home-decor', require('./routes/homeDecorRoutes'));
app.use('/api/locations', require('./routes/locationRoutes'));
app.use('/api/home-page', require('./routes/homePageRoutes'));
app.use('/api/ams-international', require('./routes/tsaInternationalRoutes'));
app.use('/api/trusted-by', require('./routes/trustedByRoutes'));
app.use('/api/live-inventory', require('./routes/liveInventoryRoutes'));
app.use('/api/special-products', require('./routes/specialProductRoutes'));
app.use('/api/shop-by-products', require('./routes/shopByProductRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));
app.use('/api/page-content', require('./routes/pageContentRoutes'));

// Errors
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

module.exports = app;

