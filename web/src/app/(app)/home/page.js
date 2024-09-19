"use client";
import React,{useState,useEffect} from 'react';
import { motion } from 'framer-motion';

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

const Carousel = ({ images }) => {
  

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg m-auto">
      {images.map((image, index) => (
        <motion.img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className="absolute w-full m-auto h-full object-fit"
          initial={{ opacity: 0, x: '100%' }}
          animate={{
            opacity: index === currentIndex ? 1 : 0,
            x: index === currentIndex ? '0%' : '-100%',
          }}
          transition={{ duration: 0.5 }}
        />
      ))}
    </div>
  );
};

const Dashboard = () => {
  const carouselImages = [
    '1.jpg',
    '3.jpg',
    '7.jpg',
    '11.jpg',
    '15.jpg',
  ];
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

          {/* Quick Actions
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-12 bg-white px-6 py-8 rounded-lg shadow-lg"
          >
          <h2 className="text-2xl font-semibold mb-4  text-center">Project Highlights</h2>
          <Carousel images={carouselImages} />
        </motion.div> */}

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