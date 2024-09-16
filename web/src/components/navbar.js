
"use client";
import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton,
  Menu,
  MenuItem,
  Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Link from 'next/link';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className="bg-blue-600">
      <Toolbar className="justify-between">
        <div className="flex items-center">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/" passHref>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
              TrustScript
            </Typography>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/verify" passHref>
            <Button color="inherit" component="a">Verify</Button>
          </Link>
          <Link href="/generate-report" passHref>
            <Button color="inherit" component="a">Generate Report</Button>
          </Link>
          <Link href="/manage-user" passHref>
            <Button color="inherit" component="a">Manage Users</Button>
          </Link>
          <IconButton size="large" aria-label="show notifications" color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;