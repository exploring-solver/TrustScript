"use client";
import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Image from 'next/image';
import teamMembers from '@/constants/team';
import { Box, Typography, Container, Grid2, Paper, Button, Divider } from '@mui/material';

const AboutUs = () => {
  return (
    <Box py={8} className="min-h-screen bg-gray-50">
      <Container maxWidth="lg">
        {/* Company Title */}
        <Typography variant="h1" align="center" gutterBottom className="text-4xl font-bold mb-12 text-gray-800">
          TrustScript
        </Typography>

        {/* Vision Section */}
        <Box mb={8}>
          <Typography variant="h2" gutterBottom className="text-3xl font-semibold mb-4 text-gray-700">
            Our Vision
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph className="text-lg leading-relaxed">
            At TrustScript, we aim to transform the document verification process through the power of AI and blockchain. Our goal is to provide a secure, efficient platform that automates verification for institutions, individuals, and government bodies, ensuring authenticity while optimizing resources.
          </Typography>
        </Box>

        <Divider className="my-8" />

        {/* Problem Section */}
        <Box mb={8}>
          <Typography variant="h2" gutterBottom className="text-3xl font-semibold mb-4 text-gray-700">
            The Problem We&apos;re Solving
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph className="text-lg leading-relaxed">
            Current document verification processes are inefficient, prone to errors, and vulnerable to fraud. Government agencies, educational institutions, and employers struggle with ensuring the authenticity of key documents like certificates, IDs, and legal paperwork. TrustScript addresses these issues with a secure, AI-driven, blockchain-backed platform.
          </Typography>
        </Box>

        <Divider className="my-8" />

        {/* Solution Section */}
        <Box mb={8}>
          <Typography variant="h2" gutterBottom className="text-3xl font-semibold mb-4 text-gray-700">
            Our Solution
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph className="text-lg leading-relaxed mb-4">
            TrustScript is a comprehensive platform designed to streamline and secure document verification. Our features include:
          </Typography>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Immutable blockchain storage for tamper-proof document records</li>
            <li>AI-powered verification using advanced algorithms like OCR and YOLO</li>
            <li>Secure multi-factor authentication for authorized access</li>
            <li>Role-based access control for institutions and individuals</li>
            <li>Real-time updates and notifications</li>
            <li>Mobile and web accessibility</li>
            <li>Easy integration with existing systems through APIs</li>
          </ul>
        </Box>

        <Divider className="my-8" />

        {/* Team Section */}
        <Box mb={8}>
          <Typography variant="h2" gutterBottom className="text-3xl font-semibold mb-6 text-gray-700">
            Meet Our Team
          </Typography>
          <Grid2 container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid2 item xs={12} sm={6} md={4} key={index}>
                <Paper elevation={3} className="p-6 text-center transition-all duration-300 hover:shadow-lg">
                  <Image
                    src={member.image}
                    width={96}
                    height={96}
                    alt={member.name}
                    className="rounded-full mx-auto mb-4"
                  />
                  <Typography variant="h6" gutterBottom className="font-semibold text-gray-800">
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" className="mb-4">
                    {member.role}
                  </Typography>
                  <Box className="flex justify-center space-x-2">
                    {member.social.linkedin && (
                      <Button
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        color="primary"
                        startIcon={<LinkedInIcon />}
                        className="text-blue-600 hover:bg-blue-50"
                      >
                        LinkedIn
                      </Button>
                    )}
                    {member.social.github && (
                      <Button
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        startIcon={<GitHubIcon />}
                        className="text-gray-700 hover:bg-gray-100"
                      >
                        GitHub
                      </Button>
                    )}
                  </Box>
                </Paper>
              </Grid2>
            ))}
          </Grid2>
        </Box>

        <Divider className="my-8" />

        {/* Impact Section */}
        <Box mb={8}>
          <Typography variant="h2" gutterBottom className="text-3xl font-semibold mb-4 text-gray-700">
            Our Impact
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph className="text-lg leading-relaxed mb-4">
            With TrustScript, we aim to make a significant impact by:
          </Typography>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Improving document verification efficiency across sectors</li>
            <li>Enhancing security and reducing fraud through blockchain</li>
            <li>Streamlining processes for government and educational institutions</li>
            <li>Ensuring regulatory compliance and audit readiness</li>
            <li>Facilitating transparency in document handling</li>
          </ul>
        </Box>

        <Divider className="my-8" />

        {/* Get Involved Section */}
        <Box>
          <Typography variant="h2" gutterBottom className="text-3xl font-semibold mb-4 text-gray-700">
            Get Involved
          </Typography>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Explore our project on <a href="https://github.com/exploring-solver/TrustScript" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a></li>
            <li>Contact us to implement TrustScript in your organization</li>
          </ul>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;