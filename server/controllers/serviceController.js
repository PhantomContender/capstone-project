const Service = require('../models/Service');

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
    res.status(500).json({ message: 'The Promethean flame flickered: ' + error.message });
  }
};

const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: 'Service not found in the archives.' });
    }
  } 
  catch (error) 
  {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getServices, getServiceById };