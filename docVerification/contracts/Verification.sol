// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./DocumentRegistry.sol";

contract Verification {
    DocumentRegistry documentRegistry;

    constructor(address _documentRegistryAddress) {
        documentRegistry = DocumentRegistry(_documentRegistryAddress);
    }

    function verifyDocument(bytes32 _docId, bytes32 _documentHash) public view returns (bool) {
        DocumentRegistry.Document memory doc = documentRegistry.getDocument(_docId);
        require(doc.isActive, "Document is not active");
        return doc.documentHash == _documentHash;
    }
}
