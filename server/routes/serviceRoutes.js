const express = require('express');
const router = express.Router();
const { getServices } = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getServices);

module.exports = router;

