require('dotenv').config(); // Load environment variables
module.exports = {
    
    hardhat: {
      url: 'http://127.0.0.1:8545', // Hardhat node URL
      chainId: 31337, // Hardhat's default chain ID
      // You can add private keys or mnemonic phrases here if needed
    },
    contracts: {
    UserManagement : '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    DocumentRegistry: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    AIVerification: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    CorrectionRequest: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
    ConsentManagement: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
    ComplianceAudit: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
      // Add other contract addresses as needed

    },
    privateKey: process.env.PRIVATE_KEY
  };
  