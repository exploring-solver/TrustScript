const { expect } = require("chai");

describe("AIVerification Contract", function () {
  let AIVerification, aiVerification, DocumentRegistry, documentRegistry;
  let admin, oracle, issuer, recipient;

  beforeEach(async function () {
    [admin, oracle, issuer, recipient] = await ethers.getSigners();

    // Deploy DocumentRegistry
    DocumentRegistry = await ethers.getContractFactory("DocumentRegistry");
    documentRegistry = await DocumentRegistry.deploy();
    await documentRegistry.waitForDeployment();

    // Deploy AIVerification
    AIVerification = await ethers.getContractFactory("AIVerification");
    aiVerification = await AIVerification.deploy(await documentRegistry.getAddress());
    await aiVerification.waitForDeployment();

    // Assign ORACLE_ROLE
    await aiVerification.assignOracle(oracle.address);
  });

  it("Should allow oracle to submit verification result", async function () {
    const docId = ethers.keccak256(ethers.toUtf8Bytes("document1"));

    // Simulate document issuance (you may need to set up the issuer role)
    // ...

    // Oracle submits verification result
    await aiVerification.connect(oracle).submitVerificationResult(docId, true);

    const result = await aiVerification.getVerificationResult(docId);
    expect(result.isVerified).to.be.true;
  });

  it("Should not allow unauthorized users to submit verification result", async function () {
    const docId = ethers.keccak256(ethers.toUtf8Bytes("document1"));

    await expect(
      aiVerification.connect(issuer).submitVerificationResult(docId, true)
    ).to.be.revertedWith("Caller is not authorized");
  });
});
