import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { getCertificates } from '@/service/api';
import CertificateVerification from './CertificateVerification';

const IndividualDashboard = () => {
  const [certificates, setCertificates] = useState([]);
  const documentTypes = [
    { value: 'birth_certificate', label: 'Birth Certificate'},
    { value: 'academic_transcript', label: 'Academic Transcript'},
    { value: 'experience_certificate', label: 'Experience Certificate'},
  ];
  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const { data } = await getCertificates();
      setCertificates(data);
    } catch (error) {
      console.error('Failed to fetch certificates:', error);
    }
  };

  const handleDownload = (certificate) => {
    // In a real application, you would implement the download functionality here
    console.log('Downloading certificate:', certificate);
  };

  const handleShare = (certificate) => {
    // In a real application, you would implement the sharing functionality here
    console.log('Sharing certificate:', certificate);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>My Certificates</Typography>
      <CertificateVerification/>
      <br>
      </br>
      <br>
      </br>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Certificate Id</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Issue Date</TableCell>
              <TableCell>Issuer</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {certificates.map((cert) => {
              const documentType = documentTypes.find(doc => doc.value === cert.type);
              return (
              <TableRow key={cert._id}>
                <TableCell>{cert._id}</TableCell>
                <TableCell>{documentType ? documentType.label : cert.type}</TableCell>
                <TableCell>{new Date(cert.issueDate).toLocaleDateString()}</TableCell>
                <TableCell>{cert.issuerId}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDownload(cert)} variant="outlined" size="small" sx={{ mr: 1 }}>
                    Download
                  </Button>
                  <Button onClick={() => handleShare(cert)} variant="outlined" size="small">
                    Share
                  </Button>
                </TableCell>
              </TableRow>
            )})}          
            </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default IndividualDashboard;