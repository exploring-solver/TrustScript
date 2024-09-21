const Certificate = require('../models/Certificate');
const ethers = require('ethers');
const { generateBlockchainHash, storeOnBlockchain } = require('../utils/blockchain');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.memoryStorage(); // Store the file in memory for further processing
const upload = multer({ storage: storage }); // Use multer's memory storage

// Create a directory for storing files if it doesn't exist
const uploadDir = path.join(__dirname, '..', 'uploads', 'certificates');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

exports.issueCertificate = [
  upload.single('file'), // Handle single file upload with key 'file'
  async (req, res) => {
    try {
      // Log incoming request body
      console.log('Request Body:', req.body);
      console.log('Uploaded File:', req.file);

      const { type, ownerId, details } = req.body;
      const issuerId = req.user.id;
      const file = req.file;

      if (!file) {
        console.error('No file uploaded');
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Define the directory and file path where the file will be stored
      const fileBuffer = file.buffer;
      const uploadDir = path.join(__dirname, 'uploads');
      const fileName = `${Date.now()}-${file.originalname}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, fileBuffer);

      // Ensure the upload directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
        console.log('Uploads directory created.');
      }

      // Write the file to the local folder
      fs.writeFileSync(filePath, file.buffer);
      console.log('File saved successfully at:', filePath);

      const fileUrl = `/uploads/certificates/${fileName}`; // This URL can be used to access the file from the front-end.
      console.log('File URL:', fileUrl);

      // Generate the blockchain hash
      const blockchainHash = await generateBlockchainHash({ type, ownerId, issuerId, details, fileUrl });
      console.log('Blockchain Hash:', blockchainHash);

      // Generate document hash
      const documentHash = ethers.keccak256(fileBuffer);
      // Generate a unique docId (could be the hash of the file or a UUID)
      const docId = ethers.keccak256(ethers.toUtf8Bytes(`${issuerId}-${ownerId}-${Date.now()}`));

      // Generate IPFS CID (mock implementation)
      const ipfsCid = 'QmExampleCID'; // Replace with actual IPFS CID if using IPFS

      // Store on blockchain
      const blockchainData = {
        docId,
        ipfsCid,
        documentHash,
        recipient: ownerId, // Should be an Ethereum address
      };

      // const blockchainReceipt = await storeOnBlockchain(blockchainData);

      const certificate = new Certificate({
        type,
        ownerId,
        issuerId,
        blockchainHash: documentHash,
        details,
        fileUrl,
        docId,
      });

      await certificate.save();
      console.log('Certificate saved successfully.');

      res.status(201).json({ message: 'Certificate issued successfully', certificate });
    } catch (error) {
      console.error('Error issuing certificate:', error);
      res.status(500).json({ error: 'Failed to issue certificate' });
    }
  }
];

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

exports.getCertificateDetails = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id)
      .populate('ownerId', 'name email')
      .populate('issuerId', 'name');

    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    res.json(certificate);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch certificate details' });
  }
};
