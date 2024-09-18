// utils/blockchain.js
const crypto = require('crypto');

// Mock function to generate a blockchain hash
exports.generateBlockchainHash = async (data) => {
  // In a real implementation, this would interact with a blockchain network
  // For demonstration, we'll use a simple hash function
  const jsonString = JSON.stringify(data);
  return crypto.createHash('sha256').update(jsonString).digest('hex');
};

// Mock function to verify a blockchain hash
exports.verifyBlockchainHash = async (hash) => {
  // In a real implementation, this would verify the hash on the blockchain
  // For demonstration, we'll assume the hash is valid if it's a valid SHA-256 hash
  const isValidHash = /^[a-f0-9]{64}$/i.test(hash);
  return isValidHash;
};

// Mock function to store data on the blockchain
exports.storeOnBlockchain = async (data) => {
  // In a real implementation, this would store the data on the blockchain
  // For demonstration, we'll just log the data
  console.log('Storing on blockchain:', data);
  return true;
};

// Mock function to retrieve data from the blockchain
exports.retrieveFromBlockchain = async (hash) => {
  // In a real implementation, this would retrieve the data from the blockchain
  // For demonstration, we'll return a mock object
  return {
    hash: hash,
    data: 'Mock data retrieved from blockchain',
    timestamp: new Date().toISOString()
  };
};