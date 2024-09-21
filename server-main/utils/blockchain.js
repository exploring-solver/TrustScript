const crypto = require('crypto');
const { ethers } = require('ethers');
const config = require('../config');
const DocumentRegistryABI = require('../abis/DocumentRegistry.json'); // Adjust the path as needed
require('dotenv').config();

// Create a provider connected to the Hardhat network
const provider = new ethers.JsonRpcProvider(config.hardhat.url);

// Optionally, you can use a private key to create a signer
// For testing purposes, you can use one of the accounts provided by Hardhat
const privateKey = process.env.PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);

// Load the DocumentRegistry contract
const documentRegistryAddress = config.contracts.DocumentRegistry;
const documentRegistryContract = new ethers.Contract(
  documentRegistryAddress,
  DocumentRegistryABI.abi,
  signer
);

exports.generateBlockchainHash = async (data) => {
  const jsonString = JSON.stringify(data);
  return ethers.keccak256(ethers.toUtf8Bytes(jsonString));
};

exports.verifyBlockchainHash = async (docId, documentHash) => {
  try {
    const document = await documentRegistryContract.getDocument(docId);
    const isValid = document.documentHash === documentHash && document.isActive;
    return isValid;
  } catch (error) {
    console.error('Error verifying document hash on blockchain:', error);
    throw error;
  }
};

exports.storeOnBlockchain = async (data) => {
  try {
    const { docId, ipfsCid, documentHash, recipient } = data;

    // Call the issueDocument function on the smart contract
    const tx = await documentRegistryContract.issueDocument(
      docId,
      ipfsCid,
      documentHash,
      recipient
    );

    // Wait for the transaction to be mined
    const receipt = await tx.wait();

    console.log('Document stored on blockchain with transaction hash:', receipt.transactionHash);
    return receipt;
  } catch (error) {
    console.error('Error storing document on blockchain:', error);
    throw error;
  }
};

exports.retrieveFromBlockchain = async (docId) => {
  try {
    const document = await documentRegistryContract.getDocument(docId);
    return document;
  } catch (error) {
    console.error('Error retrieving document from blockchain:', error);
    throw error;
  }
};
