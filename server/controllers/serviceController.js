const mongoose = require('mongoose');

exports.getServices = async (req, res) => {
  try {
    const rawData = await mongoose.connection.db.collection('services').find({}).toArray();
    
    console.log('Total documents found in Zenith.services:', rawData.length);
    
    if (rawData.length === 0) {
        return res.status(404).json({ message: "Database is connected, but the 'services' collection is empty." });
    }

    res.status(200).json(rawData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};