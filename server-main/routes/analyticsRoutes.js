const express = require('express');
const router = express.Router();
const AnalyticsController = require('../controllers/AnalyticsController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/documents', protect, AnalyticsController.getDocumentStats);
router.get('/verifications', protect, AnalyticsController.getVerificationStats);

module.exports = router;