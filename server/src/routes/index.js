const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const predictRoutes = require('./predictRoutes');
const predictionRoutes = require('./predictionRoutes');
const feedbackRoutes = require('./feedbackRoutes');
const libraryRoutes = require('./libraryRoutes');
const adminRoutes = require('./adminRoutes');
const { getSharedPrediction } = require('../controllers/predictionController');

// Mount routes under /api/v1
router.use('/auth', authRoutes);
router.use('/predict', predictRoutes);
router.use('/predictions', predictionRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/', libraryRoutes);
router.use('/admin', adminRoutes);

// Direct public share endpoint
router.get('/share/:token', getSharedPrediction);

module.exports = router;
