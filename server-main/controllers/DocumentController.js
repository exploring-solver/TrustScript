const Document = require('../models/Document');

exports.issueDocument = async (req, res) => {
  try {
    const { documentType, content } = req.body;
    const newDocument = new Document({
      documentType,
      content,
      issuingAuthority: req.user.id,
      owner: req.body.ownerId
    });
    await newDocument.save();
    res.json(newDocument);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ msg: 'Document not found' });
    }
    res.json(document);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getUserDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ owner: req.params.userId });
    res.json(documents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
