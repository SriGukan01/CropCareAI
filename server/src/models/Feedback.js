const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  prediction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prediction',
    required: [true, 'Prediction reference is required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  isCorrect: {
    type: Boolean,
    required: [true, 'Correction status is required']
  },
  correctedLabel: {
    type: String,
    trim: true,
    default: null
  },
  notes: {
    type: String,
    trim: true,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
