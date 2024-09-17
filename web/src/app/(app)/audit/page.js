"use client"
import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Simulated log data fetch
    const fetchLogs = async () => {
      const mockLogs = [
        { id: 1, action: 'Document Upload', user: 'john@example.com', timestamp: '2024-09-17 09:15:30' },
        { id: 2, action: 'Verification Request', user: 'verifier@gov.org', timestamp: '2024-09-17 10:30:45' },
        { id: 3, action: 'Document Viewed', user: 'jane@company.com', timestamp: '2024-09-17 11:45:00' },
        // Add more mock log entries as needed
      ];
      setLogs(mockLogs);
    };
    fetchLogs();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen">
      <Typography variant="h4" className="mb-4">Audit Logs</Typography>
      <List>
        {logs.map((log, index) => (
          <React.Fragment key={log.id}>
            <ListItem>
              <ListItemText
                primary={log.action}
                secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body2" color="text.primary">
                      {log.user}
                    </Typography>
                    {" — " + log.timestamp}
                  </React.Fragment>
                }
              />
            </ListItem>
            {index < logs.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default AuditLogs;