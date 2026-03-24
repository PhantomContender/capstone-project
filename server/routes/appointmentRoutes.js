const express = require('express');
const router = express.Router();
const { addAppointment, getMyAppointments, cancelAppointment} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addAppointment);
router.get('/myappointments', protect, getMyAppointments);
router.delete('/:id', protect, cancelAppointment);

module.exports = router;