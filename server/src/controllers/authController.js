const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const generateToken = (id, role = 'user') => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'super_secure_jwt_secret_crop_disease_2026_dev', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new user
 * @access  Public
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password, preferredLanguage } = req.body;

    if (!name || !email || !password) {
      return sendError(res, 'Please provide name, email, and password.', 400);
    }

    if (mongoose.connection.readyState !== 1) {
      try {
        const localUserService = require('../services/localUserService');
        const user = await localUserService.createUser({
          name,
          email,
          password,
          preferredLanguage
        });
        const token = generateToken(user._id, user.role);
        return sendSuccess(
          res,
          {
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              preferredLanguage: user.preferredLanguage,
              createdAt: user.createdAt
            },
            token
          },
          'User registered successfully (Local fallback mode).',
          201
        );
      } catch (localErr) {
        return sendError(res, localErr.message || 'Registration failed.', 400);
      }
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return sendError(res, 'An account with this email address already exists.', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      preferredLanguage: preferredLanguage || 'en',
      role: 'user'
    });

    const token = generateToken(user._id);

    return sendSuccess(
      res,
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          preferredLanguage: user.preferredLanguage,
          createdAt: user.createdAt
        },
        token
      },
      'User registered successfully.',
      201
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/v1/auth/login
 * @desc    Authenticate user and get JWT
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 'Please provide email and password.', 400);
    }

    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@cropcare.ai').toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';

    // If database connection is down, allow offline admin login fallback
    if (mongoose.connection.readyState !== 1) {
      if (email.toLowerCase() === adminEmail && password === adminPassword) {
        const offlineAdminId = 'offline_admin_001';
        const token = generateToken(offlineAdminId, 'admin');
        return sendSuccess(
          res,
          {
            user: {
              id: offlineAdminId,
              name: process.env.ADMIN_NAME || 'Agricultural Admin',
              email: adminEmail,
              role: 'admin',
              preferredLanguage: 'en',
              createdAt: new Date().toISOString()
            },
            token
          },
          'Logged in successfully (Offline Admin mode).'
        );
      }

      // Check localUserService for previously registered local users
      try {
        const localUserService = require('../services/localUserService');
        const localUser = localUserService.findUserByEmail(email);
        if (localUser) {
          const match = await localUserService.verifyPassword(localUser, password);
          if (match) {
            const token = generateToken(localUser._id, localUser.role);
            return sendSuccess(
              res,
              {
                user: {
                  id: localUser._id,
                  name: localUser.name,
                  email: localUser.email,
                  role: localUser.role,
                  preferredLanguage: localUser.preferredLanguage,
                  createdAt: localUser.createdAt
                },
                token
              },
              'Logged in successfully (Local mode).'
            );
          }
          return sendError(res, 'Invalid credentials.', 401);
        }
      } catch (localLoginErr) {
        // Fall through to error
      }

      return sendError(
        res,
        'Database connection is currently unavailable. Please verify your MongoDB Atlas cluster connection or IP whitelist.',
        503
      );
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+passwordHash');
    if (!user) {
      return sendError(res, 'Invalid credentials.', 401);
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return sendError(res, 'Invalid credentials.', 401);
    }

    const token = generateToken(user._id, user.role);

    return sendSuccess(
      res,
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          preferredLanguage: user.preferredLanguage,
          createdAt: user.createdAt
        },
        token
      },
      'Logged in successfully.'
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Log out user
 * @access  Public
 */
const logout = async (req, res) => {
  return sendSuccess(res, null, 'Logged out successfully.');
};

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get currently logged in user profile
 * @access  Private
 */
const getMe = async (req, res) => {
  return sendSuccess(res, {
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      preferredLanguage: req.user.preferredLanguage,
      createdAt: req.user.createdAt
    }
  });
};

module.exports = {
  register,
  login,
  logout,
  getMe
};
