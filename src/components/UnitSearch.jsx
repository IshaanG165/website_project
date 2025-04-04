import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

const UnitSearch = () => {
  const [unitNumber, setUnitNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unitInfo, setUnitInfo] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUnitInfo(null);

    try {
      const response = await fetch(`/api/contact-request?unitNumber=${unitNumber}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer your-token-here' // Replace with actual token
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch unit information');
      }

      if (data.count === 0) {
        setError('No information found for this unit number');
      } else {
        setUnitInfo(data.data);
      }
    } catch (err) {
      setError(err.message || 'An error occurred while searching');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Search Unit Information
      </Typography>

      <Box component="form" onSubmit={handleSearch} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Unit Number"
          value={unitNumber}
          onChange={(e) => setUnitNumber(e.target.value)}
          required
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Search'}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {unitInfo && (
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Unit Information
          </Typography>
          <List>
            {unitInfo.map((request, index) => (
              <ListItem key={index} divider={index < unitInfo.length - 1}>
                <ListItemText
                  primary={`Request: ${request.subject}`}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        Status: {request.status}
                      </Typography>
                      <br />
                      Date: {new Date(request.timestamp).toLocaleDateString()}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default UnitSearch; 