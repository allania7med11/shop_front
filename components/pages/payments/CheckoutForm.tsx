import React from 'react';
import {  Radio, FormControlLabel, FormControl, Typography, Box } from '@mui/material';
import CreditCardDetail from '@/components/common/creditCardDetail';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import FormRadioGroupField from '@/components/common/Form/formRadioGroupField';

const CheckoutForm: React.FC<{ form: UseFormReturn<FieldValues, any, undefined> }> = ({ form }) => {
  const { control, watch } = form
  const paymentMethod = watch('payment.payment_method');

  return (
    <>
      <FormControl component="fieldset">
        <FormRadioGroupField name="payment.payment_method" control={control} rules={{ required: "Payment Method is required" }}>
          <FormControlLabel value="credit_card" control={<Radio />} label="Credit Card" />
          {paymentMethod === 'credit_card' && (
            <Box sx={{ my: 2 }}>
              <CreditCardDetail />
            </Box>
          )}
          <FormControlLabel value="cash_on_delivery" control={<Radio />} label="Pay with cash upon delivery" />
        </FormRadioGroupField>
      </FormControl>
      <Typography variant="h6" gutterBottom>
        All Total: $4551.62
      </Typography>
    </>
  );
};

export default CheckoutForm;
