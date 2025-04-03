import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useTheme } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Home, Group, AttachMoney, Build, Description, Notifications, Email } from '@mui/icons-material';

function Navbar() {
  const theme = useTheme();
  const location = useLocation();

  const navItems = [
    { text: 'Dashboard', path: '/', icon: <Home /> },
    { text: 'Committee', path: '/committee', icon: <Group /> },
    { text: 'Finance', path: '/finance', icon: <AttachMoney /> },
    { text: 'Maintenance', path: '/maintenance', icon: <Build /> },
    { text: 'Documents', path: '/documents', icon: <Description /> },
    { text: 'Notices', path: '/notices', icon: <Notifications /> },
    { text: 'Contact', path: '/contact', icon: <Email /> },
  ];

  const isActive = (path) => location.pathname === path;
  return (
    <AppBar position="static" sx={{
      backgroundColor: theme.palette.primary.main,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/"
          sx={{ 
            color: 'white',
            textDecoration: 'none',
            fontWeight: 600,
            letterSpacing: '0.5px',
            '&:hover': {
              color: theme.palette.secondary.light
            }
          }}
        >
          Strata Manager
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              component={Link}
              to={item.path}
              startIcon={item.icon}
              sx={{
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  width: isActive(item.path) ? '100%' : '0%',
                  height: '2px',
                  backgroundColor: 'white',
                  transition: 'all 0.3s ease-in-out',
                  transform: 'translateX(-50%)'
                },
                '&:hover:after': {
                  width: '100%'
                },
                ...(isActive(item.path) && {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                })
              }}
            >
              {item.text}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
