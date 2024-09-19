"use client";
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Bar } from 'recharts';
import { motion } from 'framer-motion';
import { Button, Container, Grid, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import Link from 'next/link';

const certificateData = [
    { month: 'Jan', issued: 200, verified: 180 },
    { month: 'Feb', issued: 300, verified: 250 },
    { month: 'Mar', issued: 400, verified: 350 },
    { month: 'Apr', issued: 500, verified: 450 },
    { month: 'May', issued: 600, verified: 550 },
    { month: 'Jun', issued: 700, verified: 650 },
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

const certificateTypes = [
    { name: 'Birth Certificates', value: 30 },
    { name: 'Academic Transcripts', value: 40 },
    { name: 'Experience Letters', value: 30 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="relative w-full h-64 overflow-hidden rounded-lg">
            {images.map((image, index) => (
                <motion.img
                    key={index}
                    src={image}
                    alt={`TrustScript Feature ${index + 1}`}
                    className="absolute w-full h-full object-fit"
                    initial={{ opacity: 0, x: '100%' }}
                    animate={{
                        opacity: index === currentIndex ? 1 : 0,
                        x: index === currentIndex ? '0%' : '-100%',
                    }}
                    transition={{ duration: 0.5 }}
                />
            ))}
            <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
                &#10094;
            </button>
            <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
                &#10095;
            </button>
        </div>
    );
};

const TrustScriptHomepage = () => {
    const carouselImages = [
        '/imgs/1.jpg',
        '/imgs/2.jpg',
        '/imgs/3.jpg',
        '/imgs/4.jpg',
        '/imgs/5.jpg',
        '/imgs/6.jpg',
    ];

    return (
        <div className="min-h-screen py-12 px-6 bg-gradient-to-r from-blue-100 to-green-100">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <h1 className="text-5xl font-bold text-blue-800 mb-4">TrustScript</h1>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                    Revolutionizing digital certificate management with blockchain-powered verification
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white p-8 rounded-lg shadow-xl"
                >
                    <h2 className="text-3xl font-semibold mb-6 text-blue-700">Our Solution</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        TrustScript provides a secure and efficient platform for issuing, verifying, and managing digital certificates using blockchain technology.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Tamper-proof digital certificates</li>
                        <li>Instant verification by authorized entities</li>
                        <li>Streamlined issuing process for authorities</li>
                        <li>Easy access and sharing for individuals</li>
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white p-8 rounded-lg shadow-xl"
                >
                    <h2 className="text-3xl font-semibold mb-6 text-blue-700">How It Works</h2>
                    <Carousel images={carouselImages} />
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white p-8 rounded-lg shadow-xl mb-16"
            >
                <h2 className="text-3xl font-semibold mb-6 text-blue-700">Certificate Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600">Certificates Issued vs. Verified</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={certificateData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="issued" stroke="#8884d8" name="Certificates Issued" />
                                <Line type="monotone" dataKey="verified" stroke="#82ca9d" name="Certificates Verified" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600">Certificate Types Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={certificateTypes}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {certificateTypes.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </motion.div>
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

                    <Grid item xs={12}>
                        <Paper className="p-4">
                            <Typography variant="h6" className="mb-4">Quick Actions</Typography>
                            <div className="flex flex-wrap gap-4">
                                <Button variant="contained" color="primary" className="btn btn-primary">
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
            <br></br>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="bg-white p-6 rounded-lg shadow-xl text-center"
                >
                    <h3 className="text-2xl font-semibold mb-4 text-blue-700">For Issuing Authorities</h3>
                    <p className="text-gray-600 mb-4">Easily issue and manage digital certificates with blockchain security.</p>
                    <Link href={'/superadmin'}>

                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                            Issue Certificates
                        </button>
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="bg-white p-6 rounded-lg shadow-xl text-center"
                >
                    <h3 className="text-2xl font-semibold mb-4 text-blue-700">For Verifying Authorities</h3>
                    <p className="text-gray-600 mb-4">Instantly verify the authenticity of certificates using our platform.</p>
                    <Link href={'/superadmin'}>

                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                            Verify Certificates
                        </button>
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="bg-white p-6 rounded-lg shadow-xl text-center"
                >
                    <h3 className="text-2xl font-semibold mb-4 text-blue-700">For Individuals</h3>
                    <p className="text-gray-600 mb-4">Access and share your digital certificates securely and easily.</p>
                    <Link href={'/superadmin'}>

                        <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                            Manage Your Certificates
                        </button>
                    </Link>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="text-center"
            >
                <h2 className="text-3xl font-semibold mb-6 text-blue-700">Get Started with TrustScript</h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                    Join the digital revolution in certificate management. Secure, efficient, and transparent.
                </p>
                <Link href={'/superadmin'}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300"
                    >
                        Sign Up Now
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
};

export default TrustScriptHomepage;