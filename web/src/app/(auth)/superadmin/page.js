"use client";
import React from 'react';
import { Typography, Box, Alert, Container } from '@mui/material';
import SuperAdminDashboard from '@/components/SuperAdminDashboard';

const SuperAdminPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="body1">
            <strong>Disclaimer:</strong> This page is for testing and demonstration purposes only, intended for the Ministry of Jal Shakti to showcase the prototype functionality. It does not contain any sensitive or real user data at this time. The information presented here is purely for illustrative purposes and should not be considered as actual operational data.
          </Typography>
        </Alert>
        <Typography variant="h4" component="h1" gutterBottom>
          Super Admin Dashboard
        </Typography>
        <Typography variant="body1" paragraph>
          This prototype demonstrates the key features and functionalities of the super admin interface. It is designed to provide an overview of the system's capabilities in managing water resources and related data. Please note that all interactions within this prototype are simulated and do not affect any real-world systems or data.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <SuperAdminDashboard />
        </Box>
      </Box>
    </Container>
  );
};

export default SuperAdminPage;