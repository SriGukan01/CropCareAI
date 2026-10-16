const swaggerUi = require('swagger-ui-express');

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'CropCare AI API',
    version: '1.0.0',
    description: 'RESTful API documentation for AI-Driven Crop Disease Prediction Web App (MERN + Flask CNN microservice)',
    contact: {
      name: 'CropCare AI Engineering Team',
      email: 'support@cropcare.ai'
    }
  },
  servers: [
    {
      url: 'http://localhost:5000/api/v1',
      description: 'Local Development Server'
    }
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT bearer token in the format: Bearer <token>'
      }
    }
  },
  paths: {
    '/auth/register': {
      post: {
        summary: 'Register a new user',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                  name: { type: 'string', example: 'Farmer Rajesh' },
                  email: { type: 'string', example: 'rajesh@agrifarm.org' },
                  password: { type: 'string', example: 'SecretPass123' },
                  preferredLanguage: { type: 'string', enum: ['en', 'ta', 'hi'], example: 'en' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'User registered successfully' },
          400: { description: 'Validation error' }
        }
      }
    },
    '/auth/login': {
      post: {
        summary: 'Login user and obtain JWT',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', example: 'admin@cropcare.ai' },
                  password: { type: 'string', example: 'Admin@123456' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Logged in successfully with JWT token' },
          401: { description: 'Invalid credentials' }
        }
      }
    },
    '/predict': {
      post: {
        summary: 'Submit a single crop leaf image for CNN disease classification and Grad-CAM generation',
        tags: ['Prediction'],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  image: {
                    type: 'string',
                    format: 'binary',
                    description: 'Crop leaf photo (JPEG, PNG, or WebP; max 5MB)'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Prediction successful with confidence, Grad-CAM heatmap, and disease advice' },
          400: { description: 'Invalid file or non-leaf upload' }
        }
      }
    },
    '/predict/batch': {
      post: {
        summary: 'Analyze up to 5 crop leaf images in a single batch',
        tags: ['Prediction'],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  images: {
                    type: 'array',
                    items: { type: 'string', format: 'binary' },
                    description: '1 to 5 crop leaf photos'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Batch analysis complete with individual cards and summary' }
        }
      }
    },
    '/predictions': {
      get: {
        summary: 'Get prediction history for logged in user',
        tags: ['Prediction History'],
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
          { name: 'status', in: 'query', schema: { type: 'string' } },
          { name: 'search', in: 'query', schema: { type: 'string' } }
        ],
        responses: {
          200: { description: 'History list retrieved' }
        }
      }
    },
    '/predictions/{id}/report': {
      get: {
        summary: 'Download high-resolution branded PDF diagnostic report',
        tags: ['Prediction History'],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: {
          200: { description: 'Binary PDF document stream' }
        }
      }
    },
    '/feedback': {
      post: {
        summary: 'Submit user accuracy feedback (Correct / Wrong) for continual learning',
        tags: ['Feedback Loop'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['predictionId', 'isCorrect'],
                properties: {
                  predictionId: { type: 'string' },
                  isCorrect: { type: 'boolean' },
                  correctedLabel: { type: 'string' },
                  notes: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'Feedback recorded' }
        }
      }
    },
    '/crops': {
      get: {
        summary: 'List all supported botanical crops',
        tags: ['Disease Library'],
        responses: {
          200: { description: 'Array of crops' }
        }
      }
    },
    '/diseases': {
      get: {
        summary: 'Browse and search diseases across all crops',
        tags: ['Disease Library'],
        parameters: [
          { name: 'cropId', in: 'query', schema: { type: 'string' } },
          { name: 'search', in: 'query', schema: { type: 'string' } }
        ],
        responses: {
          200: { description: 'Array of diseases' }
        }
      }
    },
    '/admin/stats': {
      get: {
        summary: 'Get admin analytics KPIs and chart metrics',
        tags: ['Admin'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: 'Dashboard metrics' }
        }
      }
    },
    '/admin/feedback/export': {
      get: {
        summary: 'Export verified & corrected leaf images as a ZIP organized by class folder for model retraining',
        tags: ['Admin'],
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: 'ZIP file download' }
        }
      }
    }
  }
};

const setupSwagger = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

module.exports = {
  setupSwagger,
  swaggerDocument
};
