import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import CheckoutForm from '@/components/pages/payments/CheckoutForm';

export const PaymentMethod = () => {
  return (
    <Paper elevation={3}>
      <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)', padding: '16px 32px' }}>
        <Typography variant="h6" color="rgba(0, 0, 0, 0.6)">
          Payment Method
        </Typography>
      </Box>
      <Box sx={{ padding: '16px 48px 32px' }}>
        <CheckoutForm />
      </Box>
    </Paper>
  );
};
