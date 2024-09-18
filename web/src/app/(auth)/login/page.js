"use client"
import React, { useState } from 'react';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { login } from '@/service/api';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await login(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Set a timeout for 2.5 seconds before redirecting
      setTimeout(() => {
        router.push('/dashboard');
      }, 2500);
    } catch (error) {
      console.error('Login failed:', error);
      // If login fails, stop loading immediately
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        required
      />
      <Button 
        type="submit" 
        fullWidth 
        variant="contained" 
        sx={{ mt: 3 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
      </Button>
      {loading && (
        <Box className="flex justify-center mt-4">
          <span className="loading loading-infinity loading-lg"></span>
        </Box>
      )}
    </Box>
  );
};

export default LoginPage;