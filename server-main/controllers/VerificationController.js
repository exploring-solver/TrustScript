const Verification = require('../models/Verification');
const mlVerification = require('../utils/mlVerification');

exports.verifyDocument = async (req, res) => {
  try {
    const { documentId } = req.body;
    const verificationResult = await mlVerification(documentId);
    const newVerification = new Verification({
      document: documentId,
      verifyingAuthority: req.user.id,
      result: verificationResult
    });
    await newVerification.save();
    res.json(newVerification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getVerificationStatus = async (req, res) => {
  try {
    const verification = await Verification.findById(req.params.id);
    if (!verification) {
      return res.status(404).json({ msg: 'Verification not found' });
    }
    res.json(verification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};