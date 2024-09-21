// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./DocumentRegistry.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract AIVerification is AccessControl {
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");

    DocumentRegistry documentRegistry;

    struct VerificationResult {
        bytes32 docId;
        bool isVerified;
        uint256 timestamp;
    }

    mapping(bytes32 => VerificationResult) public verificationResults;

    event VerificationSubmitted(bytes32 indexed docId, bool isVerified, uint256 timestamp);

    constructor(address _documentRegistryAddress) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        documentRegistry = DocumentRegistry(_documentRegistryAddress);
    }

    function submitVerificationResult(bytes32 _docId, bool _isVerified) public {
        require(hasRole(ORACLE_ROLE, msg.sender), "Caller is not authorized");

        verificationResults[_docId] = VerificationResult({
            docId: _docId,
            isVerified: _isVerified,
            timestamp: block.timestamp
        });

        emit VerificationSubmitted(_docId, _isVerified, block.timestamp);
    }

    function getVerificationResult(bytes32 _docId) public view returns (VerificationResult memory) {
        return verificationResults[_docId];
    }

    function assignOracle(address _oracle) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Only admin can assign oracle");
        _grantRole(ORACLE_ROLE, _oracle);
    }
    // function requestVerificationFromAI(bytes32 _docId) public view {
    // // Integration with an off-chain oracle service
    // require(hasRole(ORACLE_ROLE, msg.sender), "Caller is not authorized");
    // // Logic to request AI verification results off-chain
    // }

}
