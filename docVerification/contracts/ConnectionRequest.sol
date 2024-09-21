// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract CorrectionRequest is AccessControl {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");

    enum RequestStatus { Pending, Approved, Rejected }

    struct CorrectionRequestStruct {
        bytes32 docId;
        address requester;
        string reason;
        RequestStatus status;
        string issuerResponse;
        uint256 timestamp;
    }

    mapping(uint256 => CorrectionRequestStruct) public correctionRequests;
    uint256 public requestCounter;

    event CorrectionRequested(uint256 requestId, bytes32 docId, address requester, string reason);
    event CorrectionReviewed(uint256 requestId, RequestStatus status, string issuerResponse);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function submitCorrectionRequest(bytes32 _docId, string memory _reason) public {
        correctionRequests[requestCounter] = CorrectionRequestStruct({
            docId: _docId,
            requester: msg.sender,
            reason: _reason,
            status: RequestStatus.Pending,
            issuerResponse: "",
            timestamp: block.timestamp
        });

        emit CorrectionRequested(requestCounter, _docId, msg.sender, _reason);
        requestCounter++;
    }

    function reviewCorrectionRequest(uint256 _requestId, RequestStatus _status, string memory _issuerResponse) public {
        require(hasRole(ISSUER_ROLE, msg.sender), "Caller is not an issuing authority");
        require(_requestId < requestCounter, "Invalid request ID");
        require(correctionRequests[_requestId].status == RequestStatus.Pending, "Request already reviewed");

        correctionRequests[_requestId].status = _status;
        correctionRequests[_requestId].issuerResponse = _issuerResponse;
        correctionRequests[_requestId].timestamp = block.timestamp; // Update timestamp for when reviewed


        emit CorrectionReviewed(_requestId, _status, _issuerResponse);
    }

    function getCorrectionRequest(uint256 _requestId) public view returns (CorrectionRequestStruct memory) {
        require(_requestId < requestCounter, "Invalid request ID");
        return correctionRequests[_requestId];
    }
}
