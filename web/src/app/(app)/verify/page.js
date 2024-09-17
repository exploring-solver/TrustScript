"use client";
import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel,
  CircularProgress,
  Box,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { 
  FilePdf, 
  FileText, 
  Image, 
  CheckCircle, 
  AlertTriangle, 
  Info
} from 'lucide-react';

const VerifyDocument = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [documentType, setDocumentType] = useState('');
  const [documentFile, setDocumentFile] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState('');

  const steps = ['Select Document Type', 'Upload Document', 'Verification'];

  const documentTypes = [
    { value: 'birth_certificate', label: 'Birth Certificate', icon: <FileText className="mr-2" /> },
    { value: 'academic_transcript', label: 'Academic Transcript', icon: <FilePdf className="mr-2" /> },
    { value: 'experience_certificate', label: 'Experience Certificate', icon: <Image className="mr-2" /> },
  ];

  const handleNext = () => {
    setError('');
    if (activeStep === 0 && !documentType) {
      setError('Please select a document type');
      return;
    }
    if (activeStep === 1 && !documentFile) {
      setError('Please upload a document');
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 2) {
      verifyDocument();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setError('');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      setDocumentFile(file);
      setError('');
    } else {
      setError('File size should not exceed 5MB');
    }
  };

  const verifyDocument = () => {
    // Simulate document verification process
    setVerificationResult(null);
    setTimeout(() => {
      const results = [
        { status: 'Verified', message: 'Document successfully verified', details: 'All security features match. Document is authentic.' },
        { status: 'Warning', message: 'Document verified with warnings', details: 'Some security features could not be verified. Manual review recommended.' },
        { status: 'Error', message: 'Document verification failed', details: 'Critical security features do not match. Document may be fraudulent.' }
      ];
      setVerificationResult(results[Math.floor(Math.random() * results.length)]);
    }, 3000);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="body1" className="mb-4">
              Select the type of document you want to verify. This helps our system apply the appropriate verification checks.
            </Typography>
            <TextField
              select
              fullWidth
              label="Document Type"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              SelectProps={{
                native: true,
              }}
            >
              <option value="">Select a document type</option>
              {documentTypes.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </TextField>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="body1" className="mb-4">
              Upload your document for verification. We accept PDF, JPG, and PNG formats up to 5MB in size.
            </Typography>
            <input
              accept=".pdf,.jpg,.jpeg,.png"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span" startIcon={<FilePdf />}>
                Upload Document
              </Button>
            </label>
            {documentFile && (
              <Typography variant="body2" className="mt-2">
                Selected file: {documentFile.name}
              </Typography>
            )}
          </Box>
        );
      case 2:
        return verificationResult ? (
          <Box>
            <Alert severity={
              verificationResult.status === 'Verified' ? 'success' : 
              verificationResult.status === 'Warning' ? 'warning' : 'error'
            }>
              <AlertTitle>{verificationResult.status}</AlertTitle>
              {verificationResult.message}
            </Alert>
            <Typography variant="body1" className="mt-4 mb-2">Verification Details:</Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  {verificationResult.status === 'Verified' ? <CheckCircle color="success" /> : 
                   verificationResult.status === 'Warning' ? <AlertTriangle color="warning" /> : 
                   <Info color="error" />}
                </ListItemIcon>
                <ListItemText primary={verificationResult.details} />
              </ListItem>
            </List>
          </Box>
        ) : (
          <Box className="text-center">
            <CircularProgress />
            <Typography>Verifying document...</Typography>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md" className="mt-8 min-h-screen">
      <Paper className="p-6">
        <Typography variant="h4" className="mb-4">Verify Document</Typography>
        <Stepper activeStep={activeStep} className="mb-6">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box className="mb-6">
          {renderStepContent(activeStep)}
        </Box>
        {error && <Alert severity="error" className="mb-4">{error}</Alert>}
        <Divider className="my-4" />
        <Box className="flex justify-between">
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default VerifyDocument;