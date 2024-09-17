const Document = require('../models/Document');
const Verification = require('../models/Verification');

exports.getDocumentStats = async (req, res) => {
  try {
    const totalDocuments = await Document.countDocuments();
    const documentTypes = await Document.aggregate([
      { $group: { _id: '$documentType', count: { $sum: 1 } } }
    ]);
    res.json({ totalDocuments, documentTypes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getVerificationStats = async (req, res) => {
  try {
    const totalVerifications = await Verification.countDocuments();
    const verificationResults = await Verification.aggregate([
      { $group: { _id: '$result', count: { $sum: 1 } } }
    ]);
    res.json({ totalVerifications, verificationResults });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};