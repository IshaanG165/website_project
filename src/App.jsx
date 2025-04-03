import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Committee from './pages/Committee';
import Finance from './pages/Finance';
import Maintenance from './pages/Maintenance';
import Contact from './pages/Contact';
import Documents from './pages/Documents';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Navbar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          py: 3,
          px: 2,
          backgroundColor: 'background.default'
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/notices" element={<div>Notices Page (Coming Soon)</div>} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
