import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea, 
  Box,
  Fade,
  useTheme
} from '@mui/material';
import { PictureAsPdf, Image } from '@mui/icons-material';

function Documents() {
  const theme = useTheme();
  const documents = [
    {
      title: 'Building Floor Plan',
      type: 'image',
      path: '/images/floor-plan.svg',
      description: 'Complete floor plan of the building'
    },
    {
      title: 'Building Exterior',
      type: 'image',
      path: '/images/building.svg',
      description: 'Front view of the building'
    },
    {
      title: 'Common Areas',
      type: 'image',
      path: '/images/common-areas.svg',
      description: 'Photos of common areas'
    },
    {
      title: 'Strata Bylaws',
      type: 'pdf',
      path: '/documents/bylaws.pdf',
      description: 'Current strata scheme by-laws'
    },
    {
      title: 'AGM Minutes',
      type: 'pdf',
      path: '/documents/agm-minutes.pdf',
      description: 'Latest AGM meeting minutes'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, minHeight: '100vh' }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{
          position: 'relative',
          display: 'inline-block',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '4px',
            backgroundColor: theme.palette.primary.main,
            borderRadius: '2px'
          }
        }}>
          Documents & Images
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
          Access building documentation and view property images
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {documents.map((doc, index) => (
          <Fade in={true} timeout={1000} style={{ transitionDelay: `${index * 100}ms` }} key={index}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardActionArea sx={{ flexGrow: 1 }}>
                  <Box sx={{
                    position: 'relative',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease-in-out',
                      zIndex: 1
                    },
                    '&:hover:before': {
                      opacity: 1
                    }
                  }}>
                    {doc.type === 'image' ? (
                      <CardMedia
                        component="img"
                        height="200"
                        image={doc.path}
                        alt={doc.title}
                        onError={(e) => {
                          e.target.src = '/images/placeholder.svg';
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: 200,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'grey.100'
                        }}
                      >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                          <PictureAsPdf sx={{ fontSize: 60, color: 'error.main' }} />
                          <Typography variant="body2" color="error.main">Click to view PDF</Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {doc.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {doc.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Fade>
        ))}
      </Grid>
    </Container>
  );
}

export default Documents;
