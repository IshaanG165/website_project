import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import ContactForm from '../components/ContactForm';
import UnitSearch from '../components/UnitSearch';

const Contact = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          Have a question or need assistance? Fill out the form below or search for your unit information.
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <UnitSearch />
        </Box>
        
        <Box>
          <ContactForm />
        </Box>
      </Box>
    </Container>
  );
};

export default Contact;
