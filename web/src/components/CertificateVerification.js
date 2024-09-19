"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { verifyCertificate } from '@/service/api';

const CertificateVerification = () => {
  const [file, setFile] = useState(null);
  const [certificateId, setCertificateId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setVerificationResult(null);

    if (!file || !certificateId) {
      setError('Please provide both a file and a certificate ID.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('certificateId', certificateId);

    try {
      const response = await verifyCertificate(formData);
      setVerificationResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred during verification.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-6">Certificate Verification</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="certificateId" className="block text-sm font-medium text-gray-700">
            Certificate ID
          </label>
          <input
            type="text"
            id="certificateId"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
            Upload Certificate File
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Verify Certificate
        </button>
      </form>
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      {verificationResult && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <h2 className="font-bold">Verification Result:</h2>
          <p>Status: {verificationResult.verification.status}</p>
          <p>Is Valid: {verificationResult.isValid ? 'Yes' : 'No'}</p>
          {verificationResult.verification.details && (
            <>
              <p>File Hash Match: {verificationResult.verification.details.fileHashMatch ? 'Yes' : 'No'}</p>
              <p>Blockchain Hash Valid: {verificationResult.verification.details.blockchainHashValid ? 'Yes' : 'No'}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CertificateVerification;