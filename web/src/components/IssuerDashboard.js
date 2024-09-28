"use client";

import React, { useState, useEffect } from 'react';
import { Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { issueCertificate, getCertificates, createIndividualUser, fetchIndividuals } from '@/service/api';
import { FileText, Image } from 'lucide-react';

const IssuerDashboard = () => {
  const [certificates, setCertificates] = useState([]);
  const [openIssueDialog, setOpenIssueDialog] = useState(false);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const [users, setUsers] = useState([]);
  const documentTypes = [
    { value: 'birth_certificate', label: 'Birth Certificate', icon: <FileText className="mr-2" /> },
    { value: 'academic_transcript', label: 'Academic Transcript', icon: <FileText className="mr-2" /> },
    { value: 'experience_certificate', label: 'Experience Certificate', icon: <Image className="mr-2" /> },
  ];
  useEffect(() => {
    // Fetch the individuals from the backend
    const fetchData = async () => {
      try {
        const response = await fetchIndividuals();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  }, []);
  const [newCertificate, setNewCertificate] = useState({
    type: '',
    ownerId: '',
    details: '',
    file: null
  });
  const [newUser, setNewUser] = useState({
    name: '',
    email: ''
  });

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
    try {
      const formData = new FormData();
      formData.append('type', newCertificate.type);
      formData.append('ownerId', newCertificate.ownerId);
      formData.append('details', newCertificate.details);
      formData.append('file', newCertificate.file);

      await issueCertificate(formData);
      setSnackbar({ open: true, message: 'Certificate issued successfully' });
      setOpenIssueDialog(false);
      fetchCertificates();
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to issue certificate' });
    }
  };

  const handleCreateUser = async () => {
    try {
      await createIndividualUser(newUser);
      setSnackbar({ open: true, message: 'User created successfully' });
      setOpenUserDialog(false);
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to create user' });
    }
  };

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate);
  };
  return (
    <div>
      <Typography variant="h5" gutterBottom>Issuer Dashboard</Typography>
      <Button variant="contained" onClick={() => setOpenIssueDialog(true)} sx={{ mr: 2, mb: 2 }}>
        Issue New Certificate
      </Button>
      <Button variant="contained" onClick={() => setOpenUserDialog(true)} sx={{ mb: 2 }}>
        Create Individual User
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Issue Date</TableCell>
              <TableCell>Owner ID</TableCell>
              <TableCell>Blockchain Hash</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {certificates.map((cert) => {
              const documentType = documentTypes.find(doc => doc.value === cert.type);
              return (
                <TableRow key={cert._id}>
                  <TableCell>{documentType ? documentType.label : cert.type}</TableCell>
                  <TableCell>{new Date(cert.issueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{cert.ownerId}</TableCell>
                  <TableCell>{cert.blockchainHash.substring(0, 10)}...</TableCell>
                  <TableCell>
                    <Button onClick={() => handleCertificateClick(cert)}>View Details</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Issue Certificate Dialog */}
      <Dialog open={openIssueDialog} onClose={() => setOpenIssueDialog(false)}>
        <DialogTitle>Issue New Certificate</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel id="document-type-label">Type</InputLabel>
            <Select
              labelId="document-type-label"
              value={newCertificate.type}
              onChange={(e) => setNewCertificate({ ...newCertificate, type: e.target.value })}
              renderValue={(selected) => {
                const selectedItem = documentTypes.find(option => option.value === selected);
                return (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {selectedItem?.icon}
                    {selectedItem?.label}
                  </div>
                );
              }}
            >
              {documentTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {option.icon}
                    {option.label}
                  </div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Owner ID</InputLabel>
            <Select
              value={newCertificate.ownerId}
              onChange={(e) => setNewCertificate({ ...newCertificate, ownerId: e.target.value })}
              label="Owner ID"
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name}- {user._id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Details"
            value={newCertificate.details}
            onChange={(e) => setNewCertificate({ ...newCertificate, details: e.target.value })}
            margin="normal"
            multiline
            rows={4}
          />
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setNewCertificate({ ...newCertificate, file: e.target.files[0] })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenIssueDialog(false)}>Cancel</Button>
          <Button onClick={handleIssueCertificate}>Issue</Button>
        </DialogActions>
      </Dialog>

      {/* Create User Dialog */}
      <Dialog open={openUserDialog} onClose={() => setOpenUserDialog(false)}>
        <DialogTitle>Create Individual User (default password is &quot;password&quot;)</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUserDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateUser}>Create</Button>
        </DialogActions>
      </Dialog>

      {/* Certificate Details Dialog */}
      <Dialog open={!!selectedCertificate} onClose={() => setSelectedCertificate(null)}>
        <DialogTitle>Certificate Details</DialogTitle>
        <DialogContent>
          {selectedCertificate && (
            <>
              <Typography><strong>Type:</strong> {selectedCertificate.type}</Typography>
              <Typography><strong>Issue Date:</strong> {new Date(selectedCertificate.issueDate).toLocaleString()}</Typography>
              <Typography><strong>Owner ID:</strong> {selectedCertificate.ownerId}</Typography>
              <Typography><strong>Blockchain Hash:</strong> {selectedCertificate.blockchainHash}</Typography>
              <Typography><strong>Details:</strong> {selectedCertificate.details}</Typography>
              {selectedCertificate.fileUrl && (
                <Button href={selectedCertificate.fileUrl} target="_blank" rel="noopener noreferrer">
                  View PDF
                </Button>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedCertificate(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </div>
  );
};

export default IssuerDashboard;