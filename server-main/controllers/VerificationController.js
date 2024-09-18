const Certificate = require('../models/Certificate');
const Verification = require('../models/Verification');
const { verifyBlockchainHash, retrieveFromBlockchain } = require('../utils/blockchain');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { performMLCheck } = require('../utils/mlCheck');

exports.verifyCertificate = [
  upload.single('file'),
  async (req, res) => {
    try {
      const { certificateId } = req.body;
      const verifierId = req.user.id;
      const file = req.file;
      const useMLCheck = false;
      if (useMLCheck) {
        mlCheckResult = await performMLCheck(certificate);
      }
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const certificate = await Certificate.findById(certificateId);
      if (!certificate) {
        return res.status(404).json({ error: 'Certificate not found' });
      }

      // Generate hash of the uploaded file
      const uploadedFileHash = crypto.createHash('sha256').update(file.buffer).digest('hex');

      // Retrieve original file hash from blockchain
      const blockchainData = await retrieveFromBlockchain(certificate.blockchainHash);
      const originalFileHash = blockchainData.fileHash;

      // Compare hashes
      const isValid = uploadedFileHash === originalFileHash;

      // Verify blockchain hash
      const isBlockchainValid = await verifyBlockchainHash(certificate.blockchainHash);

      const verification = new Verification({
        certificateId,
        verifierId,
        status: isValid && isBlockchainValid ? 'verified' : 'rejected',
        details: {
          fileHashMatch: isValid,
          blockchainHashValid: isBlockchainValid
        },
        mlCheckPerformed: useMLCheck,
        mlCheckResult: useMLCheck ? mlCheckResult : 'not_applicable',
      });

      await verification.save();

      res.json({
        message: 'Certificate verification complete',
        verification,
        isValid: isValid && isBlockchainValid
      });
    } catch (error) {
      console.error('Verification error:', error);
      res.status(500).json({ error: 'Verification failed' });
    }
  }
];

exports.getVerifications = async (req, res) => {
  try {
    const verifications = await Verification.find().populate('certificateId');
    res.json(verifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching verifications', error: error.message });
  }
};

// const Verification = require('../models/Verification');
// const mlVerification = require('../utils/mlVerification');

// exports.verifyDocument = async (req, res) => {
//   try {
//     const { documentId } = req.body;
//     const verificationResult = await mlVerification(documentId);
//     const newVerification = new Verification({
//       document: documentId,
//       verifyingAuthority: req.user.id,
//       result: verificationResult
//     });
//     await newVerification.save();
//     res.json(newVerification);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

// exports.getVerificationStatus = async (req, res) => {
//   try {
//     const verification = await Verification.findById(req.params.id);
//     if (!verification) {
//       return res.status(404).json({ msg: 'Verification not found' });
//     }
//     res.json(verification);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };


