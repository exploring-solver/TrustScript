"use client";
import React, { useState } from 'react';
import {
  Button,
  Typography,
  CircularProgress,
  Box,
  Alert,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material';
import { CloudUpload, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.size <= 10 * 1024 * 1024) { // 10MB limit
      setFile(selectedFile);
      setError('');
      setUploadResult(null);
    } else {
      setError('File size should not exceed 10MB');
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setUploadProgress(0);
    setError('');
    setUploadResult(null);

    // Simulating upload process with progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Simulating upload result
    setTimeout(() => {
      const results = [
        { status: 'success', message: 'Document uploaded successfully' },
        { status: 'warning', message: 'Document uploaded with warnings. Please review.' },
        { status: 'error', message: 'Upload failed. Please try again.' }
      ];
      const result = results[Math.floor(Math.random() * results.length)];
      setUploadResult(result);
      setUploading(false);
      if (result.status !== 'error') {
        setFile(null);
      }
    }, 500);
  };

  const acceptedFileTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];

  return (
    <Box className="max-w-2xl mx-auto p-6 min-h-screen bg-base-100">
      <Paper elevation={6} className="p-6 shadow-lg rounded-lg bg-white">
        <Typography variant="h4" className="mb-4 text-center text-primary">Document Upload</Typography>
        <Box className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
            accept={acceptedFileTypes.join(',')}
          />
          <label htmlFor="fileInput" className="cursor-pointer">
            <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
            <Typography variant="body1" className="mt-2">
              {file ? file.name : 'Click to select a file or drag and drop'}
            </Typography>
            <Typography variant="body2" color="textSecondary" className="mt-1">
              Accepted file types: {acceptedFileTypes.join(', ')}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Maximum file size: 10MB
            </Typography>
          </label>
        </Box>

        {error && <Alert severity="error" className="mb-4">{error}</Alert>}

        {file && !uploading && !uploadResult && (
          <Box className="mb-4">
            <Typography variant="body1">Selected File Details:</Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <FileText />
                </ListItemIcon>
                <ListItemText
                  primary={file.name}
                  secondary={`Size: ${(file.size / 1024 / 1024).toFixed(2)} MB`}
                />
              </ListItem>
            </List>
          </Box>
        )}

        {uploading && (
          <Box className="mb-4">
            <Typography variant="body2" color="textSecondary">Uploading...</Typography>
            <LinearProgress variant="determinate" value={uploadProgress} className="mt-2" />
          </Box>
        )}

        {uploadResult && (
          <Alert
            severity={uploadResult.status}
            className="mb-4"
            icon={uploadResult.status === 'success' ? <CheckCircle /> : <AlertTriangle />}
          >
            {uploadResult.message}
          </Alert>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full"
          startIcon={uploading ? <CircularProgress size={24} /> : <CloudUpload />}
        >
          {uploading ? 'Uploading...' : 'Upload Document'}
        </Button>
      </Paper>
    </Box>
  );
};

export default DocumentUpload;
