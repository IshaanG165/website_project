import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import { AccountBalance, Build, Announcement, Group } from '@mui/icons-material';

function Dashboard() {
  const stats = [
    { title: 'Administration Fund', value: '$50,000', icon: <AccountBalance /> },
    { title: 'Capital Works Fund', value: '$100,000', icon: <AccountBalance /> },
    { title: 'Pending Maintenance', value: '5', icon: <Build /> },
    { title: 'Active Notices', value: '3', icon: <Announcement /> },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        DLF Camellias
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: 140,
              }}
            >
              <Box sx={{ color: 'primary.main', mb: 1 }}>
                {stat.icon}
              </Box>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                {stat.title}
              </Typography>
              <Typography component="p" variant="h4">
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Dashboard;
