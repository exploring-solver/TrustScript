// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract UserManagement is AccessControl {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function addIssuingAuthority(address _account) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Only admin can assign issuer role");
        _grantRole(ISSUER_ROLE, _account);
    }

    function addVerifyingAuthority(address _account) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Only admin can assign verifier role");
        _grantRole(VERIFIER_ROLE, _account);
    }

    function isIssuingAuthority(address _account) public view returns (bool) {
        return hasRole(ISSUER_ROLE, _account);
    }

    function isVerifyingAuthority(address _account) public view returns (bool) {
        return hasRole(VERIFIER_ROLE, _account);
    }
}