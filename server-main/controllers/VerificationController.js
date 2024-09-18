const Verification = require('../models/Verification');
const { verifyBlockchainHash } = require('../utils/blockchain');
const { performMLCheck } = require('../utils/mlCheck');

exports.verifyCertificate = async (req, res) => {
  try {
    const { certificateId, useMLCheck } = req.body;
    const verifierId = req.user.id;
    
    const certificate = await Certificate.findById(certificateId);
    if (!certificate) return res.status(404).json({ error: 'Certificate not found' });
    
    const isValid = await verifyBlockchainHash(certificate.blockchainHash);
    let mlCheckResult = 'not_applicable';
    
    if (useMLCheck) {
      mlCheckResult = await performMLCheck(certificate);
    }
    
    const verification = new Verification({
      certificateId,
      verifierId,
      status: isValid ? 'verified' : 'rejected',
      mlCheckPerformed: useMLCheck,
      mlCheckResult: useMLCheck ? mlCheckResult : 'not_applicable',
    });
    
    await verification.save();
    res.json({ message: 'Certificate verified', verification });
  } catch (error) {
    res.status(500).json({ error: 'Verification failed' });
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


