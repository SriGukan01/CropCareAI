const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Crop name is required'],
    unique: true,
    trim: true
  },
  translations: {
    en: {
      name: { type: String, required: true }
    },
    ta: {
      name: { type: String, required: true }
    },
    hi: {
      name: { type: String, required: true }
    }
  },
  imageUrl: {
    type: String,
    default: '/images/crops/default.jpg'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Crop', cropSchema);
