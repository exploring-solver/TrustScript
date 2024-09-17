"use client";
import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const BlockchainExplorer = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Simulated blockchain data fetch
    const fetchData = async () => {
      const mockData = [
        { id: '0x123...', timestamp: '2024-09-17 10:30:15', documentHash: '0xabc...', issuer: 'University A' },
        { id: '0x456...', timestamp: '2024-09-17 11:45:22', documentHash: '0xdef...', issuer: 'Company B' },
        // Add more mock data as needed
      ];
      setRecords(mockData);
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Typography variant="h4" className="mb-4">Blockchain Explorer</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Document Hash</TableCell>
              <TableCell>Issuer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.id}</TableCell>
                <TableCell>{record.timestamp}</TableCell>
                <TableCell>{record.documentHash}</TableCell>
                <TableCell>{record.issuer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BlockchainExplorer;