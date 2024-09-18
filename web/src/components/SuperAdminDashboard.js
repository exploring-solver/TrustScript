import React, { useState } from 'react';
import { Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Snackbar } from '@mui/material';
import api, { register } from '@/service/api';

const SuperAdminDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      setSnackbar({ open: true, message: 'User registered successfully' });
      setFormData({ name: '', email: '', password: '', role: '' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to register user' });
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>SuperAdmin Dashboard</Typography>
      <Typography variant="h6" gutterBottom>Register New User</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Role</InputLabel>
          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <MenuItem value="issuer">Issuer</MenuItem>
            <MenuItem value="verifier">Verifier</MenuItem>
            <MenuItem value="individual">Individual</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Register User
        </Button>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  );
};

export default SuperAdminDashboard;