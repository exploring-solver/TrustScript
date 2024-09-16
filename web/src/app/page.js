"use client";
import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Grid, 
  Paper,
  List,
  ListItem,
  ListItemText,
  Button
} from '@mui/material';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Documents Verified',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Document Verifications',
      },
    },
  };

  return (
    <div className="min-h-screen ">
      

      <Container maxWidth="lg" className="mt-8 ">
        <Grid container spacing={3}>
          {/* Summary Cards */}
          <Grid item xs={12} md={4}>
            <Paper className="p-4 text-center">
              <Typography variant="h6" className="mb-2">Total Documents</Typography>
              <Typography variant="h4" className="font-bold text-blue-600">1,234</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className="p-4 text-center">
              <Typography variant="h6" className="mb-2">Verified Today</Typography>
              <Typography variant="h4" className="font-bold text-green-600">56</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className="p-4 text-center">
              <Typography variant="h6" className="mb-2">Pending Verification</Typography>
              <Typography variant="h4" className="font-bold text-yellow-600">23</Typography>
            </Paper>
          </Grid>

          {/* Chart */}
          <Grid item xs={12} md={8}>
            <Paper className="p-4">
              <Bar data={chartData} options={chartOptions} />
            </Paper>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12} md={4}>
            <Paper className="p-4">
              <Typography variant="h6" className="mb-2">Recent Activity</Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Birth Certificate Verified" secondary="2 minutes ago" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Academic Transcript Uploaded" secondary="15 minutes ago" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Experience Certificate Issued" secondary="1 hour ago" />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12}>
            <Paper className="p-4">
              <Typography variant="h6" className="mb-4">Quick Actions</Typography>
              <div className="flex flex-wrap gap-4">
                <Button  variant="contained" color="primary" className="btn btn-primary">
                  Verify New Document
                </Button>
                <Button variant="outlined" color="secondary" className="btn btn-secondary">
                  Generate Report
                </Button>
                <Button variant="outlined" className="btn btn-accent">
                  Manage Users
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;