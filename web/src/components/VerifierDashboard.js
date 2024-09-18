import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, FormControlLabel, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { fetchIndividuals, fetchIssuers, getCertificates, getVerifications } from '@/service/api';
import CertificateVerification from './CertificateVerification';

const VerifierDashboard = () => {
  const [certificateId, setCertificateId] = useState('');
  const [useMLCheck, setUseMLCheck] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [verifications, setVerifications] = useState([]);
  const [filters, setFilters] = useState({
    certificateType: '',
    issueDate: '',
    issuerId: '',
    ownerId: '',
  });
  const [users, setUsers] = useState([]);
  const [issuers, setIssuers] = useState([]);
  useEffect(() => {
    fetchIndividualsHere();
    fetchCertificates();
    fetchVerifications();
    fetchIssuersHere();
  }, []);

  const fetchIndividualsHere = async () => {
    try {
      const response = await fetchIndividuals();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const fetchIssuersHere = async () => {
    try {
      const response = await fetchIssuers();
      setIssuers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const fetchCertificates = async () => {
    try {
      const response = await getCertificates(filters);
      setCertificates(response.data);
    } catch (error) {
      console.error('Failed to fetch certificates:', error);
    }
  };

  const fetchVerifications = async () => {
    try {
      const response = await getVerifications();
      setVerifications(response.data);
    } catch (error) {
      console.error('Failed to fetch verifications:', error);
    }
  };

  const renderCellContent = (content) => {
    if (typeof content === 'object' && content !== null) {
      return JSON.stringify(content);
    }
    return content;
  };

  // const handleVerify = async () => {
  //   try {
  //     const { data } = await verifyCertificate(certificateId, useMLCheck);
  //     setVerificationResult(data.verification);
  //   } catch (error) {
  //     console.error('Verification failed:', error);
  //     setVerificationResult({ status: 'error', message: 'Verification failed' });
  //   }
  // };

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className='min-h-screen p-4'>
      <Typography variant="h4" gutterBottom>Verifier Dashboard</Typography>

      {/* Filters */}
      <div className="mb-4">
        <Typography variant="h6" gutterBottom>Filters</Typography>
        <div className="flex space-x-4">
          <TextField
            label="Certificate Type"
            name="certificateType"
            value={filters.certificateType}
            onChange={handleFilterChange}
          />
          <TextField
            label="Issue Date"
            name="issueDate"
            type="date"
            value={filters.issueDate}
            onChange={handleFilterChange}
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Issuer ID</InputLabel>
            <Select
              name="issuerId"
              value={filters.issuerId}
              label="Issuer ID"
              onChange={handleFilterChange}
            >
              {issuers.map((issuer) => (
                <MenuItem key={issuer._id} value={issuer._id}>
                  {issuer.name}- {issuer._id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Owner ID</InputLabel>
            <Select
              name="ownerId"
              value={filters.ownerId}
              label="Owner ID"
              onChange={handleFilterChange}
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name}- {user._id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Button variant="contained" onClick={fetchCertificates} className="mt-2">
          Apply Filters
        </Button>
      </div>

      {/* Certificates Table */}
      <Typography variant="h6" gutterBottom>Certificates</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Issue Date</TableCell>
              <TableCell>Issuer ID</TableCell>
              <TableCell>Owner ID</TableCell>
              <TableCell>Blockchain Hash</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {certificates.map((cert) => (
              <TableRow key={cert._id}>
                <TableCell>{cert._id}</TableCell>
                <TableCell>{cert.type}</TableCell>
                <TableCell>{new Date(cert.issueDate).toLocaleDateString()}</TableCell>
                <TableCell>{renderCellContent(cert.issuerId)}</TableCell>
                <TableCell>{renderCellContent(cert.ownerId)}</TableCell>
                <TableCell>{cert.blockchainHash}</TableCell>
                <TableCell>{renderCellContent(cert.details)}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => setCertificateId(cert._id)}>
                    Verify
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CertificateVerification />

      {/* Verification Result section remains the same */}

      {/* Verifications Table */}
      <Typography variant="h6" gutterBottom className="mt-4">Verifications</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Certificate ID</TableCell>
              <TableCell>Verifier ID</TableCell>
              <TableCell>Verification Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>ML Check Performed</TableCell>
              <TableCell>ML Check Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {verifications.map((verification) => (
              <TableRow key={verification._id}>
                <TableCell>{renderCellContent(verification.certificateId._id)}</TableCell>
                <TableCell>{renderCellContent(verification.verifierId)}</TableCell>
                <TableCell>{new Date(verification.verificationDate).toLocaleDateString()}</TableCell>
                <TableCell>{verification.status}</TableCell>
                <TableCell>{verification.mlCheckPerformed ? 'Yes' : 'No'}</TableCell>
                <TableCell>{verification.mlCheckResult}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VerifierDashboard;