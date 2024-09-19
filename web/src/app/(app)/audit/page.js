"use client";
import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Divider, Paper, Box } from '@mui/material';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Simulated log data fetch
    const fetchLogs = async () => {
      const mockLogs = [
        { id: 1, action: 'Document Upload', user: 'john@example.com', timestamp: '2024-09-17 09:15:30' },
        { id: 2, action: 'Verification Request', user: 'verifier@gov.org', timestamp: '2024-09-17 10:30:45' },
        { id: 3, action: 'Document Viewed', user: 'jane@company.com', timestamp: '2024-09-17 11:45:00' },
        { id: 4, action: 'Document Approved', user: 'admin@company.com', timestamp: '2024-09-17 12:00:00' },
        { id: 5, action: 'Document Rejected', user: 'reviewer@company.com', timestamp: '2024-09-17 13:15:00' },
        { id: 6, action: 'Document Updated', user: 'john@example.com', timestamp: '2024-09-17 14:30:00' },
        { id: 7, action: 'Document Deleted', user: 'admin@company.com', timestamp: '2024-09-17 15:45:00' },
        // Add more mock log entries as needed
      ];
      setLogs(mockLogs);
    };
    fetchLogs();
  }, []);

  return (
    <Box className="max-w-3xl mx-auto p-6 min-h-screen">
      <Paper elevation={3} className="p-6 shadow-lg bg-base-100 rounded-lg">
        <Typography variant="h4" className="mb-4 text-center text-primary">Audit Logs</Typography>
        <List>
          {logs.map((log, index) => (
            <React.Fragment key={log.id}>
              <ListItem className="bg-base-200 rounded-lg my-2">
                <ListItemText
                  primary={
                    <Typography variant="h6" className="text-primary">
                      {log.action}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography component="span" variant="body2" color="text.secondary">
                        {log.user}
                      </Typography>
                      {" — " + log.timestamp}
                    </React.Fragment>
                  }
                />
              </ListItem>
              {index < logs.length - 1 && <Divider className="my-2" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default AuditLogs;
