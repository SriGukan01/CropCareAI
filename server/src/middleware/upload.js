const multer = require('multer');
const FileType = require('file-type');
const { sendError } = require('../utils/apiResponse');

// Use memory storage so we can validate magic bytes before writing to disk
const storage = multer.memoryStorage();

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format. Only JPEG, PNG, and WebP images are allowed.'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter
});

/**
 * Middleware to verify actual file magic bytes using file-type
 */
const validateMagicBytes = async (req, res, next) => {
  try {
    const files = req.files ? req.files : req.file ? [req.file] : [];

    if (files.length === 0) {
      return next();
    }

    for (const file of files) {
      const type = await FileType.fromBuffer(file.buffer);
      if (!type || !ALLOWED_MIME_TYPES.includes(type.mime)) {
        return sendError(
          res,
          `File ${file.originalname} failed security verification. Detected magic type: ${type ? type.mime : 'unknown'}. Only genuine JPEG, PNG, and WebP files are allowed.`,
          400
        );
      }
      // Attach verified mime & ext
      file.detectedMime = type.mime;
      file.detectedExt = type.ext;
    }

    next();
  } catch (error) {
    return sendError(res, `File validation error: ${error.message}`, 400);
  }
};

module.exports = {
  upload,
  validateMagicBytes
};
