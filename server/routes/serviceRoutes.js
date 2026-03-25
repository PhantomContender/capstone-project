const express = require('express');
const router = express.Router();
const { getServices, getServiceById } = require('../controllers/serviceController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', getServices);
router.get('/:id', getServiceById);

module.exports = router;

