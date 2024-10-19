import React from 'react';
import { DeliveryAddress } from './deliveryAddress';
import { Alert, Box } from '@mui/material';
import OrderSummary from './orderSummary';
import { PaymentMethod } from './paymentMethod';

export const OrderValidationStep: React.FC<{ globalErrors: string[] }> = ({ globalErrors }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <OrderSummary />
      {globalErrors &&
        globalErrors.map((error, index) => (
          <Alert key={index} severity="error">
            {error}
          </Alert>
        ))}
      <DeliveryAddress />
      <PaymentMethod />
    </Box>
  );
};
