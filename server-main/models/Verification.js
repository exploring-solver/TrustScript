const mongoose = require('mongoose');

const VerificationSchema = new mongoose.Schema({
  document: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
  verifyingAuthority: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  result: { type: String, enum: ['verified', 'rejected', 'pending'], required: true },
  verifiedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Verification', VerificationSchema);