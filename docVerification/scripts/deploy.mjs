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

  // Deploy AIVerification Contract
  const AIVerification = await ethers.getContractFactory("AIVerification");
  const aiVerification = await AIVerification.deploy(await documentRegistry.getAddress());
  await aiVerification.waitForDeployment();
  console.log("AIVerification deployed to:", await aiVerification.getAddress());

  // Deploy CorrectionRequest Contract
  const CorrectionRequest = await ethers.getContractFactory("CorrectionRequest");
  const correctionRequest = await CorrectionRequest.deploy();
  await correctionRequest.waitForDeployment();
  console.log("CorrectionRequest deployed to:", await correctionRequest.getAddress());

  // Deploy ConsentManagement Contract
  const ConsentManagement = await ethers.getContractFactory("ConsentManagement");
  const consentManagement = await ConsentManagement.deploy();
  await consentManagement.waitForDeployment();
  console.log("ConsentManagement deployed to:", await consentManagement.getAddress());

  // Deploy ComplianceAudit Contract
  const ComplianceAudit = await ethers.getContractFactory("ComplianceAudit");
  const complianceAudit = await ComplianceAudit.deploy();
  await complianceAudit.waitForDeployment();
  console.log("ComplianceAudit deployed to:", await complianceAudit.getAddress());

  // Assign Roles
  // For example, assign ORACLE_ROLE to an address
  // await aiVerification.assignOracle(oracleAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});