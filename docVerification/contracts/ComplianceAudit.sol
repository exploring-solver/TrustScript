// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol"; // Import AccessControl

contract ComplianceAudit is AccessControl {
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender); // Grant admin role to contract deployer
    }

    event ActionLogged(address indexed user, string actionType, string details, uint256 timestamp);

    // Use onlyRole to restrict who can log actions
    function logAction(string memory _actionType, string memory _details) public onlyRole(AUDITOR_ROLE) {
        emit ActionLogged(msg.sender, _actionType, _details, block.timestamp);
    }

    // Function to assign auditor role
    function assignAuditorRole(address auditor) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(AUDITOR_ROLE, auditor);
    }
}
