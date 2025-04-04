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
  ListItemText,
  Chip,
  Divider
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
      const response = await fetch(`/api/contact-request?unitNumber=${unitNumber}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch unit information');
      }

      if (!data.success) {
        setError('Unit not found');
      } else {
        setUnitInfo(data.data);
      }
    } catch (err) {
      setError(err.message || 'An error occurred while searching');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'warning';
      case 'pending':
        return 'info';
      default:
        return 'default';
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
          placeholder="e.g., 101, 102, 201"
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
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Unit {unitInfo.unitNumber} Information
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              Owner: {unitInfo.owner}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Contact: {unitInfo.contact}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" gutterBottom>
            Recent Requests
          </Typography>
          
          <List>
            {unitInfo.recentRequests.map((request, index) => (
              <ListItem key={index} divider={index < unitInfo.recentRequests.length - 1}>
                <ListItemText
                  primary={request.subject}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        Request ID: {request.requestId}
                      </Typography>
                      <br />
                      Date: {new Date(request.timestamp).toLocaleDateString()}
                    </>
                  }
                />
                <Chip
                  label={request.status}
                  color={getStatusColor(request.status)}
                  size="small"
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