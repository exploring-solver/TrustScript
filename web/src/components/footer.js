"use client";
import React from 'react';
import { 
    Typography, 
    Container, 
    Grid, 
    Link as MuiLink,
} from '@mui/material';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-8">
      <Container maxWidth="lg" className="py-6">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" className="mb-2">About TrustScript</Typography>
            <Typography variant="body2">
              Secure and efficient document verification platform powered by AI and blockchain technology.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" className="mb-2">Quick Links</Typography>
            <ul className="space-y-1">
              <li>
                <Link href="/" passHref>
                  <MuiLink color="inherit" className="hover:text-blue-300">Home</MuiLink>
                </Link>
              </li>
              <li>
                <Link href="/verify" passHref>
                  <MuiLink color="inherit" className="hover:text-blue-300">Verify</MuiLink>
                </Link>
              </li>
              <li>
                <Link href="/generate-report" passHref>
                  <MuiLink color="inherit" className="hover:text-blue-300">Generate Report</MuiLink>
                </Link>
              </li>
              <li>
                <Link href="/manage-user" passHref>
                  <MuiLink color="inherit" className="hover:text-blue-300">Manage Users</MuiLink>
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" className="mb-2">Contact Us</Typography>
            <Typography variant="body2">
              Email: info@docverify.com<br />
              Phone: +1 (555) 123-4567<br />
              Address: 123 Verification St, Secure City, 12345
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" className="text-center mt-4">
          © 2024 TrustScript. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
