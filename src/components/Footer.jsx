import React from 'react';
import { Box, Container, Typography, Grid, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { Email, Phone, LocationOn } from '@mui/icons-material';

function Footer() {
  const theme = useTheme();
  
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Strata Manager
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Professional strata management services for your property in New South Wales.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link to="/committee" style={{ 
                textDecoration: 'none',
                color: 'white'
              }} sx={{ 
                '&:hover': { color: theme.palette.secondary.light }
              }}>
                Committee Members
              </Link>
              <Link to="/maintenance" style={{ 
                textDecoration: 'none',
                color: 'white'
              }} sx={{ 
                '&:hover': { color: theme.palette.secondary.light }
              }}>
                Maintenance Requests
              </Link>
              <Link to="/documents" style={{ 
                textDecoration: 'none',
                color: 'white'
              }} sx={{ 
                '&:hover': { color: theme.palette.secondary.light }
              }}>
                Important Documents
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email fontSize="small" />
                <Typography variant="body2">
                  info@stratamanager.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone fontSize="small" />
                <Typography variant="body2">
                  +61 2 1234 5678
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn fontSize="small" />
                <Typography variant="body2">
                  123 Business Street, Sydney NSW 2000
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ 
          mt: 4, 
          pt: 2, 
          borderTop: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center'
        }}>
          <Typography variant="body2" color="rgba(255,255,255,0.7)">
            © {new Date().getFullYear()} Strata Manager. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
