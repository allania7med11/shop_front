import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useSaveStripeInfoMutation } from '@/store/reducer/apis/paymentApi';
import { Button, Radio, RadioGroup, FormControlLabel, FormControl, Typography, Box } from '@mui/material';

const CheckoutForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const stripe = useStripe();
  const elements = useElements();
  const [saveStripeInfo, { isLoading, isError, data }] = useSaveStripeInfoMutation();

  const handleChange = (event: any) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      return;
    }

    try {
      const paymentInfo = {
        payment_method_id: paymentMethod?.id || '',
      };
      await saveStripeInfo(paymentInfo);
      console.log('Payment info saved successfully:', data);
    } catch (error) {
      console.error('Error saving payment info:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <FormControl component="fieldset">
        <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange}>
          <FormControlLabel value="credit_card" control={<Radio />} label="Credit Card" />
          {paymentMethod === 'credit_card' && (
            <Box mt={2} mb={2} sx={{ display: "flex", flexDirection: "column", gap: '8px' }}>
              <Box sx={{ padding: '12px', border: '1px solid #ced4da', borderRadius: '4px' }}>
                <CardElement 
                  options={{
                    style: {
                      base: {
                        color: '#424770',
                        fontSize: '16px',
                        iconColor: '#c4f0ff',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                        fontSmoothing: 'antialiased',
                      },
                      invalid: {
                        color: '#9e2146',
                        iconColor: '#fa755a',
                      },
                    },
                    hidePostalCode: true,
                  }}
                  onChange={handleChange}
                />
              </Box>
              {error && <Typography color="error" role="alert">{error}</Typography>}
            </Box>
          )}
          <FormControlLabel value="cash_on_delivery" control={<Radio />} label="Pay with cash upon delivery" />
        </RadioGroup>
      </FormControl>
      <Typography variant="h6" gutterBottom>
        All Total: $4551.62
      </Typography>
      <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Submit Payment'}
      </Button>
      {isError && <Typography color="error">Error occurred while processing payment</Typography>}
      {data && <Typography color="primary">Payment info saved successfully</Typography>}
    </form>
  );
};

export default CheckoutForm;
