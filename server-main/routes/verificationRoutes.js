const express = require('express');
const router = express.Router();
const VerificationController = require('../controllers/VerificationController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/verify', protect, VerificationController.verifyDocument);
router.get('/status/:id', protect, VerificationController.getVerificationStatus);

module.exports = router;