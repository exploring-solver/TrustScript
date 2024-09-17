pragma solidity ^0.8.0;

contract DocumentVerification {
    struct Document {
        bytes32 hash;
        address issuer;
        uint256 issuedAt;
        bool isVerified;
    }

    mapping(bytes32 => Document) public documents;

    event DocumentIssued(bytes32 indexed documentHash, address indexed issuer);
    event DocumentVerified(bytes32 indexed documentHash, address indexed verifier);

    function issueDocument(bytes32 _documentHash) public {
        require(documents[_documentHash].hash == bytes32(0), "Document already exists");
        
        documents[_documentHash] = Document({
            hash: _documentHash,
            issuer: msg.sender,
            issuedAt: block.timestamp,
            isVerified: false
        });

        emit DocumentIssued(_documentHash, msg.sender);
    }

    function verifyDocument(bytes32 _documentHash) public {
        require(documents[_documentHash].hash != bytes32(0), "Document does not exist");
        require(!documents[_documentHash].isVerified, "Document already verified");

        documents[_documentHash].isVerified = true;

        emit DocumentVerified(_documentHash, msg.sender);
    }

    function getDocument(bytes32 _documentHash) public view returns (bytes32, address, uint256, bool) {
        Document memory doc = documents[_documentHash];
        return (doc.hash, doc.issuer, doc.issuedAt, doc.isVerified);
    }
}