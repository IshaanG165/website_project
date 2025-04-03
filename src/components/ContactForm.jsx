import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
} from '@mui/material';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    unit: '',
    category: '',
    message: '',
  });

  const [searchParams, setSearchParams] = useState({
    unitNumber: '',
  });

  const [submitStatus, setSubmitStatus] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle POST request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real application, this would be your API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Form submitted successfully!' });
        setFormData({ name: '', email: '', unit: '', category: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: 'Failed to submit form.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Failed to submit form.' });
    }
  };

  // Handle GET request
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // In a real application, this would be your API endpoint with query parameters
      const queryString = new URLSearchParams(searchParams).toString();
      const response = await fetch(`/api/units?${queryString}`);
      
      if (response.ok) {
        const data = await response.json();
        setSearchResult({ type: 'success', data });
      } else {
        setSearchResult({ type: 'error', message: 'Unit not found.' });
      }
    } catch (error) {
      setSearchResult({ type: 'error', message: 'Failed to search unit.' });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* GET Request Form */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Search Unit Information (GET Request)
        </Typography>
        <form onSubmit={handleSearch}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Unit Number"
                name="unitNumber"
                value={searchParams.unitNumber}
                onChange={handleSearchChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Search
              </Button>
            </Grid>
          </Grid>
        </form>
        {searchResult && (
          <Alert severity={searchResult.type} sx={{ mt: 2 }}>
            {searchResult.type === 'success' 
              ? `Unit ${searchParams.unitNumber} found!` 
              : searchResult.message}
          </Alert>
        )}
      </Paper>

      {/* POST Request Form */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Contact Form (POST Request)
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Unit Number"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Category"
                >
                  <MenuItem value="maintenance">Maintenance</MenuItem>
                  <MenuItem value="complaint">Complaint</MenuItem>
                  <MenuItem value="general">General Inquiry</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        {submitStatus && (
          <Alert severity={submitStatus.type} sx={{ mt: 2 }}>
            {submitStatus.message}
          </Alert>
        )}
      </Paper>
    </Box>
  );
}

export default ContactForm;
