const mongoose = require('mongoose');
const Crop = require('../models/Crop');
const Disease = require('../models/Disease');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const cropsData = require('../seeds/data/cropsData');
const diseasesData = require('../seeds/data/diseasesData');

/**
 * @route   GET /api/v1/crops
 * @desc    Get all crops
 * @access  Public
 */
const getCrops = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        const crops = await Crop.find().sort({ name: 1 });
        if (crops && crops.length > 0) return sendSuccess(res, crops);
      } catch (err) {
        // Fall back to seed dataset
      }
    }
    // Fallback: return formatted crops from seed data
    const formattedCrops = cropsData.map((c, i) => ({
      _id: 'crop_' + i,
      name: c.name,
      scientificName: c.scientificName,
      description: c.description,
      imageUrl: c.imageUrl,
      translations: c.translations
    }));
    return sendSuccess(res, formattedCrops);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/v1/diseases
 * @desc    Get all diseases with crop and search filtering
 * @access  Public
 */
const getDiseases = async (req, res, next) => {
  try {
    const { cropId, search, isHealthy } = req.query;

    if (mongoose.connection.readyState === 1) {
      try {
        const query = {};
        if (cropId) query.crop = cropId;
        if (isHealthy !== undefined) query.isHealthy = isHealthy === 'true';
        if (search) {
          const regex = new RegExp(search, 'i');
          query.$or = [{ name: regex }, { description: regex }, { classLabel: regex }];
        }
        const diseases = await Disease.find(query).populate('crop').sort({ name: 1 });
        if (diseases && diseases.length > 0) return sendSuccess(res, diseases);
      } catch (err) {
        // Fall back to seed dataset
      }
    }

    // Fallback: filter seed dataset
    let filtered = diseasesData;
    if (isHealthy !== undefined) {
      const boolVal = isHealthy === 'true';
      filtered = filtered.filter((d) => d.isHealthy === boolVal);
    }
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.name.toLowerCase().includes(s) ||
          d.description.toLowerCase().includes(s) ||
          d.classLabel.toLowerCase().includes(s)
      );
    }
    const formatted = filtered.map((d, i) => ({
      _id: 'dis_' + i,
      ...d,
      crop: { name: d.cropName }
    }));
    return sendSuccess(res, formatted);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/v1/diseases/:id
 * @desc    Get full details for a disease
 * @access  Public
 */
const getDiseaseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let disease = null;

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(id)) {
      try {
        disease = await Disease.findById(id).populate('crop');
      } catch (err) {
        // Fall back to seed search below
      }
    }

    if (!disease) {
      // Try to find in diseasesData by matching _id (e.g. 'dis_0' or 'offline_...'), classLabel, or name
      const found = diseasesData.find((d, idx) => 
        id === `dis_${idx}` ||
        id === ('offline_' + Buffer.from(d.classLabel).toString('hex').slice(0, 12)) ||
        d.classLabel === id ||
        d.name.toLowerCase() === id.toLowerCase() ||
        d._id === id
      );

      if (found) {
        const crop = cropsData.find(c => c.name === found.cropName) || { name: found.cropName };
        disease = {
          _id: id,
          ...found,
          crop
        };
      }
    }

    if (!disease) {
      return sendError(res, 'Disease not found.', 404);
    }
    return sendSuccess(res, disease);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCrops,
  getDiseases,
  getDiseaseById
};
