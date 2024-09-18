const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  certificateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Certificate', required: true },
  verifierId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  verificationDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  mlCheckPerformed: { type: Boolean, default: false },
  mlCheckResult: { type: String, enum: ['pass', 'fail', 'not_applicable'], default: 'not_applicable' },
});

module.exports = mongoose.model('Verification', verificationSchema);