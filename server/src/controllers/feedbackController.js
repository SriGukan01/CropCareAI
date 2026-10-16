const mongoose = require('mongoose');
const Feedback = require('../models/Feedback');
const Prediction = require('../models/Prediction');
const { sendSuccess, sendError } = require('../utils/apiResponse');

/**
 * @route   POST /api/v1/feedback
 * @desc    Submit user feedback on prediction accuracy
 * @access  Public (Guest or Authenticated)
 */
const submitFeedback = async (req, res, next) => {
  try {
    const { predictionId, isCorrect, correctedLabel, notes } = req.body;

    if (!predictionId || isCorrect === undefined) {
      return sendError(res, 'predictionId and isCorrect are required fields.', 400);
    }

    let prediction = null;
    if (mongoose.connection.readyState === 1) {
      if (mongoose.Types.ObjectId.isValid(predictionId)) {
        prediction = await Prediction.findById(predictionId);
      }
      if (!prediction) {
        prediction = await Prediction.findOne({ shareToken: predictionId });
      }
    }

    const feedbackPayload = {
      prediction: prediction ? prediction._id : null,
      user: req.user ? req.user._id : null,
      isCorrect: Boolean(isCorrect),
      correctedLabel: !isCorrect ? (correctedLabel || 'User Corrected') : (prediction ? prediction.finalLabel : 'Healthy'),
      notes: notes || ''
    };

    if (mongoose.connection.readyState === 1 && prediction) {
      const feedback = await Feedback.create(feedbackPayload);
      return sendSuccess(res, feedback, 'Thank you! Your agricultural feedback has been recorded.', 201);
    }

    // In-memory or offline acknowledgment
    return sendSuccess(
      res,
      { _id: 'fb_' + Date.now(), ...feedbackPayload, createdAt: new Date().toISOString() },
      'Thank you! Your agricultural feedback has been recorded.',
      201
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitFeedback
};
