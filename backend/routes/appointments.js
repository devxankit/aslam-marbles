const express = require('express');
const {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointmentController');
const { auth, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public test
router.get('/test', (req, res) => res.json({ success: true, message: 'Appointments route is working' }));

// Public booking
router.post('/', createAppointment);

// List appointments (public for now so admin UI can load without token)
router.get('/', getAppointments);
router.get('/:id', auth, adminOnly, getAppointment);
router.put('/:id', auth, adminOnly, updateAppointment);
router.delete('/:id', auth, adminOnly, deleteAppointment);

module.exports = router;

