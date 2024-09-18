const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  type: { type: String, required: true },
  type: { type: String, required: true },
  issueDate: { type: Date, default: Date.now },
  issuerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  blockchainHash: { type: String, required: true },
  details: { type: Object, required: true },
});

module.exports = mongoose.model('Certificate', certificateSchema);