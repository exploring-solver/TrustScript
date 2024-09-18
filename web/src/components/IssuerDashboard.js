import React, { useState, useEffect } from 'react';
import { Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { issueCertificate, getCertificates } from '@/service/api';

const IssuerDashboard = () => {
  const [certificates, setCertificates] = useState([]);

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

  const handleIssueCertificate = async () => {
    // This is a simplified version. In a real app, you'd open a modal or navigate to a form to input certificate details.
    try {
      await issueCertificate('Sample Certificate', 'sampleOwnerId', { sampleDetail: 'value' });
      fetchCertificates();
    } catch (error) {
      console.error('Failed to issue certificate:', error);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>Issuer Dashboard</Typography>
      <Button variant="contained" onClick={handleIssueCertificate} sx={{ mb: 2 }}>
        Issue New Certificate
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Issue Date</TableCell>
              <TableCell>Owner ID</TableCell>
              <TableCell>Blockchain Hash</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {certificates.map((cert) => (
              <TableRow key={cert._id}>
                <TableCell>{cert.type}</TableCell>
                <TableCell>{new Date(cert.issueDate).toLocaleDateString()}</TableCell>
                <TableCell>{cert.ownerId}</TableCell>
                <TableCell>{cert.blockchainHash.substring(0, 10)}...</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default IssuerDashboard;