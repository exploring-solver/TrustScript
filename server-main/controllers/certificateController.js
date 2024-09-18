const Certificate = require('../models/Certificate');
const { generateBlockchainHash } = require('../utils/blockchain');

exports.issueCertificate = async (req, res) => {
  try {
    const { type, ownerId, details } = req.body;
    const issuerId = req.user.id;
    const blockchainHash = await generateBlockchainHash({ type, ownerId, issuerId, details });
    const certificate = new Certificate({ type, ownerId, issuerId, blockchainHash, details });
    await certificate.save();
    res.status(201).json({ message: 'Certificate issued successfully', certificate });
  } catch (error) {
    res.status(500).json({ error: 'Failed to issue certificate' });
  }
};

exports.getCertificates = async (req, res) => {
  try {
    const { role } = req.user;
    let certificates;
    if (role === 'issuer') {
      certificates = await Certificate.find({ issuerId: req.user.id });
    } else if (role === 'individual') {
      certificates = await Certificate.find({ ownerId: req.user.id });
    } else {
      certificates = await Certificate.find();
    }
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch certificates' });
  }
};