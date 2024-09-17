const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Document Verification Platform", function () {
  let UserManagement, userManagement, DocumentRegistry, documentRegistry, Verification, verification;
  let admin, issuer, verifier, recipient;

  beforeEach(async function () {
    [admin, issuer, verifier, recipient] = await ethers.getSigners();

    UserManagement = await ethers.getContractFactory("UserManagement");
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy a new UserManagement contract before each test
    userManagement = await UserManagement.deploy();
    // Wait for the contract to be mined
    await userManagement.deployTransaction.wait();

    // Deploy DocumentRegistry
    DocumentRegistry = await ethers.getContractFactory("DocumentRegistry");
    documentRegistry = await DocumentRegistry.deploy();
    await documentRegistry.deployed();

    // Deploy Verification
    Verification = await ethers.getContractFactory("Verification");
    verification = await Verification.deploy(documentRegistry.address);
    await verification.deployed();

    // Assign roles
    await userManagement.connect(admin).addIssuingAuthority(issuer.address);
    await userManagement.connect(admin).addVerifyingAuthority(verifier.address);
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
