const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');


router.post('/certificates', authenticateUser, authorizeRole(['issuer']), certificateController.issueCertificate);
router.get('/certificates', authenticateUser, certificateController.getCertificates);

module.exports = router;