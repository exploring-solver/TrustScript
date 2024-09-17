const express = require('express');
const router = express.Router();
const DocumentController = require('../controllers/DocumentController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/issue', protect, DocumentController.issueDocument);
router.get('/:id', protect, DocumentController.getDocument);
router.get('/user/:userId', protect, DocumentController.getUserDocuments);

module.exports = router;
