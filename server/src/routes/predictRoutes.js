const express = require('express');
const router = express.Router();
const { predictSingle, predictBatch } = require('../controllers/predictController');
const { upload, validateMagicBytes } = require('../middleware/upload');
const { optionalProtect } = require('../middleware/auth');
const { predictLimiter } = require('../middleware/rateLimiter');

// POST /api/v1/predict (single image)
router.post(
  '/',
  predictLimiter,
  optionalProtect,
  upload.single('image'),
  validateMagicBytes,
  predictSingle
);

// POST /api/v1/predict/batch (max 5 images)
router.post(
  '/batch',
  predictLimiter,
  optionalProtect,
  upload.array('images', 5),
  validateMagicBytes,
  predictBatch
);

module.exports = router;
