const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: 
  {
    type: String,
    required: [true, 'Please add a service name'],
    unique: true,
    trim: true
  },
  description: 
  {
    type: String,
    required: [true, 'Please add a description']
  },
  price: 
  {
    type: Number,
    required: [true, 'Please add a price']
  },
  duration: 
  {
    type: Number,
    required: [true, 'Please add duration in minutes'],
    default: 60
  },
  image: 
  {
    type: String,
    default: 'no-photo.jpg' 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Service', serviceSchema, 'services');