// scripts/deploy.js
import pkg from 'hardhat';
const {ethers} = pkg;
async function main() {
  // Deploy UserManagement
  const UserManagement = await ethers.getContractFactory("UserManagement");
  const userManagement = await UserManagement.deploy();
  await userManagement.waitForDeployment();
  console.log("UserManagement deployed to:", await userManagement.getAddress());

  // Deploy DocumentRegistry
  const DocumentRegistry = await ethers.getContractFactory("DocumentRegistry");
  const documentRegistry = await DocumentRegistry.deploy();
  await documentRegistry.waitForDeployment();
  console.log("DocumentRegistry deployed to:", await documentRegistry.getAddress());

  // Deploy Verification Contract
  const Verification = await ethers.getContractFactory("Verification");
  const verification = await Verification.deploy(await documentRegistry.getAddress());
  await verification.waitForDeployment();
  console.log("Verification deployed to:", await verification.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
