const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');
const { protect } = require('../middlewares/authMiddleware');


// router.post('/certificates', protect,
    //  authorizeRole(['issuer']),
    //  certificateController.issueCertificate);
router.get('/certificates', protect, certificateController.getCertificates);
router.post('/issue-certificate', protect, certificateController.issueCertificate);
router.get('/certificate/:id', protect, certificateController.getCertificateDetails);
module.exports = router;