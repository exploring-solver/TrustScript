"use client";
import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  FormControlLabel,
  Checkbox,
  Grid,
  CircularProgress
} from '@mui/material';

const GenerateReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportTypes, setReportTypes] = useState({
    verifications: false,
    rejections: false,
    userActivity: false,
  });
  const [generating, setGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const handleCheckboxChange = (event) => {
    setReportTypes({ ...reportTypes, [event.target.name]: event.target.checked });
  };

  const handleGenerateReport = () => {
    setGenerating(true);
    // Simulate report generation process
    setTimeout(() => {
      setGenerating(false);
      setReportGenerated(true);
    }, 3000);
  };

  return (
    <Container maxWidth="md" className="mt-8 min-h-screen">
      <Paper className="p-6">
        <Typography variant="h4" className="mb-4">Generate Report</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date (YYYY-MM-DD)"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="End Date (YYYY-MM-DD)"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" className="mb-2">Report Types</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={reportTypes.verifications}
                  onChange={handleCheckboxChange}
                  name="verifications"
                />
              }
              label="Verifications"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={reportTypes.rejections}
                  onChange={handleCheckboxChange}
                  name="rejections"
                />
              }
              label="Rejections"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={reportTypes.userActivity}
                  onChange={handleCheckboxChange}
                  name="userActivity"
                />
              }
              label="User Activity"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateReport}
              disabled={!startDate || !endDate || !Object.values(reportTypes).some(Boolean) || generating}
            >
              Generate Report
            </Button>
          </Grid>
        </Grid>
        {generating && (
          <div className="text-center mt-4">
            <CircularProgress />
            <Typography>Generating report...</Typography>
          </div>
        )}
        {reportGenerated && (
          <div className="mt-4">
            <Typography variant="h6" color="success">Report Generated Successfully</Typography>
            <Button variant="outlined" color="primary" className="mt-2">
              Download Report
            </Button>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default GenerateReport;
