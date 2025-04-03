import React from 'react';
import { Container, Grid, Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

function Finance() {
  const levies = [
    { unit: '101', owner: 'John Smith', adminFund: 1000, capitalWorks: 500, status: 'Paid' },
    { unit: '102', owner: 'Jane Doe', adminFund: 1000, capitalWorks: 500, status: 'Pending' },
    { unit: '103', owner: 'Mike Johnson', adminFund: 1000, capitalWorks: 500, status: 'Paid' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        DLF Camellias Financial Management
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Administration Fund
            </Typography>
            <Typography variant="h4">$50,000</Typography>
            <Typography color="textSecondary">Current Balance</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Capital Works Fund
            </Typography>
            <Typography variant="h4">$100,000</Typography>
            <Typography color="textSecondary">Current Balance</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quarterly Levies Status
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Unit</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell align="right">Admin Fund</TableCell>
                  <TableCell align="right">Capital Works</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {levies.map((row) => (
                  <TableRow key={row.unit}>
                    <TableCell>{row.unit}</TableCell>
                    <TableCell>{row.owner}</TableCell>
                    <TableCell align="right">${row.adminFund}</TableCell>
                    <TableCell align="right">${row.capitalWorks}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Finance;
