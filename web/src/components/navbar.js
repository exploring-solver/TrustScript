"use client";
import React, { useState,useEffect } from 'react';
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
  Box,
  Modal,
  Backdrop,
  Fade,
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
import { AllInboxOutlined } from '@mui/icons-material';
import Link from 'next/link';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleNotification = () => {
    setNotificationOpen(!notificationOpen);
  };

  const menuItems = [
    { text: 'Verify Document', icon: <VerifiedUserIcon />, link: '/verify' },
    { text: 'Upload Document', icon: <DescriptionIcon />, link: '/upload-doc' },
    { text: 'Blockchain Explorer', icon: <ExploreIcon />, link: '/explorer' },
    { text: 'Audit Logs', icon: <AssessmentIcon />, link: '/audit' },
    { text: 'Manage Users', icon: <PeopleIcon />, link: '/manage-user' },
    { text: 'Help Center', icon: <HelpIcon />, link: '/help' },
    { text: 'About Us', icon: <AllInboxOutlined />, link: '/about' },
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
            <ListItem button component="a" className="hover:bg-blue-50 transition-colors">
              <ListItemIcon className="text-blue-600">{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} className="text-gray-800" />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const notifications = [
    { id: 1, message: 'Document verification completed.', timestamp: '2024-09-17 09:15:30' },
    { id: 2, message: 'New document uploaded by John Doe.', timestamp: '2024-09-17 10:30:45' },
    { id: 3, message: 'Document review required.', timestamp: '2024-09-17 11:45:00' },
    { id: 4, message: 'System update available.', timestamp: '2024-09-17 12:00:00' },
  ];

  return (
    <>
      <AppBar position="static" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300   ${isScrolled ? 'bg-gradient-to-r  from-blue-600 to-blue-800 shadow-md' : 'bg-gradient-to-r  from-blue-600 to-blue-800 shadow-md'}`}>
        <Toolbar className="justify-between px-4">
          <div className="flex items-center">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar}
              className="mr-2 hover:bg-blue-700 transition-colors"
            >
              <MenuIcon />
            </IconButton>
            <Link href="/" passHref>
              <Typography variant="h6" component="div" className="cursor-pointer font-bold text-white hover:text-blue-200 transition-colors">
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
                  className="hover:bg-blue-700 transition-colors text-sm"
                >
                  {item.text}
                </Button>
              </Link>
            ))}
            <IconButton size="large" aria-label="show notifications" color="inherit" onClick={toggleNotification} className="hover:bg-blue-700 transition-colors">
              <NotificationsIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              className="hover:bg-blue-700 transition-colors"
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
              <MenuItem onClick={handleClose} className="hover:bg-blue-50 transition-colors">
                <Link href="/superadmin" className="text-gray-800 no-underline">Super Admin</Link>
              </MenuItem>
              <MenuItem onClick={handleClose} className="hover:bg-blue-50 transition-colors">
                <Link href="/login" className="text-gray-800 no-underline">Login</Link>
              </MenuItem>
              <MenuItem onClick={handleClose} className="hover:bg-blue-50 transition-colors">
                <Link href="/help" className="text-gray-800 no-underline">Help</Link>
              </MenuItem>
              <MenuItem onClick={handleClose} className="hover:bg-blue-50 transition-colors">
                <Link href="/about" className="text-gray-800 no-underline">About Our Solution (SIH-2024)</Link>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={toggleSidebar}
        classes={{ paper: "bg-white" }}
      >
        {sidebarContent}
      </Drawer>
      <Modal
        open={notificationOpen}
        onClose={toggleNotification}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={notificationOpen}>
          <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-96">
            <Typography variant="h6" className="mb-4 text-center text-gray-800">Notifications</Typography>
            <List>
              {notifications.map((notification) => (
                <ListItem key={notification.id} className="border-b border-gray-200">
                  <ListItemText
                    primary={notification.message}
                    secondary={notification.timestamp}
                  />
                </ListItem>
              ))}
            </List>
            <Button
              variant="contained"
              color="primary"
              onClick={toggleNotification}
              className="mt-4 w-full"
            >
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default Navbar;
