const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
require('dotenv').config(); // Fallback to root or cwd .env
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const connectDB = require('./config/db');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const { setupSwagger } = require('./config/swagger');
const { cleanupOldUploads } = require('./services/cleanupService');
const logger = require('./utils/logger');

const app = express();

// Connect Database
connectDB();

// Security & Utility Middleware
app.use(helmet({
  crossOriginResourcePolicy: false // Allow loading images across frontend port
}));

const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
const allowedOrigins = [
  clientUrl,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      /^http:\/\/(localhost|127\.0\.0\.1|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+)(:\d+)?$/.test(origin)
    ) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Static serve for uploaded images (originals and heatmaps)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Swagger API Documentation
setupSwagger(app);

// Mount API v1 Routes
app.use('/api/v1', routes);

// Root Healthcheck
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'Crop Disease Prediction API',
    version: '1.0.0',
    docs: '/api/docs',
    endpoints: '/api/v1'
  });
});

// Centralized Error Handling
app.use(errorHandler);

// Periodic cleanup of older uploaded images (every 24 hours, non-test mode)
if (process.env.NODE_ENV !== 'test') {
  const cleanupTimer = setInterval(cleanupOldUploads, 24 * 60 * 60 * 1000);
  if (cleanupTimer.unref) cleanupTimer.unref();
}

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    logger.info(`API Docs available at http://localhost:${PORT}/api/docs`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      logger.error(`Port ${PORT} is already in use. Run 'npm run clean:ports' to free it.`);
      process.exit(1);
    } else {
      logger.error(`Server listen error: ${err.message}`);
    }
  });
}

module.exports = app;
