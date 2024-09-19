const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Document Verification Platform", function () {
  let DocumentRegistry, documentRegistry, Verification, verification;
  let admin, issuer, verifier, recipient;

  beforeEach(async function () {
    [admin, issuer, verifier, recipient] = await ethers.getSigners();

    // Deploy DocumentRegistry (which includes UserManagement functionality)
    DocumentRegistry = await ethers.getContractFactory("DocumentRegistry");
    documentRegistry = await DocumentRegistry.deploy();
    // Wait for the transaction to be mined
    await documentRegistry.deployTransaction.wait();

    // Deploy Verification
    Verification = await ethers.getContractFactory("Verification");
    verification = await Verification.deploy(documentRegistry.address);
    // Wait for the transaction to be mined
    await verification.deployTransaction.wait();

    // Assign roles
    await documentRegistry.connect(admin).addIssuingAuthority(issuer.address);
    await documentRegistry.connect(admin).addVerifyingAuthority(verifier.address);
  });

  
  it("Should allow an issuing authority to issue a document", async function () {
    const docId = ethers.utils.id("document1");
    const ipfsCid = "Qm...";
    const documentHash = ethers.utils.id("Sample Document Content");

    await documentRegistry.connect(issuer).issueDocument(docId, ipfsCid, documentHash, recipient.address);

    const doc = await documentRegistry.getDocument(docId);
    expect(doc.issuer).to.equal(issuer.address);
    expect(doc.recipient).to.equal(recipient.address);
    expect(doc.isActive).to.be.true;
  });

  it("Should allow a verifier to verify a document", async function () {
    const docId = ethers.utils.id("document1");
    const ipfsCid = "Qm...";
    const documentHash = ethers.utils.id("Sample Document Content");

    await documentRegistry.connect(issuer).issueDocument(docId, ipfsCid, documentHash, recipient.address);

    const isValid = await verification.verifyDocument(docId, documentHash);
    expect(isValid).to.be.true;
  });

  it("Should not verify a revoked document", async function () {
    const docId = ethers.utils.id("document1");
    const ipfsCid = "Qm...";
    const documentHash = ethers.utils.id("Sample Document Content");

    await documentRegistry.connect(issuer).issueDocument(docId, ipfsCid, documentHash, recipient.address);
    await documentRegistry.connect(issuer).revokeDocument(docId);

    await expect(verification.verifyDocument(docId, documentHash)).to.be.revertedWith("Document is not active");
  });
});