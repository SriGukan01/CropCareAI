const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { submitFeedback } = require('../controllers/feedbackController');
const { optionalProtect } = require('../middleware/auth');
const { validate } = require('../middleware/validator');

router.post(
  '/',
  optionalProtect,
  [
    body('predictionId').isMongoId().withMessage('Valid predictionId is required'),
    body('isCorrect').isBoolean().withMessage('isCorrect must be boolean (true/false)'),
    validate
  ],
  submitFeedback
);

module.exports = router;
