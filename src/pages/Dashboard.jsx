import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Paper, Typography, Box, Divider, useTheme, CircularProgress, Alert } from '@mui/material';
import { AccountBalance, Build, Announcement, Group, Apartment, Event, Security, LocalParking } from '@mui/icons-material';

// Reusable card component for stats and building info
const InfoCard = memo(({ icon, title, value, height = 140 }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height,
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
      },
      '&:focus-within': {
        outline: '2px solid',
        outlineColor: 'primary.main',
        outlineOffset: 2,
      },
    }}
    role="article"
    aria-label={`${title} information card`}
    tabIndex={0}
  >
    <Box sx={{ color: 'primary.main', mb: 1 }}>
      {icon}
    </Box>
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {title}
    </Typography>
    <Typography component="p" variant="h4" sx={{ fontWeight: 500 }}>
      {value}
    </Typography>
  </Paper>
));

InfoCard.displayName = 'InfoCard';

InfoCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  height: PropTypes.number
};

// Reusable event card component
const EventCard = memo(({ icon, title, date }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: 80,
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
      },
      '&:focus-within': {
        outline: '2px solid',
        outlineColor: 'primary.main',
        outlineOffset: 2,
      },
    }}
    role="article"
    aria-label={`${title} event card`}
    tabIndex={0}
  >
    <Box sx={{ color: 'primary.main', mr: 2 }}>
      {icon}
    </Box>
    <Box>
      <Typography variant="h6" color="primary" sx={{ fontWeight: 500 }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {date}
      </Typography>
    </Box>
  </Paper>
));

EventCard.displayName = 'EventCard';

EventCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

// Default data arrays with fallback values
const defaultStats = [
  { id: 'admin-fund', title: 'Administration Fund', value: '$50,000', icon: <AccountBalance /> },
  { id: 'capital-fund', title: 'Capital Works Fund', value: '$100,000', icon: <AccountBalance /> },
  { id: 'maintenance', title: 'Pending Maintenance', value: '5', icon: <Build /> },
  { id: 'notices', title: 'Active Notices', value: '3', icon: <Announcement /> },
];

const defaultBuildingInfo = [
  { id: 'units', title: 'Total Units', value: '120', icon: <Apartment /> },
  { id: 'occupancy', title: 'Occupancy Rate', value: '95%', icon: <Group /> },
  { id: 'security', title: 'Security Staff', value: '24/7', icon: <Security /> },
  { id: 'parking', title: 'Parking Spaces', value: '150', icon: <LocalParking /> },
];

const defaultUpcomingEvents = [
  { id: 'agm', title: 'Annual General Meeting', date: '15 May 2024', icon: <Event /> },
  { id: 'maintenance', title: 'Building Maintenance', date: '20 May 2024', icon: <Build /> },
];

function Dashboard() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Use default data arrays with potential for future API integration
  const stats = defaultStats;
  const buildingInfo = defaultBuildingInfo;
  const upcomingEvents = defaultUpcomingEvents;

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Typography variant="body1" color="text.secondary">
          Please try refreshing the page or contact support if the problem persists.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 4 }, mb: { xs: 2, sm: 4 } }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          fontWeight: 600,
          color: 'primary.main',
          mb: { xs: 1, sm: 2 }
        }}
        role="heading"
        aria-level="1"
      >
        DLF Camellias
      </Typography>
      <Typography 
        variant="h6" 
        color="text.secondary" 
        gutterBottom
        sx={{ mb: { xs: 1, sm: 2 } }}
        role="heading"
        aria-level="2"
      >
        Welcome to your Strata Management Portal
      </Typography>
      <Typography 
        variant="body1" 
        paragraph 
        sx={{ 
          mb: { xs: 3, sm: 4 },
          maxWidth: '800px'
        }}
      >
        DLF Camellias is a premium residential complex located in NSW. This portal provides easy access to all your strata management needs, from financial information to maintenance requests.
      </Typography>
      
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          mt: { xs: 3, sm: 4 },
          fontWeight: 600,
          color: 'primary.main'
        }}
        role="heading"
        aria-level="2"
      >
        Financial Overview
      </Typography>
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {isLoading ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Grid>
        ) : (
          stats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.id}>
              <InfoCard {...stat} />
            </Grid>
          ))
        )}
      </Grid>

      <Divider sx={{ my: { xs: 3, sm: 4 } }} />

      <Typography 
        variant="h5" 
        gutterBottom
        sx={{ 
          fontWeight: 600,
          color: 'primary.main'
        }}
        role="heading"
        aria-level="2"
      >
        Building Information
      </Typography>
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {isLoading ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Grid>
        ) : (
          buildingInfo.map((info) => (
            <Grid item xs={12} sm={6} md={3} key={info.id}>
              <InfoCard {...info} height={120} />
            </Grid>
          ))
        )}
      </Grid>

      <Divider sx={{ my: { xs: 3, sm: 4 } }} />

      <Typography 
        variant="h5" 
        gutterBottom
        sx={{ 
          fontWeight: 600,
          color: 'primary.main'
        }}
        role="heading"
        aria-level="2"
      >
        Upcoming Events
      </Typography>
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {isLoading ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Grid>
        ) : (
          upcomingEvents.map((event) => (
            <Grid item xs={12} sm={6} key={event.id}>
              <EventCard {...event} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default Dashboard;
