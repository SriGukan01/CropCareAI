const express = require('express');
const router = express.Router();
const { getCrops, getDiseases, getDiseaseById } = require('../controllers/libraryController');

// Crops
router.get('/crops', getCrops);

// Diseases
router.get('/diseases', getDiseases);
router.get('/diseases/:id', getDiseaseById);

module.exports = router;
