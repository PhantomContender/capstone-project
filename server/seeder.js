const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Service = require('./models/Service');
const Appointment = require('./models/Appointment');
const services = require('./data/services'); 

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const importData = async () => 
{
  try 
  {
    await Appointment.deleteMany();
    await Service.deleteMany();
    await User.deleteMany();

    await Service.insertMany(services);
    console.log('Data Imported!'.green.inverse);
    process.exit();
  } 
  catch (error) 
  {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
} else {
  importData();
}