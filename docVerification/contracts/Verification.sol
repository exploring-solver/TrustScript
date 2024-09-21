// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol"; // Import AccessControl
import "./DocumentRegistry.sol";

contract Verification is AccessControl {
    DocumentRegistry documentRegistry;

    // Define roles
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");

    constructor(address _documentRegistryAddress) {
        documentRegistry = DocumentRegistry(_documentRegistryAddress);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender); // Grant admin role to contract deployer
    }

    // Removed 'view' since we are calling a function that emits an event
    function verifyDocument(bytes32 _docId, bytes32 _documentHash) public onlyRole(VERIFIER_ROLE) returns (bool) {
        DocumentRegistry.Document memory doc = documentRegistry.getDocument(_docId);
        require(doc.isActive, "Document is not active");
        return doc.documentHash == _documentHash;
    }

    // Function to assign verifier role
    function assignVerifierRole(address verifier) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(VERIFIER_ROLE, verifier);
    }
}
