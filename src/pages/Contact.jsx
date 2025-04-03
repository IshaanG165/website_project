import React from 'react';
import { Container, Typography } from '@mui/material';
import ContactForm from '../components/ContactForm';

function Contact() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <ContactForm />
    </Container>
  );
}

export default Contact;
