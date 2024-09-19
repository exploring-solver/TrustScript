"use client";
import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TextField, 
  Button, 
  Box,
  Chip,
  Pagination
} from '@mui/material';
import { Search, RefreshCw } from 'lucide-react';

const BlockchainExplorer = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const rowsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = records.filter(record => 
      record.id.toLowerCase().includes(search.toLowerCase()) ||
      record.documentHash.toLowerCase().includes(search.toLowerCase()) ||
      record.issuer.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRecords(filtered);
  }, [search, records]);

  const fetchData = async () => {
    setLoading(true);
    // Simulated blockchain data fetch
    const mockData = Array.from({ length: 50 }, (_, i) => ({
      id: `0x${Math.random().toString(16).substr(2, 8)}...`,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().replace('T', ' ').substr(0, 19),
      documentHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      issuer: ['University A', 'Company B', 'Government Agency C', 'Institution D'][Math.floor(Math.random() * 4)],
      status: Math.random() > 0.2 ? 'Verified' : 'Pending'
    }));
    setRecords(mockData);
    setLoading(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      <Typography variant="h4" className="mb-6 text-blue-800 font-bold">Blockchain Explorer</Typography>
      
      <Box className="mb-4 flex justify-between items-center">
        <TextField 
          variant="outlined"
          size="small"
          placeholder="Search by TX ID, Document Hash, or Issuer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: <Search className="mr-2 text-gray-400" size={20} />,
          }}
          className="w-96"
        />
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<RefreshCw size={20} />}
          onClick={handleRefresh}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Refresh
        </Button>
      </Box>

      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell className="font-bold">Transaction ID</TableCell>
              <TableCell className="font-bold">Timestamp</TableCell>
              <TableCell className="font-bold">Document Hash</TableCell>
              <TableCell className="font-bold">Issuer</TableCell>
              <TableCell className="font-bold">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">Loading...</TableCell>
              </TableRow>
            ) : filteredRecords.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((record) => (
              <TableRow key={record.id} className="hover:bg-gray-50">
                <TableCell className="font-mono">{record.id}</TableCell>
                <TableCell>{record.timestamp}</TableCell>
                <TableCell className="font-mono">{`${record.documentHash.substr(0, 6)}...${record.documentHash.substr(-6)}`}</TableCell>
                <TableCell>{record.issuer}</TableCell>
                <TableCell>
                  <Chip 
                    label={record.status} 
                    color={record.status === 'Verified' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box className="mt-4 flex justify-center">
        <Pagination 
          count={Math.ceil(filteredRecords.length / rowsPerPage)} 
          page={page} 
          onChange={handleChangePage} 
          color="primary" 
        />
      </Box>
    </div>
  );
};

export default BlockchainExplorer;