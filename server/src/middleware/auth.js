const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const { sendError } = require('../utils/apiResponse');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return sendError(res, 'Not authorized. Please log in to access this resource.', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secure_jwt_secret_crop_disease_2026_dev');
    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(decoded.id).select('-passwordHash');
      if (!user) {
        return sendError(res, 'User associated with this token no longer exists.', 401);
      }
      req.user = user;
    } else {
      // Offline fallback: construct user object from verified JWT
      req.user = {
        _id: decoded.id,
        role: decoded.role || 'user',
        name: decoded.name || 'User',
        email: decoded.email || ''
      };
    }
    next();
  } catch (error) {
    return sendError(res, 'Invalid or expired authorization token.', 401);
  }
};

const optionalProtect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secure_jwt_secret_crop_disease_2026_dev');
    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(decoded.id).select('-passwordHash');
      req.user = user || null;
    } else {
      req.user = {
        _id: decoded.id,
        role: decoded.role || 'user',
        name: decoded.name || 'User',
        email: decoded.email || ''
      };
    }
  } catch (error) {
    req.user = null;
  }
  next();
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return sendError(res, `User role '${req.user ? req.user.role : 'guest'}' is not authorized to access this route.`, 403);
    }
    next();
  };
};

module.exports = {
  protect,
  optionalProtect,
  authorize
};
