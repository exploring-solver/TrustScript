// "use client";
// import React, { useState } from 'react';
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Stepper,
//   Step,
//   StepLabel,
//   CircularProgress,
//   Box,
//   Alert,
//   AlertTitle,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Divider,
// } from '@mui/material';
// import { FileText, Image, CheckCircle, AlertTriangle, Info } from 'lucide-react';
// import { verifyCertificate } from '@/service/api';

// const VerifyDocument = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [documentType, setDocumentType] = useState('');
//   const [documentFile, setDocumentFile] = useState(null);
//   const [certificateId, setCertificateId] = useState('');
//   const [verificationResult, setVerificationResult] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const steps = ['Select Document Type', 'Upload Document', 'Enter Certificate ID', 'Verification'];

//   const documentTypes = [
//     { value: 'birth_certificate', label: 'Birth Certificate', icon: <FileText className="mr-2" /> },
//     { value: 'academic_transcript', label: 'Academic Transcript', icon: <FileText className="mr-2" /> },
//     { value: 'experience_certificate', label: 'Experience Certificate', icon: <Image className="mr-2" /> },
//   ];

//   const handleNext = () => {
//     setError('');
//     if (activeStep === 0 && !documentType) {
//       setError('Please select a document type');
//       return;
//     }
//     if (activeStep === 1 && !documentFile) {
//       setError('Please upload a document');
//       return;
//     }
//     if (activeStep === 2 && !certificateId) {
//       setError('Please enter a certificate ID');
//       return;
//     }
//     if (activeStep === 3) {
//       verifyDocument();
//     } else {
//       setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     }
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     setError('');
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file && file.size <= 5 * 1024 * 1024) {
//       setDocumentFile(file);
//       setError('');
//     } else {
//       setError('File size should not exceed 5MB');
//     }
//   };

//   const verifyDocument = async () => {
//     const formData = new FormData();
//     formData.append('file', documentFile);
//     formData.append('certificateId', certificateId);

//     try {
//       setLoading(true);
//       setVerificationResult(null);
//       const response = await verifyCertificate(formData);
      
//       // Simulate a delay of 2.5 seconds
//       setTimeout(() => {
//         setVerificationResult(response.data);
//         setLoading(false);
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//       }, 2500);
//     } catch (err) {
//       setError(err.response?.data?.error || 'An error occurred during verification.');
//       setLoading(false);
//     }
//   };

//   const renderStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <Box>
//             <Typography variant="body1" className="mb-4">
//               Select the type of document you want to verify.
//             </Typography>
//             <TextField
//               select
//               fullWidth
//               label="Document Type"
//               value={documentType}
//               onChange={(e) => setDocumentType(e.target.value)}
//               SelectProps={{ native: true }}
//             >
//               <option value="">Select a document type</option>
//               {documentTypes.map((type) => (
//                 <option key={type.value} value={type.value}>{type.label}</option>
//               ))}
//             </TextField>
//           </Box>
//         );
//       case 1:
//         return (
//           <Box>
//             <Typography variant="body1" className="mb-4">
//               Upload your document for verification.
//             </Typography>
//             <input
//               accept=".pdf,.jpg,.jpeg,.png"
//               style={{ display: 'none' }}
//               id="raised-button-file"
//               type="file"
//               onChange={handleFileChange}
//             />
//             <label htmlFor="raised-button-file">
//               <Button variant="contained" component="span" startIcon={<FileText />}>
//                 Upload Document
//               </Button>
//             </label>
//             {documentFile && (
//               <Typography variant="body2" className="mt-2">
//                 Selected file: {documentFile.name}
//               </Typography>
//             )}
//           </Box>
//         );
//       case 2:
//         return (
//           <Box>
//             <TextField
//               fullWidth
//               label="Certificate ID"
//               value={certificateId}
//               onChange={(e) => setCertificateId(e.target.value)}
//               required
//             />
//           </Box>
//         );
//       case 3:
//         return loading ? (
//           <Box className="text-center">
//             <CircularProgress />
//             <Typography>Verifying document...</Typography>
//             <Box className="flex justify-center mt-4">
//               <span className="loading loading-infinity loading-lg"></span>
//             </Box>
//           </Box>
//         ) : verificationResult ? (
//           <Box>
//             <Alert
//               severity={
//                 verificationResult.verification.status === 'Verified'
//                   ? 'success'
//                   : verificationResult.verification.status === 'Warning'
//                   ? 'warning'
//                   : 'error'
//               }
//             >
//               <AlertTitle>{verificationResult.verification.status}</AlertTitle>
//               Is Valid: {verificationResult.isValid ? 'Yes' : 'No'}
//             </Alert>
//             <Typography variant="body1" className="mt-4 mb-2">Verification Details:</Typography>
//             <List>
//               <ListItem>
//                 <ListItemIcon>
//                   {verificationResult.verification.details.fileHashMatch ? <CheckCircle color="success" /> : <Info color="error" />}
//                 </ListItemIcon>
//                 <ListItemText primary={`File Hash Match: ${verificationResult.verification.details.fileHashMatch ? 'Yes' : 'No'}`} />
//               </ListItem>
//               <ListItem>
//                 <ListItemIcon>
//                   {verificationResult.verification.details.blockchainHashValid ? <CheckCircle color="success" /> : <Info color="error" />}
//                 </ListItemIcon>
//                 <ListItemText primary={`Blockchain Hash Valid: ${verificationResult.verification.details.blockchainHashValid ? 'Yes' : 'No'}`} />
//               </ListItem>
//             </List>
//           </Box>
//         ) : null;
//       default:
//         return 'Unknown step';
//     }
//   };

//   return (
//     <Container maxWidth="md" className="mt-8 min-h-screen">
//       <Paper className="p-6">
//         <Typography variant="h4" className="mb-4">Verify Document</Typography>
//         <Stepper activeStep={activeStep} className="mb-6">
//           {steps.map((label) => (
//             <Step key={label}>
//               <StepLabel>{label}</StepLabel>
//             </Step>
//           ))}
//         </Stepper>
//         <Box className="mb-6">
//           {renderStepContent(activeStep)}
//         </Box>
//         {error && <Alert severity="error" className="mb-4">{error}</Alert>}
//         <Divider className="my-4" />
//         <Box className="flex justify-between">
//           <Button disabled={activeStep === 0 || loading} onClick={handleBack}>
//             Back
//           </Button>
//           <Button variant="contained" color="primary" onClick={handleNext} disabled={loading}>
//             {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default VerifyDocument;
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
  Divider,
  AppBar,
  Toolbar,
} from '@mui/material';
import { FileText, Image, CheckCircle, AlertTriangle, Info, FileCode } from 'lucide-react';
import axios from 'axios'; // Using axios for API calls

