const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const User = require('../models/User');
const Crop = require('../models/Crop');
const Disease = require('../models/Disease');
const Prediction = require('../models/Prediction');
const Feedback = require('../models/Feedback');

describe('CropCare AI Server API Test Suite', () => {
  jest.setTimeout(120000);
  let authToken = '';
  let userId = '';
  let samplePredictionId = '';

  beforeAll(async () => {
    // In-memory or test database connection
    const testMongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/crop_disease_test_db';
    try {
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(testMongoUri, { serverSelectionTimeoutMS: 4000 });
      }
    } catch (e) {
      // Allow test suite to run in offline / fallback mode
    }
  });

  afterAll(async () => {
    // Cleanup test collections
    try {
      if (mongoose.connection.readyState === 1) {
        await User.deleteMany({ email: 'testfarmer@cropcare.ai' });
        await Prediction.deleteMany({ finalLabel: 'Tomato___Early_blight_Test' });
      }
      await mongoose.connection.close();
    } catch (e) {
      // Ignore cleanup error
    }
  });

  describe('1. Root & Health Check', () => {
    it('GET / should return online status and links', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('online');
    });
  });

  describe('2. Authentication Endpoints', () => {
    it('POST /api/v1/auth/register should create a new user and return JWT', async () => {
      // Cleanup previous run if any
      await User.deleteOne({ email: 'testfarmer@cropcare.ai' });

      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Test Farmer',
          email: 'testfarmer@cropcare.ai',
          password: 'Password123!',
          preferredLanguage: 'ta'
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.token).toBeDefined();
      expect(res.body.data.user.email).toEqual('testfarmer@cropcare.ai');

      authToken = res.body.data.token;
      userId = res.body.data.user.id;
    });

    it('POST /api/v1/auth/login should authenticate user with valid credentials', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'testfarmer@cropcare.ai',
          password: 'Password123!'
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.token).toBeDefined();
    });

    it('GET /api/v1/auth/me should return current user profile with valid token', async () => {
      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.data.user.email).toEqual('testfarmer@cropcare.ai');
    });
  });

  describe('3. Prediction Endpoint (Mock / Fallback ML)', () => {
    it('POST /api/v1/predict without image should return 400', async () => {
      const res = await request(app).post('/api/v1/predict');
      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(false);
    });

    it('POST /api/v1/predict with irrelevant image should reject with 422 and "Crop Not Detected"', async () => {
      const sharp = require('sharp');
      const irrelevantBuffer = await sharp({
        create: {
          width: 200,
          height: 200,
          channels: 3,
          background: { r: 128, g: 128, b: 128 } // Solid grey
        }
      }).jpeg().toBuffer();

      const res = await request(app)
        .post('/api/v1/predict')
        .set('Authorization', `Bearer ${authToken}`)
        .attach('image', irrelevantBuffer, 'metal.jpg');

      expect(res.statusCode).toEqual(422);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toEqual('Crop Not Detected. Please upload a valid crop leaf image.');
      expect(res.body.errors?.isCropLeaf).toBe(false);
    });

    it('POST /api/v1/predict with valid crop leaf image should process and store prediction', async () => {
      const sharp = require('sharp');
      const fs = require('fs');
      const path = require('path');
      const samplePath = path.resolve(__dirname, '../../../client/public/samples/apple_healthy.jpg');

      let leafBuffer;
      if (fs.existsSync(samplePath)) {
        leafBuffer = fs.readFileSync(samplePath);
      } else {
        leafBuffer = await sharp({
          create: {
            width: 224,
            height: 224,
            channels: 3,
            background: { r: 34, g: 139, b: 34 } // Forest green
          }
        }).jpeg().toBuffer();
      }

      const res = await request(app)
        .post('/api/v1/predict')
        .set('Authorization', `Bearer ${authToken}`)
        .attach('image', leafBuffer, 'apple_healthy.jpg');

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.prediction).toBeDefined();
      expect(res.body.data.prediction.finalLabel).toBeDefined();
      expect(res.body.data.prediction.shareToken).toBeDefined();
      expect(res.body.data.mlInfo.isCropLeaf).toBe(true);

      samplePredictionId = res.body.data.prediction._id;
    });
  });

  describe('4. Feedback Loop Endpoints', () => {
    it('POST /api/v1/feedback should save user correctness feedback', async () => {
      if (!samplePredictionId) return;

      const res = await request(app)
        .post('/api/v1/feedback')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          predictionId: samplePredictionId,
          isCorrect: true,
          notes: 'Accurate spot detection on leaves'
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.isCorrect).toBe(true);
    });
  });

  describe('5. Library Endpoints', () => {
    it('GET /api/v1/crops should return an array of crops', async () => {
      const res = await request(app).get('/api/v1/crops');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('GET /api/v1/diseases should return an array of diseases', async () => {
      const res = await request(app).get('/api/v1/diseases');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });
});
