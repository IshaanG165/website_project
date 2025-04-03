import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Chip, Button } from '@mui/material';

function Maintenance() {
  const maintenanceRequests = [
    {
      id: 1,
      title: 'Broken Elevator',
      description: 'The elevator on the north side is not working properly',
      status: 'In Progress',
      priority: 'High',
      date: '2025-04-01',
    },
    {
      id: 2,
      title: 'Garden Maintenance',
      description: 'Regular trimming and maintenance required for common area gardens',
      status: 'Scheduled',
      priority: 'Medium',
      date: '2025-04-05',
    },
    {
      id: 3,
      title: 'Pool Cleaning',
      description: 'Weekly pool cleaning and chemical balance check',
      status: 'Pending',
      priority: 'Low',
      date: '2025-04-07',
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'in progress': return 'primary';
      case 'scheduled': return 'info';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3} alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs>
          <Typography variant="h4">
            Maintenance Requests
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            New Request
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {maintenanceRequests.map((request) => (
          <Grid item xs={12} md={6} lg={4} key={request.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {request.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {request.description}
                </Typography>
                <Grid container spacing={1} sx={{ mt: 2 }}>
                  <Grid item>
                    <Chip
                      label={request.status}
                      color={getStatusColor(request.status)}
                      size="small"
                    />
                  </Grid>
                  <Grid item>
                    <Chip
                      label={request.priority}
                      color={getPriorityColor(request.priority)}
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Scheduled: {request.date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Maintenance;
