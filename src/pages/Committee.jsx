import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Avatar } from '@mui/material';

function Committee() {
  const committeeMembers = [
    { name: 'John Smith', role: 'Chairperson', email: 'chair@strata.com' },
    { name: 'Jane Doe', role: 'Secretary', email: 'secretary@strata.com' },
    { name: 'Mike Johnson', role: 'Treasurer', email: 'treasurer@strata.com' },
    { name: 'Sarah Wilson', role: 'Member', email: 'member1@strata.com' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        DLF Camellias Committee Members
      </Typography>
      <Grid container spacing={3}>
        {committeeMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    margin: '0 auto',
                    marginBottom: 2,
                    bgcolor: 'primary.main',
                  }}
                >
                  {member.name.split(' ').map(n => n[0]).join('')}
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  {member.name}
                </Typography>
                <Typography color="textSecondary">
                  {member.role}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {member.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Committee;
