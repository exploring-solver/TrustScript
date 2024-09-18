import React, { useState } from 'react';
import { Typography, TextField, Button, FormControlLabel, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { verifyCertificate } from '@/service/api';

const VerifierDashboard = () => {
    const [certificateId, setCertificateId] = useState('');
    const [useMLCheck, setUseMLCheck] = useState(false);
    const [verificationResult, setVerificationResult] = useState(null);
  
    const handleVerify = async () => {
      try {
        const { data } = await verifyCertificate(certificateId, useMLCheck);
        setVerificationResult(data.verification);
      } catch (error) {
        console.error('Verification failed:', error);
        setVerificationResult({ status: 'error', message: 'Verification failed' });
      }
    };
  
    return (
      <div>
        <Typography variant="h5" gutterBottom>Verifier Dashboard</Typography>
        <TextField
          fullWidth
          label="Certificate ID"
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Switch
              checked={useMLCheck}
              onChange={(e) => setUseMLCheck(e.target.checked)}
            />
          }
          label="Use ML Check"
        />
        <Button variant="contained" onClick={handleVerify} sx={{ mt: 2, mb: 2 }}>
          Verify Certificate
        </Button>
        {verificationResult && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>ML Check Performed</TableCell>
                  <TableCell>ML Check Result</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{verificationResult.status}</TableCell>
                  <TableCell>{verificationResult.mlCheckPerformed ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{verificationResult.mlCheckResult}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    );
  };
  
  export default VerifierDashboard;