const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/create-individual', protect, AuthController.createIndividualUser);
router.get('/individuals', AuthController.getIndividuals);
router.get('/issuers', AuthController.getIssuers);
router.get('/verifiers', AuthController.getVerifiers);

module.exports = router;
