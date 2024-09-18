"use client";
import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import Layout from '@/components/Layout';
import IssuerDashboard from '@/components/IssuerDashboard';
import VerifierDashboard from '@/components/VerifierDashboard';
import IndividualDashboard from '@/components/IndividualDashboard';

const DashboardPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return null;

  return (
    <Layout>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {user.name}
        </Typography>
        {user.role === 'issuer' && <IssuerDashboard />}
        {user.role === 'verifier' && <VerifierDashboard />}
        {user.role === 'individual' && <IndividualDashboard />}
      </Box>
    </Layout>
  );
};

export default DashboardPage;