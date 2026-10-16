const crypto = require('crypto');
const mongoose = require('mongoose');
const Prediction = require('../models/Prediction');
const Disease = require('../models/Disease');
const diseasesData = require('../seeds/data/diseasesData');
const cropsData = require('../seeds/data/cropsData');
const { processAndSaveOriginal, saveHeatmapBase64 } = require('../services/imageService');
const { classifyLeafImage } = require('../services/mlService');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const logger = require('../utils/logger');
const localHistoryService = require('../services/localHistoryService');

/**
 * @route   POST /api/v1/predict
 * @desc    Single crop leaf image classification (Two-stage pipeline)
 * @access  Public (Guest or Authenticated)
 */
const predictSingle = async (req, res, next) => {
  try {
    if (!req.file) {
      return sendError(res, 'No image file provided. Please upload a crop leaf image.', 400);
    }

    // 1. Preprocess and store original image
    const imagePath = await processAndSaveOriginal(req.file.buffer, req.file.originalname);

    // 2. Classify via ML Microservice (Two-Stage Pipeline)
    const mlResult = await classifyLeafImage(req.file.buffer, req.file.originalname);

    // Stage 1 Rejection Check: Stop immediately if irrelevant image
    if (mlResult.status === 'rejected' || mlResult.is_crop_leaf === false) {
      logger.info('Stage 1 validation rejected image: Crop Not Detected.');
      return sendError(
        res,
        'Crop Not Detected. Please upload a valid crop leaf image.',
        422,
        {
          isCropLeaf: false,
          status: 'rejected',
          reason: mlResult.message || 'Crop Not Detected. Please upload a valid crop leaf image.'
        }
      );
    }

    // 3. Save Grad-CAM Heatmap if returned
    let heatmapPath = null;
    if (mlResult.heatmap_base64) {
      heatmapPath = await saveHeatmapBase64(mlResult.heatmap_base64);
    }

    // 4. Match predicted class label with Disease metadata (with DB fallback)
    let matchedDisease = null;
    let prediction = null;

    if (mongoose.connection.readyState === 1) {
      try {
        matchedDisease = await Disease.findOne({ classLabel: mlResult.final_label }).populate('crop');
        prediction = await Prediction.create({
          user: req.user ? req.user._id : null,
          imagePath,
          heatmapPath,
          topPredictions: mlResult.top_predictions || [],
          finalLabel: mlResult.final_label,
          disease: matchedDisease ? matchedDisease._id : null,
          confidence: mlResult.confidence,
          status: mlResult.status || 'confident',
          shareToken: crypto.randomBytes(16).toString('hex')
        });

        const populated = await Prediction.findById(prediction._id).populate({
          path: 'disease',
          populate: { path: 'crop' }
        });
        if (populated) prediction = populated;
      } catch (dbErr) {
        logger.warn(`Database query failed, using in-memory fallback: ${dbErr.message}`);
      }
    }

    if (!matchedDisease) {
      const rawDisease = diseasesData.find((d) => d.classLabel === mlResult.final_label) || diseasesData[0];
      const rawCrop = cropsData.find((c) => c.name === rawDisease.cropName) || { name: rawDisease.cropName };
      matchedDisease = {
        _id: 'offline_' + Buffer.from(rawDisease.classLabel).toString('hex').slice(0, 12),
        ...rawDisease,
        crop: rawCrop
      };
    }

    if (!prediction) {
      prediction = {
        _id: 'pred_' + Date.now(),
        user: req.user ? req.user._id : null,
        imagePath,
        heatmapPath,
        topPredictions: mlResult.top_predictions || [],
        finalLabel: mlResult.final_label,
        disease: matchedDisease,
        confidence: mlResult.confidence,
        status: mlResult.status || 'confident',
        shareToken: crypto.randomBytes(16).toString('hex'),
        createdAt: new Date().toISOString()
      };
    }

    // Persist to local history store for resilient offline and guest retrieval
    try {
      localHistoryService.addRecord({
        ...JSON.parse(JSON.stringify(prediction)),
        disease: matchedDisease
      });
    } catch (histErr) {
      logger.warn(`Could not save to local history: ${histErr.message}`);
    }

    return sendSuccess(
      res,
      {
        prediction,
        disease: matchedDisease,
        mlInfo: {
          isCropLeaf: true,
          validationConfidence: mlResult.validation_confidence,
          isConfident: mlResult.is_confident !== false,
          status: mlResult.status,
          message: mlResult.message,
          isStub: mlResult.is_stub || false
        }
      },
      'Leaf classification completed successfully.'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/v1/predict/batch
 * @desc    Batch analysis of up to 5 crop leaf images
 * @access  Public (Guest or Authenticated)
 */
const predictBatch = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return sendError(res, 'No images provided for batch prediction. Please upload 1 to 5 images.', 400);
    }

    if (req.files.length > 5) {
      return sendError(res, 'Maximum of 5 images allowed per batch submission.', 400);
    }

    const batchId = crypto.randomUUID();
    const results = [];
    let healthyCount = 0;
    let diseasedCount = 0;
    let rejectedCount = 0;
    const diseaseFrequency = {};

    for (const file of req.files) {
      try {
        const imagePath = await processAndSaveOriginal(file.buffer, file.originalname);
        const mlResult = await classifyLeafImage(file.buffer, file.originalname);

        // Stage 1 Rejection Check
        if (mlResult.status === 'rejected' || mlResult.is_crop_leaf === false) {
          logger.info(`Batch file ${file.originalname} rejected at Stage 1: Crop Not Detected.`);
          rejectedCount++;
          results.push({
            predictionId: null,
            imagePath,
            heatmapPath: null,
            isCropLeaf: false,
            status: 'rejected',
            finalLabel: null,
            confidence: 0,
            disease: null,
            topPredictions: [],
            message: 'Crop Not Detected. Please upload a valid crop leaf image.'
          });
          continue;
        }

        let heatmapPath = null;
        if (mlResult.heatmap_base64) {
          heatmapPath = await saveHeatmapBase64(mlResult.heatmap_base64);
        }

        let matchedDisease = null;
        let prediction = null;

        if (mongoose.connection.readyState === 1) {
          try {
            matchedDisease = await Disease.findOne({ classLabel: mlResult.final_label }).populate('crop');
            prediction = await Prediction.create({
              user: req.user ? req.user._id : null,
              batchId,
              imagePath,
              heatmapPath,
              topPredictions: mlResult.top_predictions || [],
              finalLabel: mlResult.final_label,
              disease: matchedDisease ? matchedDisease._id : null,
              confidence: mlResult.confidence,
              status: mlResult.status || 'confident',
              shareToken: crypto.randomBytes(16).toString('hex')
            });
          } catch (dbErr) {
            logger.warn(`Batch database operation failed, using in-memory fallback: ${dbErr.message}`);
          }
        }

        if (!matchedDisease) {
          const rawDisease = diseasesData.find((d) => d.classLabel === mlResult.final_label) || diseasesData[0];
          const rawCrop = cropsData.find((c) => c.name === rawDisease.cropName) || { name: rawDisease.cropName };
          matchedDisease = {
            _id: 'offline_' + Buffer.from(rawDisease.classLabel).toString('hex').slice(0, 12),
            ...rawDisease,
            crop: rawCrop
          };
        }

        const isHealthy = matchedDisease ? matchedDisease.isHealthy : (mlResult.final_label || '').toLowerCase().includes('healthy');
        if (isHealthy) {
          healthyCount++;
        } else {
          diseasedCount++;
          const diseaseName = matchedDisease ? (matchedDisease.name || mlResult.final_label) : mlResult.final_label;
          diseaseFrequency[diseaseName] = (diseaseFrequency[diseaseName] || 0) + 1;
        }

        results.push({
          predictionId: prediction ? prediction._id : 'pred_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
          imagePath,
          heatmapPath,
          isCropLeaf: true,
          finalLabel: mlResult.final_label,
          confidence: mlResult.confidence,
          status: mlResult.status || 'confident',
          disease: matchedDisease,
          topPredictions: mlResult.top_predictions || []
        });
      } catch (fileErr) {
        logger.error(`Error processing batch file ${file.originalname}: ${fileErr.message}`);
        results.push({
          predictionId: null,
          imagePath: null,
          heatmapPath: null,
          isCropLeaf: false,
          status: 'error',
          finalLabel: null,
          confidence: 0,
          disease: null,
          topPredictions: [],
          message: `Error analyzing ${file.originalname}: ${fileErr.message}`
        });
      }
    }

    // Determine most common disease
    let mostCommonDisease = 'None';
    let maxFreq = 0;
    for (const [name, count] of Object.entries(diseaseFrequency)) {
      if (count > maxFreq) {
        maxFreq = count;
        mostCommonDisease = name;
      }
    }

    const summary = {
      batchId,
      totalAnalyzed: results.length,
      validCropsCount: results.length - rejectedCount,
      rejectedCount,
      healthyCount,
      diseasedCount,
      mostCommonDisease
    };

    return sendSuccess(
      res,
      {
        batchId,
        summary,
        results
      },
      `Batch processing complete. Analyzed ${results.length} leaf images (${rejectedCount} rejected).`
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  predictSingle,
  predictBatch
};
