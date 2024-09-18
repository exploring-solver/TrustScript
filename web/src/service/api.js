// api.js
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email, password) => api.post('/api/auth/login', { email, password });
export const register = (name, email, password, role) => api.post('/api/auth/register', name, email, password, role );
export const issueCertificate = (type, ownerId, details) => api.post('/api/certificate/certificates', { type, ownerId, details });
export const getCertificates = () => api.get('/api/certificate/certificates');
export const verifyCertificate = (certificateId, useMLCheck) => api.post('/api/verification/verify', { certificateId, useMLCheck });

export default api;