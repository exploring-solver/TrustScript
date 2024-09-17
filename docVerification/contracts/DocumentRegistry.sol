// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserManagement.sol";

contract DocumentRegistry is UserManagement {
    struct Document {
        string ipfsCid;
        bytes32 documentHash;
        address issuer;
        address recipient;
        uint256 timestamp;
        bool isActive;
    }

    mapping(bytes32 => Document) public documents;

    event DocumentIssued(bytes32 indexed docId, address indexed issuer, address indexed recipient);
    event DocumentRevoked(bytes32 indexed docId, address indexed issuer);

    function issueDocument(bytes32 _docId, string memory _ipfsCid, bytes32 _documentHash, address _recipient) public {
        require(hasRole(ISSUER_ROLE, msg.sender), "Caller is not an issuing authority");
        require(documents[_docId].timestamp == 0, "Document already exists");

        documents[_docId] = Document({
            ipfsCid: _ipfsCid,
            documentHash: _documentHash,
            issuer: msg.sender,
            recipient: _recipient,
            timestamp: block.timestamp,
            isActive: true
        });

        emit DocumentIssued(_docId, msg.sender, _recipient);
    }

    function revokeDocument(bytes32 _docId) public {
        require(documents[_docId].issuer == msg.sender, "Only issuer can revoke");
        require(documents[_docId].isActive, "Document already revoked");

        documents[_docId].isActive = false;

        emit DocumentRevoked(_docId, msg.sender);
    }

    function getDocument(bytes32 _docId) public view returns (Document memory) {
        return documents[_docId];
    }
}
