const { sendError } = require('../utils/apiResponse');
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`Unhandled Error: ${err.message}`, { stack: err.stack, path: req.path });

  // If response headers have already been sent (e.g. streaming PDF/ZIP), delegate to default handler
  if (res.headersSent) {
    return next(err);
  }

  // Handle Mongoose Bad ObjectId
  if (err.name === 'CastError') {
    return sendError(res, `Resource not found with specified identifier: ${err.value}`, 404);
  }

  // Handle Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return sendError(res, `Duplicate field value entered: ${field} already exists.`, 400);
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return sendError(res, 'Database validation error', 400, messages);
  }

  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return sendError(res, 'File size exceeds maximum allowed limit of 5MB.', 400);
  }

  // General error fallback
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return sendError(res, message, statusCode);
};

module.exports = errorHandler;