const VerifyDocument = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [documentType, setDocumentType] = useState('');
  const [documentFile, setDocumentFile] = useState(null);
  const [certificateId, setCertificateId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const steps = ['Select Document Type', 'Upload Document', 'Enter Certificate ID', 'Verification'];

  const documentTypes = [
    { value: 'birth_certificate', label: 'Birth Certificate', icon: <FileText className="mr-2" /> },
    { value: 'academic_transcript', label: 'Academic Transcript', icon: <FileCode className="mr-2" /> },
    { value: 'experience_certificate', label: 'Experience Certificate', icon: <Image className="mr-2" /> },
    { value: 'aadhar_card', label: 'Aadhaar Card', icon: <Image className="mr-2" /> },
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
    if (activeStep === 2 && !certificateId) {
      setError('Please enter a certificate ID');
      return;
    }
    if (activeStep === 3) {
      verifyDocument();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setError('');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setDocumentFile(file);
      setError('');
    } else {
      setError('File size should not exceed 5MB');
    }
  };

  const verifyDocument = async () => {
    const formData = new FormData();
    formData.append('file', documentFile);

    try {
      setLoading(true);
      setVerificationResult(null);
      
      // Make the API request to the /upload endpoint
      const response = await axios.post('https://trustscript-llg5.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Simulate a delay of 2.5 seconds for smooth UX
      setTimeout(() => {
        setVerificationResult(response.data);
        setLoading(false);
        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred during verification.');
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="body1" className="mb-4">
              Select the type of document you want to verify.
            </Typography>
            <TextField
              select
              fullWidth
              label="Document Type"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              SelectProps={{ native: true }}
            >
              <option value=""></option>
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
              Upload your document for verification.
            </Typography>
            <input
              accept=".jpg"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span" startIcon={<FileText />}>
                Upload Document (.jpg only)
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
        return (
          <Box>
            <TextField
              fullWidth
              label="Certificate ID"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              required
            />
          </Box>
        );
      case 3:
        return loading ? (
          <Box className="text-center">
            <CircularProgress />
            <Typography>Verifying document...</Typography>
            <Box className="flex justify-center mt-4">
              <span className="loading loading-infinity loading-lg"></span>
            </Box>
          </Box>
        ) : verificationResult ? (
          <Box>
            <Alert
              severity={
                verificationResult.status === 'VERIFIED'
                  ? 'success'
                  : 'error'
              }
            >
              <AlertTitle>{verificationResult.status}</AlertTitle>
              Aadhar Number: {verificationResult.extracted_data.AADHAR_NUMBER}
            </Alert>
            <Typography variant="body1" className="mt-4 mb-2">Extracted Data:</Typography>
            <List>
              {Object.keys(verificationResult.extracted_data).map((key) => (
                <ListItem key={key}>
                  <ListItemIcon>
                    {key === "AADHAR_NUMBER" ? <CheckCircle /> : key === "GENDER" ? <Info /> : <AlertTriangle />}
                  </ListItemIcon>
                  <ListItemText primary={`${key}: ${verificationResult.extracted_data[key]}`} />
                </ListItem>
              ))}
            </List>
          </Box>
        ) : null;
      default:
        return 'Unknown step';
    }
  };
  

  return (
    <Container maxWidth="md" className="mt-8 min-h-screen">
      <AppBar position="static">
        <Toolbar className='flex gap-2'>
          <Button sx={{border:2}} color="inherit" href="/login">Login</Button>
          <Button sx={{border:2}} color="inherit" href="/superadmin">SuperAdmin</Button>
        </Toolbar>
      </AppBar>

      <Paper className="p-6 mt-6">
        <Typography variant="h6" className="mb-4">
          This page is for showing the workflow of blockchain verification of document for the Ministry of Jal Shakti to demonstrate the workflow of the prototype. It currently contains no sensitive or production data. Users can test document verification features.
        </Typography>
        <Typography variant="body2" className="mb-4">
          To fully test this prototype, please login at <strong>/login</strong> and create an account with admin privileges at <strong>/superadmin</strong>.
        </Typography>

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
          <Button disabled={activeStep === 0 || loading} onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext} disabled={loading}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default VerifyDocument;

