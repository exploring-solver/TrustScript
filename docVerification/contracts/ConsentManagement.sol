// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ConsentManagement {
    mapping(address => mapping(string => bool)) public consents;

    event ConsentGiven(address indexed user, string consentType);
    event ConsentRevoked(address indexed user, string consentType);

    function giveConsent(string memory _consentType) public {
        consents[msg.sender][_consentType] = true;
        emit ConsentGiven(msg.sender, _consentType);
    }

    function revokeConsent(string memory _consentType) public {
        require(consents[msg.sender][_consentType] == true, "Consent not given");
        consents[msg.sender][_consentType] = false;
        emit ConsentRevoked(msg.sender, _consentType);
    }

    function hasConsent(address _user, string memory _consentType) public view returns (bool) {
        return consents[_user][_consentType];
    }
}
