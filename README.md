# TrustScript - By Team Ramanujan_ (SIH 2024)
### PS-1709
TrustScript is an innovative platform that harnesses AI and blockchain to automate and secure official document verification. It streamlines workflows for issuing and verifying authorities, ensuring authenticity while saving time and resources.

## Table of Contents

- [Overview](#overview)
- [How It Addresses the Problem](#how-it-addresses-the-problem)
- [Innovation and Uniqueness](#innovation-and-uniqueness)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Overview

Developed for the **Smart India Hackathon 2024** (Problem Statement 1709 for the Ministry of Power), TrustScript leverages cutting-edge technologies like AI and blockchain to provide a secure, efficient, and automated solution for official document verification.

## How It Addresses the Problem

- **Automated Workflow**: Streamlines document verification, minimizing manual effort and errors, and enhancing efficiency for issuers and verifiers.
- **Blockchain Security**: Ensures secure, immutable storage of certificates, providing tamper-proof verification and authenticity for stakeholders.
- **Role-Based Dashboards**: Offers tailored dashboards for issuers, verifiers, and individuals, facilitating efficient document management and tracking.
- **AI-Powered Verification**: Utilizes AI algorithms to expedite certificate verification by cross-referencing predefined criteria, improving accuracy and reducing processing time.
- **Centralized Accessibility**: Allows individuals to easily access, share, and manage digital certificates in one location, promoting transparency and lowering administrative overhead.

## Innovation and Uniqueness

- **AI-Blockchain Synergy**: By combining Generative AI concepts (GANs), OCR, and NLP with the decentralized security of blockchain, TrustScript ensures both accuracy and inviolability, solving the dual challenge of error-prone verification and document tampering.
- **Seamless Integration and Compliance**: Provides APIs for easy integration with existing systems, comprehensive audit trails, and built-in compliance checks with an end-to-end secure workflow.
- **SDK for Verifying Authorities**: Offers a dedicated SDK tailored for verifying authorities, enabling seamless integration within their existing systems. Authorities can directly integrate within their operational ecosystem, ensuring streamlined, real-time authentication with minimal disruption.

## Key Features

- **SDK for Seamless Integration**
- **Blockchain-Based Document Storage**
- **Centralized Verification Web Portal**
- **Multi-Factor Authentication (MFA) and Role-Based Access Control (RBAC)**
- **API Integration**
- **Tamper-Detection and Anomaly Alerts**
- **AI-Powered Verification**

## Technology Stack

- **Front-end**: Next.js, Material UI, Tailwind CSS
- **Back-end**: Express.js, MongoDB
- **Machine Learning Libraries**: Scikit-learn, NumPy, Pandas, and others

## Installation

### Prerequisites

- **Node.js** (v14.x or higher)
- **MongoDB**
- **Git**

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/exploring-solver/TrustScript.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd trustscript
   ```

3. **Install Dependencies**

   - **Server**

     ```bash
     cd server-main
     npm install
     ```

   - **Client**

     ```bash
     cd ../web
     npm install
     ```

4. **Set Up Environment Variables**

   Create a `.env` file in both the `server` and `client` directories with the necessary environment variables.

5. **Run the Application**

   - **Server**

     ```bash
     cd server-main
     npm run dev
     ```

   - **Client**

     ```bash
     cd web
     npm run dev
     ```

6. **Access the Application**

   Open your browser and navigate to `http://localhost:3000`.

## Usage

- **Issuers**: Upload and manage official documents through a dedicated dashboard.
- **Verifiers**: Authenticate documents using AI-powered verification tools.
- **Individuals**: Access, share, and manage digital certificates in a centralized portal.

## Acknowledgments

- **Smart India Hackathon 2024**: Developed for Problem Statement 1709 for the Ministry of Power.
- **Open-Source Libraries**: Thanks to the developers of Next.js, Express.js, MongoDB, Scikit-learn, NumPy, Pandas, Material UI, and Tailwind CSS.

---