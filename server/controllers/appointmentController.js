const Appointment = require('../models/Appointment');
const Service = require('../models/Service');

exports.addAppointment = async (req, res) => {
  try {
    const { service, appointmentDate, notes } = req.body;

    const existingAppointment = await Appointment.findOne({ appointmentDate });

    if (existingAppointment) {
      return res.status(400).json({ 
        message: 'This time slot is already claimed in the ledger. Please select another.' 
      });
    }

    const appointment = await Appointment.create({
      user: req.user.id, 
      service,
      appointmentDate,
      notes
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id })
      .populate('service', 'name duration price')
      .sort({ appointmentDate: 1 }); 

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'The Ledger is unavailable: ' + error.message });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await appointment.deleteOne();
    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({})
      .populate('user', 'name email')
      .populate('service', 'name price')
      .sort({ appointmentDate: 1 }); 
    
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
