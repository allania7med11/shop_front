import React from 'react';
import { Typography, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ConfettiExplosion from 'react-confetti-explosion';

export const OrderCompleteStep = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        padding: '32px 48px 48px 32px',
        flexDirection: 'column',
        width: '100%',
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <CheckCircleIcon sx={{ fontSize: 60, marginBottom: '20px', color: 'success.light' }} />
      <ConfettiExplosion force={0.8} duration={5000} particleCount={250} width={1600} />
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{ color: 'success.light', fontWeight: 'bold' }}
      >
        Congratulations! Your order has been placed
      </Typography>
      <Typography variant="body1" color="textSecondary">
        We will contact you by phone to confirm your order details.
      </Typography>
    </Paper>
  );
};
