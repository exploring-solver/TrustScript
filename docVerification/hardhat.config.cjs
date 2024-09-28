require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Ensure you load environment variables from .env

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY; // Access the env variable
const INFURA_API_KEY = process.env.INFURA_API_KEY; 
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    } ,
  },
  sourcify: {
    enabled: true
  },
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      // accounts: [SEPOLIA_PRIVATE_KEY],
    },
    hardhat: {
      chainId: 31337,
      port: 8545
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};
