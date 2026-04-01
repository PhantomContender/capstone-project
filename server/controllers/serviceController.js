const Service = require('../models/Service');
const mongoose = require('mongoose');

const getServices = async (req, res) => {
  try 
  {
    const services = await Service.find({});
    
    if (services.length === 0) {
      return res.status(200).json([]); 
    }

    res.status(200).json(services);
  }
  catch (error) 
  {
    res.status(500).json({ message: 'Zenith Assistant error: ' + error.message });
  }
};

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        message: `ID '${id}' is not a valid Archive format. Please use a 24-character hex string.` 
      });
    }

    const service = await Service.findById(id);

    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: 'Service not found in the archives.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'The archives are currently occluded: ' + error.message });
  }
};

module.exports = { getServices, getServiceById };