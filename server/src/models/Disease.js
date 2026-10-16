const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  symptoms: [{ type: String }],
  causes: [{ type: String }],
  prevention: [{ type: String }],
  organicTreatment: [{ type: String }],
  chemicalTreatment: [{ type: String }],
  bestPractices: [{ type: String }],
  severityNote: { type: String }
}, { _id: false });

const diseaseSchema = new mongoose.Schema({
  crop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop',
    required: [true, 'Crop reference is required']
  },
  name: {
    type: String,
    required: [true, 'Disease name is required'],
    trim: true
  },
  classLabel: {
    type: String,
    required: [true, 'Model class label is required'],
    unique: true,
    trim: true
  },
  isHealthy: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  symptoms: [{
    type: String
  }],
  causes: [{
    type: String
  }],
  prevention: [{
    type: String
  }],
  organicTreatment: [{
    type: String
  }],
  chemicalTreatment: [{
    type: String
  }],
  bestPractices: [{
    type: String
  }],
  severityNote: {
    type: String,
    default: 'Moderate severity. Prompt monitoring and cultural sanitation recommended.'
  },
  translations: {
    en: translationSchema,
    ta: translationSchema,
    hi: translationSchema
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

diseaseSchema.index({ name: 'text', description: 'text', classLabel: 'text' });

module.exports = mongoose.model('Disease', diseaseSchema);
