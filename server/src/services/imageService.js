const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');
const logger = require('../utils/logger');

const UPLOADS_ROOT = path.join(__dirname, '..', '..', 'uploads');
const ORIGINALS_DIR = path.join(UPLOADS_ROOT, 'original');
const HEATMAPS_DIR = path.join(UPLOADS_ROOT, 'heatmaps');

// Ensure directories exist
fs.mkdirSync(ORIGINALS_DIR, { recursive: true });
fs.mkdirSync(HEATMAPS_DIR, { recursive: true });

/**
 * Preprocesses and stores uploaded leaf image buffer using Sharp.
 */
const processAndSaveOriginal = async (fileBuffer, originalName = 'leaf.jpg') => {
  const fileHash = crypto.randomBytes(8).toString('hex');
  const filename = `${Date.now()}_${fileHash}.jpg`;
  const targetPath = path.join(ORIGINALS_DIR, filename);

  try {
    await sharp(fileBuffer)
      .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85, progressive: true })
      .toFile(targetPath);

    logger.info(`Saved preprocessed original image to ${targetPath}`);
    return `/uploads/original/${filename}`;
  } catch (error) {
    logger.error(`Sharp image processing failed: ${error.message}`);
    // Fallback direct write
    fs.writeFileSync(targetPath, fileBuffer);
    return `/uploads/original/${filename}`;
  }
};

/**
 * Decodes base64 Grad-CAM overlay and saves to disk.
 */
const saveHeatmapBase64 = async (heatmapB64) => {
  if (!heatmapB64) return null;

  try {
    const base64Data = heatmapB64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const fileHash = crypto.randomBytes(8).toString('hex');
    const filename = `heatmap_${Date.now()}_${fileHash}.jpg`;
    const targetPath = path.join(HEATMAPS_DIR, filename);

    await sharp(buffer)
      .jpeg({ quality: 85 })
      .toFile(targetPath);

    return `/uploads/heatmaps/${filename}`;
  } catch (error) {
    logger.error(`Failed to save heatmap image: ${error.message}`);
    return null;
  }
};

module.exports = {
  UPLOADS_ROOT,
  ORIGINALS_DIR,
  HEATMAPS_DIR,
  processAndSaveOriginal,
  saveHeatmapBase64
};
