const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  documentType: { type: String, required: true },
  content: { type: String, required: true },
  issuingAuthority: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  issuedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
  hash: { type: String }
});

module.exports = mongoose.model('Document', DocumentSchema);
