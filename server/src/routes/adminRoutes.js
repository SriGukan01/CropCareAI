const express = require('express');
const router = express.Router();
const {
  getAdminStats,
  createCrop,
  updateCrop,
  deleteCrop,
  createDisease,
  updateDisease,
  deleteDisease,
  getFeedbackList,
  exportFeedbackDataset
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// All routes require Admin role
router.use(protect, authorize('admin'));

// Analytics Stats
router.get('/stats', getAdminStats);

// Crop CRUD
router.post('/crops', createCrop);
router.put('/crops/:id', updateCrop);
router.delete('/crops/:id', deleteCrop);

// Disease CRUD
router.post('/diseases', createDisease);
router.put('/diseases/:id', updateDisease);
router.delete('/diseases/:id', deleteDisease);

// Feedback Management & Dataset Export
router.get('/feedback', getFeedbackList);
router.get('/feedback/export', exportFeedbackDataset);

module.exports = router;
