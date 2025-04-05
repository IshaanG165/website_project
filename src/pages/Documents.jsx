import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Documents from '../components/Documents';

const DocumentsPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Building Documents
        </Typography>
        <Typography variant="body1" paragraph>
          Access important building documents, including bylaws, meeting minutes, and maintenance schedules.
          You can preview or download any document by clicking the respective icons.
        </Typography>
        <Documents />
      </Box>
    </Container>
  );
};

export default DocumentsPage;
