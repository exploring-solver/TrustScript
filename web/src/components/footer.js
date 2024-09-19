"use client";
import React from 'react';
import {
  Typography,
  Container,
  Grid2,
  Link as MuiLink,
  Box,
  Divider,
  IconButton,
} from '@mui/material';
import Link from 'next/link';

function Footer() {
  const socialIcons = [
    { name: 'GitHub', link: "https://github.com/exploring-solver/TrustScript" },
    { name: 'Twitter', link: "twitter.com/home" },
    { name: 'LinkedIn', link: "/" },
    
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-8 overflow-x-hidden">
      <Container maxWidth="lg" className="py-12">
        <Grid2 container spacing={4}>
          <Grid2 item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="mb-4 font-bold">About TrustScript</Typography>
            <Typography variant="body2" className="mb-4">
              Secure and efficient document verification platform powered by AI and blockchain technology.
            </Typography>
            <Box className="flex space-x-2">
              {socialIcons.map(({ name, link }, index) => (
                <IconButton
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  className="text-gray-400 hover:text-white"
                >
                  {name[0]}
                </IconButton>
              ))}
            </Box>
          </Grid2>
          <Grid2 item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="mb-4 font-bold">Quick Links</Typography>
            <ul className="space-y-2">
              {[
                { href: "/", text: "Home" },
                { href: "/verify", text: "Verify Document" },
                { href: "/upload-doc", text: "Upload Document" },
                { href: "/explorer", text: "Blockchain Explorer" },
                { href: "/audit", text: "Audit Logs" },
                { href: "/help", text: "Help Center" },
              ].map((link, index) => (
                <li key={index}>
                  <Link href={link.href} passHref>
                    <MuiLink color="inherit" className="hover:text-blue-300 transition-colors">
                      {link.text}
                    </MuiLink>
                  </Link>
                </li>
              ))}
            </ul>
          </Grid2>
          <Grid2 item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="mb-4 font-bold">Our Services</Typography>
            <ul className="space-y-2">
              {[
                "AI-Powered Verification",
                "Blockchain Certification",
                "Secure Document Storage",
                "Real-time Auditing",
                "Custom Integration",
              ].map((service, index) => (
                <li key={index} className="text-gray-300">{service}</li>
              ))}
            </ul>
          </Grid2>
          <Grid2 item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="mb-4 font-bold">Contact Us</Typography>
            <Typography variant="body2" className="mb-2">
              Email: anshjain9159@gmail.com
            </Typography>
            <Typography variant="body2" className="mb-2">
              Phone: +91 (XXX) XXX-XXXX
            </Typography>
            <Typography variant="body2">
              Address: CSE Block, MAIT Delhi
            </Typography>
          </Grid2>
        </Grid2>
        <Divider className="my-8 bg-gray-600" />
        <Box className="flex flex-col sm:flex-row justify-between items-center">
          <Typography variant="body2" className="text-center sm:text-left mb-4 sm:mb-0">
            © 2024 TrustScript. All rights reserved.
          </Typography>
          
        </Box>
      </Container>
    </footer>
  );
}

export default Footer;