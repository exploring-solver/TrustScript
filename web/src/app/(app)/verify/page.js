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
  CircularProgress
} from '@mui/material';

const VerifyDocument = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [documentType, setDocumentType] = useState('');
  const [documentFile, setDocumentFile] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);

  const steps = ['Select Document Type', 'Upload Document', 'Verification'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 2) {
      // Simulate document verification process
      setTimeout(() => {
        setVerificationResult({
          status: 'Verified',
          message: 'Document successfully verified',
          details: 'All security features match. Document is authentic.'
        });
      }, 3000);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFileChange = (event) => {
    setDocumentFile(event.target.files[0]);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
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
            <option value="birth_certificate">Birth Certificate</option>
            <option value="academic_transcript">Academic Transcript</option>
            <option value="experience_certificate">Experience Certificate</option>
          </TextField>
        );
      case 1:
        return (
          <div>
            <input
              accept="application/pdf,image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span">
                Upload Document
              </Button>
            </label>
            {documentFile && <Typography>{documentFile.name}</Typography>}
          </div>
        );
      case 2:
        return verificationResult ? (
          <div>
            <Typography variant="h6" color={verificationResult.status === 'Verified' ? 'success' : 'error'}>
              {verificationResult.status}
            </Typography>
            <Typography>{verificationResult.message}</Typography>
            <Typography variant="body2">{verificationResult.details}</Typography>
          </div>
        ) : (
          <div className="text-center">
            <CircularProgress />
            <Typography>Verifying document...</Typography>
          </div>
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
        <div className="mb-6">
          {renderStepContent(activeStep)}
        </div>
        <div>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className="mr-2"
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={
              (activeStep === 0 && !documentType) ||
              (activeStep === 1 && !documentFile) ||
              activeStep === steps.length - 1
            }
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default VerifyDocument;