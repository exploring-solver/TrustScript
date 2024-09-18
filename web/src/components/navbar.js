"use client";
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Divider,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People';
import ExploreIcon from '@mui/icons-material/Explore';
import AssessmentIcon from '@mui/icons-material/Assessment';
import HelpIcon from '@mui/icons-material/Help';
import Link from 'next/link';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    { text: 'Verify Document', icon: <VerifiedUserIcon />, link: '/verify' },
    { text: 'Upload Document', icon: <DescriptionIcon />, link: '/upload-doc' },
    { text: 'Blockchain Explorer', icon: <ExploreIcon />, link: '/explorer' },
    { text: 'Audit Logs', icon: <AssessmentIcon />, link: '/audit' },
    { text: 'Manage Users', icon: <PeopleIcon />, link: '/manage-user' },
    { text: 'Help Center', icon: <HelpIcon />, link: '/help' },
    { text: 'Manage User', icon: <HelpIcon />, link: '/manage-user' },
  ];

  const sidebarContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleSidebar}
      onKeyDown={toggleSidebar}
    >
      <List>
        {menuItems.map((item, index) => (
          <Link href={item.link} key={index} passHref>
            <ListItem button component="a">
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" className="bg-gradient-to-r from-blue-600 to-blue-800">
        <Toolbar className="justify-between">
          <div className="flex items-center">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Link href="/" passHref>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 'bold' }}>
                TrustScript
              </Typography>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            {!isMobile && menuItems.slice(0, 3).map((item, index) => (
              <Link href={item.link} key={index} passHref>
                <Button
                  color="inherit"
                  component="a"
                  startIcon={item.icon}
                  className="hover:bg-blue-700 transition-colors"
                >
                  {item.text}
                </Button>
              </Link>
            ))}
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
              <Link href={"/superadmin"}><MenuItem onClick={handleClose}>Super Admin</MenuItem></Link>
              <Link href={"/login"}><MenuItem onClick={handleClose}>Login</MenuItem></Link>
              <Link href={'/help'}><MenuItem onClick={handleClose} >Help</MenuItem></Link>
              <Link href={"/"}><MenuItem onClick={handleClose}>About Our solution(SIH-2024)</MenuItem></Link>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={toggleSidebar}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
}

export default Navbar;