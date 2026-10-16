const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Prediction = require('../models/Prediction');
const Disease = require('../models/Disease');
const { generatePredictionPdf } = require('../services/pdfService');
const localHistoryService = require('../services/localHistoryService');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const logger = require('../utils/logger');

/**
 * @route   GET /api/v1/predictions
 * @desc    Get user's prediction history with search & filters
 * @access  Private
 */
const getPredictions = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '10', 10);
    const skip = (page - 1) * limit;

    if (mongoose.connection.readyState === 1) {
      try {
        const query = req.user ? { user: req.user._id } : {};

        if (req.query.status) {
          query.status = req.query.status;
        }

        if (req.query.startDate || req.query.endDate) {
          query.createdAt = {};
          if (req.query.startDate) query.createdAt.$gte = new Date(req.query.startDate);
          if (req.query.endDate) query.createdAt.$lte = new Date(req.query.endDate);
        }

        if (req.query.search) {
          const regex = new RegExp(req.query.search, 'i');
          query.finalLabel = regex;
        }

        const total = await Prediction.countDocuments(query);
        const predictions = await Prediction.find(query)
          .populate({
            path: 'disease',
            populate: { path: 'crop' }
          })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit);

        if (predictions && predictions.length > 0) {
          return sendSuccess(res, {
            predictions,
            pagination: {
              total,
              page,
              limit,
              pages: Math.ceil(total / limit)
            }
          });
        }
      } catch (dbErr) {
        logger.warn(`Database query failed in getPredictions: ${dbErr.message}`);
      }
    }

    // Resilient fallback: read from local history store
    const localResult = localHistoryService.getRecords({
      userId: req.user ? req.user._id : null,
      page,
      limit,
      status: req.query.status,
      search: req.query.search
    });

    return sendSuccess(res, localResult);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/v1/predictions/:id
 * @desc    Get specific prediction details
 * @access  Private (Owner or Admin)
 */
const getPredictionById = async (req, res, next) => {
  try {
    let prediction = null;

    if (mongoose.connection.readyState === 1) {
      try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
          prediction = await Prediction.findById(req.params.id)
            .populate({
              path: 'disease',
              populate: { path: 'crop' }
            });
        }

        if (!prediction) {
          prediction = await Prediction.findOne({ shareToken: req.params.id })
            .populate({
              path: 'disease',
              populate: { path: 'crop' }
            });
        }
      } catch (dbErr) {
        logger.warn(`DB lookup failed in getPredictionById: ${dbErr.message}`);
      }
    }

    if (!prediction) {
      prediction = localHistoryService.getRecordById(req.params.id);
    }

    if (!prediction) {
      return sendError(res, 'Prediction record not found.', 404);
    }

    // Access control
    if (prediction.user && req.user && prediction.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return sendError(res, 'Not authorized to view this prediction record.', 403);
    }

    return sendSuccess(res, prediction);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/v1/predictions/:id
 * @desc    Delete prediction and associated stored images
 * @access  Private (Owner or Admin)
 */
const deletePrediction = async (req, res, next) => {
  try {
    let prediction = null;

    if (mongoose.connection.readyState === 1) {
      try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
          prediction = await Prediction.findById(req.params.id);
        }
      } catch (dbErr) {
        logger.warn(`DB delete lookup error: ${dbErr.message}`);
      }
    }

    if (!prediction) {
      prediction = localHistoryService.getRecordById(req.params.id);
    }

    if (!prediction) {
      return sendError(res, 'Prediction record not found.', 404);
    }

    if (prediction.user && req.user && prediction.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return sendError(res, 'Not authorized to delete this prediction record.', 403);
    }

    // Remove local image files
    const rootDir = path.join(__dirname, '..', '..');
    if (prediction.imagePath) {
      const fullPath = path.join(rootDir, prediction.imagePath);
      if (fs.existsSync(fullPath)) {
        try { fs.unlinkSync(fullPath); } catch (_) {}
      }
    }
    if (prediction.heatmapPath) {
      const fullPath = path.join(rootDir, prediction.heatmapPath);
      if (fs.existsSync(fullPath)) {
        try { fs.unlinkSync(fullPath); } catch (_) {}
      }
    }

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(req.params.id)) {
      try {
        await Prediction.findByIdAndDelete(req.params.id);
      } catch (_) {}
    }

    localHistoryService.deleteRecord(req.params.id);

    return sendSuccess(res, null, 'Prediction record deleted successfully.');
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/v1/predictions/:id/report
 * @desc    Generate and download PDF diagnostic report
 * @access  Public / Private
 */
const downloadPredictionReport = async (req, res, next) => {
  try {
    let prediction = null;

    if (mongoose.connection.readyState === 1) {
      try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
          prediction = await Prediction.findById(req.params.id).populate({
            path: 'disease',
            populate: { path: 'crop' }
          });
        }

        if (!prediction) {
          prediction = await Prediction.findOne({ shareToken: req.params.id }).populate({
            path: 'disease',
            populate: { path: 'crop' }
          });
        }
      } catch (dbErr) {
        logger.warn(`DB lookup in downloadPredictionReport: ${dbErr.message}`);
      }
    }

    if (!prediction) {
      prediction = localHistoryService.getRecordById(req.params.id);
    }

    if (!prediction) {
      return sendError(res, 'Prediction not found for report generation.', 404);
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="crop-disease-report-${prediction._id}.pdf"`
    );

    await generatePredictionPdf(prediction, prediction.disease, res);
  } catch (error) {
    logger.error(`PDF generation failed: ${error.message}`);
    next(error);
  }
};

/**
 * @route   GET /api/v1/share/:token
 * @desc    Get prediction by public share token
 * @access  Public
 */
const getSharedPrediction = async (req, res, next) => {
  try {
    let prediction = null;

    if (mongoose.connection.readyState === 1) {
      try {
        prediction = await Prediction.findOne({ shareToken: req.params.token })
          .populate({
            path: 'disease',
            populate: { path: 'crop' }
          });
      } catch (dbErr) {
        logger.warn(`DB lookup in getSharedPrediction: ${dbErr.message}`);
      }
    }

    if (!prediction) {
      prediction = localHistoryService.getRecordById(req.params.token);
    }

    if (!prediction) {
      return sendError(res, 'Shared prediction link is invalid or has expired.', 404);
    }

    return sendSuccess(res, prediction, 'Shared prediction retrieved.');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPredictions,
  getPredictionById,
  deletePrediction,
  downloadPredictionReport,
  getSharedPrediction
};
