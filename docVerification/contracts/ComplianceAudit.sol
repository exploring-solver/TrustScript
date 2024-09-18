// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ComplianceAudit {
    event ActionLogged(address indexed user, string actionType, string details, uint256 timestamp);

    function logAction(string memory _actionType, string memory _details) public {
        emit ActionLogged(msg.sender, _actionType, _details, block.timestamp);
    }
}
