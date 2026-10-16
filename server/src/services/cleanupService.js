const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');
const { ORIGINALS_DIR, HEATMAPS_DIR } = require('./imageService');

const cleanupOldUploads = () => {
  const retentionDays = parseInt(process.env.UPLOAD_RETENTION_DAYS || '30', 10);
  if (retentionDays <= 0) return;

  const maxAgeMs = retentionDays * 24 * 60 * 60 * 1000;
  const now = Date.now();

  [ORIGINALS_DIR, HEATMAPS_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) return;

    fs.readdir(dir, (err, files) => {
      if (err) {
        logger.error(`Cleanup error reading directory ${dir}: ${err.message}`);
        return;
      }

      files.forEach((file) => {
        const filePath = path.join(dir, file);
        fs.stat(filePath, (statErr, stats) => {
          if (statErr) return;
          if (now - stats.mtimeMs > maxAgeMs) {
            fs.unlink(filePath, (unlinkErr) => {
              if (!unlinkErr) {
                logger.info(`Auto-deleted aged upload: ${file}`);
              }
            });
          }
        });
      });
    });
  });
};

module.exports = {
  cleanupOldUploads
};
