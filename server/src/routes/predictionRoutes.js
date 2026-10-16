const express = require('express');
const router = express.Router();
const {
  getPredictions,
  getPredictionById,
  deletePrediction,
  downloadPredictionReport,
  getSharedPrediction
} = require('../controllers/predictionController');
const { protect, optionalProtect } = require('../middleware/auth');

// Prediction history (User or Guest with local storage)
router.get('/', optionalProtect, getPredictions);
router.get('/:id', optionalProtect, getPredictionById);
router.delete('/:id', optionalProtect, deletePrediction);

// PDF Report generation
router.get('/:id/report', downloadPredictionReport);

// Public share token route: GET /api/v1/share/:token (configured in index.js or mounted here)
router.get('/share/:token', getSharedPrediction);

module.exports = router;
