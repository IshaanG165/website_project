import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Card, CardContent, Typography, Avatar, Box, Divider } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';

// Memoized card component for better performance
const CommitteeCard = memo(({ member }) => (
  <Card 
    sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
      },
      '&:focus-within': {
        outline: '2px solid',
        outlineColor: 'primary.main',
        outlineOffset: 2,
      }
    }}
    role="article"
    aria-label={`Committee member card for ${member.name}`}
    tabIndex={0}
  >
    <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
      <Avatar
        sx={{
          width: 100,
          height: 100,
          margin: '0 auto',
          marginBottom: 2,
          bgcolor: 'primary.main',
          fontSize: '2rem',
          fontWeight: 500
        }}
        aria-label={`Avatar for ${member.name}`}
      >
        {member.name.split(' ').map(n => n[0]).join('')}
      </Avatar>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        {member.name}
      </Typography>
      <Typography 
        color="primary" 
        sx={{ 
          fontWeight: 500,
          mb: 2
        }}
      >
        {member.role}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ textAlign: 'left', mt: 2 }}>
        <Typography 
          variant="body2" 
          sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
          component="a"
          href={`mailto:${member.email}`}
        >
          <Email sx={{ mr: 1, fontSize: 20 }} />
          {member.email}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
          component="a"
          href={`tel:${member.phone}`}
        >
          <Phone sx={{ mr: 1, fontSize: 20 }} />
          {member.phone}
        </Typography>
        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOn sx={{ mr: 1, fontSize: 20 }} />
          {member.unit}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Term: {member.term}
        </Typography>
      </Box>
    </CardContent>
  </Card>
));

CommitteeCard.displayName = 'CommitteeCard';

CommitteeCard.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    term: PropTypes.string.isRequired
  }).isRequired
};

// Committee data
const committeeMembers = [
  { 
    id: 'chair',
    name: 'John Smith', 
    role: 'Chairperson', 
    email: 'chair@strata.com',
    phone: '+61 400 123 456',
    unit: 'Unit 101',
    term: '2023-2025'
  },
  { 
    id: 'secretary',
    name: 'Jane Doe', 
    role: 'Secretary', 
    email: 'secretary@strata.com',
    phone: '+61 400 234 567',
    unit: 'Unit 205',
    term: '2023-2025'
  },
  { 
    id: 'treasurer',
    name: 'Mike Johnson', 
    role: 'Treasurer', 
    email: 'treasurer@strata.com',
    phone: '+61 400 345 678',
    unit: 'Unit 302',
    term: '2023-2025'
  },
  { 
    id: 'member1',
    name: 'Sarah Wilson', 
    role: 'Member', 
    email: 'member1@strata.com',
    phone: '+61 400 456 789',
    unit: 'Unit 104',
    term: '2023-2025'
  },
  { 
    id: 'member2',
    name: 'David Chen', 
    role: 'Member', 
    email: 'member2@strata.com',
    phone: '+61 400 567 890',
    unit: 'Unit 208',
    term: '2023-2025'
  },
  { 
    id: 'member3',
    name: 'Emma Thompson', 
    role: 'Member', 
    email: 'member3@strata.com',
    phone: '+61 400 678 901',
    unit: 'Unit 305',
    term: '2023-2025'
  },
  { 
    id: 'member4',
    name: 'James Wilson', 
    role: 'Member', 
    email: 'member4@strata.com',
    phone: '+61 400 789 012',
    unit: 'Unit 107',
    term: '2023-2025'
  },
  { 
    id: 'member5',
    name: 'Lisa Anderson', 
    role: 'Member', 
    email: 'member5@strata.com',
    phone: '+61 400 890 123',
    unit: 'Unit 210',
    term: '2023-2025'
  }
];

/**
 * Committee component displays the list of committee members for the strata scheme.
 * Each member card shows their role, contact information, and term of service.
 */
function Committee() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          fontWeight: 600,
          color: 'primary.main',
          mb: 4
        }}
        role="heading"
        aria-level="1"
      >
        DLF Camellias Committee Members
      </Typography>
      <Typography 
        variant="body1" 
        paragraph 
        sx={{ 
          mb: 4,
          maxWidth: '800px'
        }}
      >
        Our committee members are elected representatives who work together to manage the strata scheme. They meet regularly to discuss and make decisions about the building's maintenance, finances, and other important matters.
      </Typography>
      <Grid 
        container 
        spacing={3}
        role="list"
        aria-label="Committee members list"
      >
        {committeeMembers.map((member) => (
          <Grid item xs={12} sm={6} md={3} key={member.id}>
            <CommitteeCard member={member} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default memo(Committee);
