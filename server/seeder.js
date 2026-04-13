const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Service = require('./models/Service');
const Appointment = require('./models/Appointment');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas...'))
  .catch(err => console.error('Connection error:', err));

    const users = [
      {
        
        name: 'Zenith Admin',
        email: 'admin@zenith.com',
        password: 'password123', 
        role: 'admin',
      },
      {
        name: 'Sally Smith',
        email: 'ssmith@gmail.com',
        password: 'password456',
        role: 'client',
      },
      {
        name: 'Todd Jones',
        email: 'tjones@gmail.com',
        password: 'password789',
        role: 'client',
      },
      {
        name: 'Kurt Russell',
        email: 'krussell@gmail.com',
        password: 'password1011',
        role: 'client',
      }
    ];

const services = [
  {
    name: "Zenith Deep Tissue Massage",
    description: "A therapeutic treatment focusing on realigning deeper layers of muscles and connective tissue.",
    duration: 60,
    price: 120,
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&auto=format&fit=crop"
  },
  {
    name: "Express Radiance Facial Treatment",
    description: "A condensed high-performance treatment designed to cleanse, exfoliate, and hydrate the skin.",
    duration: 30,
    price: 65,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=500"
  },
  {
    name: "Infrared Sauna Therapy",
    description: "Relax in our state-of-the-art infrared sauna to promote detoxification and muscle recovery.",
    duration: 45,
    price: 45,
    image: "https://images.unsplash.com/photo-1583416750470-965b2707b355?w=500"
  },
  {
    name: "Himalayan Salt Stone Massage",
    description: "An innovative healing technique using warm salt crystal stones to ground and balance the body.",
    duration: 90,
    price: 185,
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=500"
  },
  {
    name: "Holistic Wellness Assessment",
    description: "A 1-on-1 session with a specialist to discuss stress levels and create a personalized plan.",
    duration: 45,
    price: 80,
    image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=500"
  },
  {
    name: "Guided Mindfulness Meditation",
    description: "A private, guided session focusing on breathing techniques and mental clarity.",
    duration: 30,
    price: 40,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500"
  }
];

const importData = async () => {
  try {
    await Appointment.deleteMany();
    await Service.deleteMany();
    await User.deleteMany();

    await User.create(users); 
    await Service.insertMany(services);

    console.log('🔥 Success: Users and Services Imported to Atlas! 🔥');
    process.exit();
  } catch (error) {
    console.error('Import failed:', error.message);
    process.exit(1);
  }
};

importData();