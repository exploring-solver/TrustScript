require("@nomicfoundation/hardhat-toolbox");
const { vars } = require("hardhat/config");

const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {  
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  
  solidity: "0.8.24",
  networks: {
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
