const path = require('path');
const fs = require('fs');
const { execFile } = require('child_process');
const util = require('util');
const axios = require('axios');
const FormData = require('form-data');
const sharp = require('sharp');
const logger = require('../utils/logger');

const execFilePromise = util.promisify(execFile);
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://127.0.0.1:8000';

/**
 * Checks whether an image buffer exhibits botanical foliage characteristics
 */
const checkFoliageBuffer = async (buffer) => {
  try {
    const stats = await sharp(buffer).stats();
    const channels = stats.channels; // [R, G, B]
    if (!channels || channels.length < 3) return false;

    const rMean = channels[0].mean;
    const gMean = channels[1].mean;
    const bMean = channels[2].mean;
    const stdDev = (channels[0].stdev + channels[1].stdev + channels[2].stdev) / 3;

    // Reject flat/blank/uniform images
    if (stdDev < 12.0) return false;

    // Reject blue-dominant images (sky, blue clothes, ID cards)
    if (bMean > gMean && bMean > rMean) return false;

    // Excess Green (2G - R - B)
    const exg = 2 * gMean - rMean - bMean;
    // Yellow-Brown lesion ratio
    const yellowBrown = (rMean + gMean) / (2 * bMean + 1);

    // Genuine plant foliage requires positive excess green or rich yellow-brown necrotic lesion
    if (exg > 15.0 || (yellowBrown > 1.35 && gMean > 50 && rMean > 50)) {
      return true;
    }

    return false;
  } catch (e) {
    return false;
  }
};

/**
 * Fallback to run Python ML validator & Hugging Face model directly via CLI
 * if Flask microservice on port 8000 is temporarily offline.
 */
const runCliClassification = async (fileBuffer, originalFilename) => {
  const tmpDir = path.join(__dirname, '../../uploads/tmp');
  try {
    fs.mkdirSync(tmpDir, { recursive: true });
  } catch (e) {}

  const ext = path.extname(originalFilename) || '.jpg';
  const tmpFile = path.join(tmpDir, `scan_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${ext}`);

  try {
    fs.writeFileSync(tmpFile, fileBuffer);
    const cliScript = path.resolve(__dirname, '../../../ml-service/validator_cli.py');

    logger.info(`Running direct Python ML CLI pipeline on ${tmpFile}...`);
    let outputText = '';
    try {
      const { stdout } = await execFilePromise('python', [cliScript, tmpFile], {
        timeout: 50000,
        maxBuffer: 10 * 1024 * 1024
      });
      outputText = stdout;
    } catch (execErr) {
      outputText = execErr.stdout || '';
      logger.error(`CLI execution error: ${execErr.message}`);
    }
    
    // Parse last valid JSON line
    const lines = outputText.trim().split('\n');
    let parsed = null;
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i].trim();
      if (line.startsWith('{') && line.endsWith('}')) {
        try {
          parsed = JSON.parse(line);
          break;
        } catch (je) {}
      }
    }

    if (parsed) {
      logger.info(`CLI classification returned: ${parsed.status} (leaf=${parsed.is_crop_leaf})`);
      return parsed;
    }
  } catch (err) {
    logger.error(`CLI pipeline exception: ${err.message}`);
  } finally {
    try {
      if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
    } catch (e) {}
  }

  // If Python execution fails, check native foliage check to reject non-crops
  const isFoliage = await checkFoliageBuffer(fileBuffer);
  if (!isFoliage) {
    return {
      status: 'rejected',
      is_crop_leaf: false,
      validation_confidence: 0.0,
      message: 'Crop Not Detected. Please upload a valid crop leaf image.'
    };
  }

  // Strictly no simulated diagnoses permitted
  throw new Error('ML classification service unavailable. Disease diagnosis cannot be performed.');
};

/**
 * Sends image buffer to Flask CNN microservice for two-stage classification & Grad-CAM generation.
 * Falls back to direct CLI execution if Flask service is temporarily down.
 */
const classifyLeafImage = async (fileBuffer, originalFilename = 'leaf.jpg') => {
  try {
    const formData = new FormData();
    formData.append('file', fileBuffer, {
      filename: originalFilename,
      contentType: 'image/jpeg'
    });

    logger.info(`Forwarding leaf image to ML Microservice at ${ML_SERVICE_URL}/predict...`);
    const response = await axios.post(`${ML_SERVICE_URL}/predict`, formData, {
      headers: {
        ...formData.getHeaders()
      },
      timeout: 25000 // 25s timeout
    });

    if (response.data) {
      if (response.data.status === 'rejected' || response.data.is_crop_leaf === false) {
        logger.info(`Stage 1 rejected image: ${response.data.message}`);
        return {
          status: 'rejected',
          is_crop_leaf: false,
          validation_confidence: response.data.validation_confidence || 0,
          message: response.data.message || 'Crop Not Detected. Please upload a valid crop leaf image.'
        };
      }

      if (response.data.final_label) {
        logger.info(`Received Stage 2 ML prediction: ${response.data.final_label} (${response.data.confidence})`);
        return response.data;
      }
    }

    throw new Error('ML microservice returned unexpected response structure.');
  } catch (error) {
    if (error.response?.data?.status === 'rejected' || error.response?.data?.is_crop_leaf === false) {
      return {
        status: 'rejected',
        is_crop_leaf: false,
        message: error.response.data.message || 'Crop Not Detected. Please upload a valid crop leaf image.'
      };
    }

    logger.warn(`ML service HTTP communication error (${error.message}). Engaging resilient Python CLI classifier.`);
    return await runCliClassification(fileBuffer, originalFilename);
  }
};

module.exports = {
  classifyLeafImage,
  checkFoliageBuffer
};
