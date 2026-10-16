const mongoose = require('mongoose');
const crypto = require('crypto');

const predictionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  batchId: {
    type: String,
    default: null,
    index: true
  },
  imagePath: {
    type: String,
    required: [true, 'Original image path is required']
  },
  heatmapPath: {
    type: String,
    default: null
  },
  topPredictions: [{
    label: { type: String, required: true },
    confidence: { type: Number, required: true }
  }],
  finalLabel: {
    type: String,
    required: [true, 'Final classification label is required']
  },
  disease: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Disease',
    default: null
  },
  confidence: {
    type: Number,
    required: [true, 'Confidence score is required']
  },
  status: {
    type: String,
    enum: ['confident', 'uncertain'],
    default: 'confident'
  },
  shareToken: {
    type: String,
    unique: true,
    default: () => crypto.randomBytes(16).toString('hex')
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

module.exports = mongoose.model('Prediction', predictionSchema);
