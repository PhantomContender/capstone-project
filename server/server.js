const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api/services', require('./routes/serviceRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => 
{
  console.log(`Zenith Server running on port ${PORT}`);
});

app.use('/api/auth', require('./routes/authRoutes'));

app.use('/api/appointments', require('./routes/appointmentRoutes'));

app.use(errorHandler);