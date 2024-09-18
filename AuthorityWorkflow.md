# Digital Certificate Portal - System Schema & Workflow

## Table of Contents
1. [Introduction](#introduction)
2. [Schema Relation](#schema-relation)
    - [Entities](#entities)
    - [Relationships](#relationships)
3. [Frontend to Backend Workflow](#frontend-to-backend-workflow)
    - [Issuing Authorities](#issuing-authorities)
    - [Verifying Authorities](#verifying-authorities)
    - [Individuals](#individuals)
4. [Authority Dashboards](#authority-dashboards)
    - [Issuing Authority Dashboard](#issuing-authority-dashboard)
    - [Verifying Authority Dashboard](#verifying-authority-dashboard)
    - [Individual User Dashboard](#individual-user-dashboard)

---

## Introduction

The **Digital Certificate Portal** aims to provide a user-friendly platform where issuing authorities (schools, universities, employers) can generate digital certificates for individuals. These certificates include various documents like birth certificates, academic transcripts, and experience letters. Verifying authorities (government offices, banks, legal entities) can securely verify the authenticity of these documents through the blockchain. Individuals can view all issued certificates under their name, ensuring transparency and accessibility.

---

## Schema Relation

### Entities

1. **Users**
   - Represents any individual interacting with the system (e.g., issuing authority, verifying authority, or individual).
   - Fields:
     - `id`: Unique identifier.
     - `name`: Name of the user.
     - `email`: Email address for login.
     - `role`: Role of the user (e.g., `issuer`, `verifier`, `individual`).
     - `password`: Password for secure access.

2. **Certificates**
   - Represents a digital certificate issued to an individual.
   - Fields:
     - `id`: Unique identifier.
     - `type`: Type of certificate (e.g., `birth certificate`, `academic transcript`, `experience letter`).
     - `issue_date`: Date the certificate was issued.
     - `issuer_id`: Foreign key linking to the `Users` table (who issued it).
     - `owner_id`: Foreign key linking to the `Users` table (individual who owns it).
     - `blockchain_hash`: Hash of the certificate stored on the blockchain.

3. **Verifications**
   - Tracks which authority has verified a certificate.
   - Fields:
     - `id`: Unique identifier.
     - `certificate_id`: Foreign key linking to the `Certificates` table.
     - `verifier_id`: Foreign key linking to the `Users` table (who verified it).
     - `verification_date`: Date of verification.
     - `status`: Status of verification (`pending`, `verified`, `rejected`).

### Relationships

- **One-to-Many (Users -> Certificates)**:
  - Each **issuing authority** can issue multiple certificates.
  - Each **individual** can own multiple certificates.
  
- **One-to-Many (Certificates -> Verifications)**:
  - Each **certificate** can have multiple verifications from different authorities.

---

## Frontend to Backend Workflow

### Issuing Authorities

1. **Frontend**:
   - Issuing authority logs into the portal.
   - Fills in details of the individual and certificate (e.g., certificate type, issuance date, certificate details).
   - Submits the form to generate a digital certificate.
   
2. **Backend**:
   - Upon submission, the backend processes the certificate data and stores it in the database.
   - A unique `blockchain_hash` is generated for the certificate and saved on the blockchain for tamper-proof verification.
   - The certificate is linked to the individual (owner) in the `Certificates` table.
   
3. **Return to Frontend**:
   - The issuing authority can view all certificates they have issued and track their statuses (e.g., if they've been verified).

### Verifying Authorities

1. **Frontend**:
   - Verifying authority logs into the portal.
   - Searches for an individual's certificate using criteria like certificate type, date, or name.
   - Views certificate details and clicks on the "Verify" button to verify authenticity via blockchain.
   
2. **Backend**:
   - The backend fetches the blockchain hash for the certificate and compares it with the hash on the blockchain.
   - If the certificate is valid, the backend updates the `Verifications` table with a new entry (`status: verified`).
   - If tampered, the status is updated to `rejected`.
   
3. **Return to Frontend**:
   - Verifying authority can track the certificates they've verified and see the verification status.

### Individuals

1. **Frontend**:
   - Individual logs into the portal.
   - Views all certificates issued in their name from various issuing authorities.
   - Can request verification for a certificate by submitting it to a verifying authority.

2. **Backend**:
   - The backend fetches all certificates linked to the individual's `owner_id` in the `Certificates` table and displays them.
   - Upon submission for verification, the certificate is queued for the verifying authority.

3. **Return to Frontend**:
   - Individuals can see the status of each certificate (e.g., `pending verification`, `verified`, `rejected`).

---

## Authority Dashboards

### Issuing Authority Dashboard

- **Overview of Issued Certificates**:
  - Total number of certificates issued.
  - List of certificates with details (type, date, owner).
  - Status of each certificate (e.g., verified, pending verification).
  
- **Action Buttons**:
  - Button to generate a new certificate.
  - Button to edit certificate details (if necessary).
  - Button to revoke a certificate.

### Verifying Authority Dashboard

- **Search and View Certificates**:
  - Search bar to find certificates based on individual names or certificate type.
  - View certificate details and the blockchain verification status.
  
- **Verification Status**:
  - List of certificates they've verified or are pending verification.
  - Status: `pending`, `verified`, or `rejected`.

- **Action Buttons**:
  - Button to verify or reject a certificate.

### Individual User Dashboard

- **List of Issued Certificates**:
  - View all certificates issued under the individual's name.
  - Filter by certificate type (e.g., academic transcript, birth certificate).
  
- **Verification Requests**:
  - Request verification from a verifying authority.
  - View the status of each verification (pending, verified, rejected).

- **Action Buttons**:
  - Button to download certificates.
  - Button to share certificates with third parties via secure links.

---

## Conclusion

This system ensures a seamless interaction between issuing authorities, verifying authorities, and individuals. The use of blockchain guarantees certificate authenticity, and the role-based dashboard ensures that each authority can perform their respective tasks efficiently.