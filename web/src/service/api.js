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
export const getCertificates = () => api.get('/api/certificate/certificates');
export const getVerifications = () => api.get('/api/verification/verify');
export const verifyCertificate = (formData) => api.post('/api/verification/verify', formData,  {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export const createIndividualUser = (userData) => api.post('/api/auth/create-individual', userData);
export const issueCertificate = (formData) => api.post('/api/certificate/issue-certificate', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const getCertificateDetails = (id) => api.get(`/api/certificate/certificate/${id}`);
export const fetchIndividuals = () => api.get('/api/auth/individuals');
export const fetchVerifiers = () => api.get('/api/auth/verifiers');
export const fetchIssuers = () => api.get('/api/auth/issuers');

export default api;