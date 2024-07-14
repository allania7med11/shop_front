import React, { useState } from 'react';
import { CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useSaveStripeInfoMutation } from '@/store/reducer/apis/paymentApi';
import { Button, Radio, RadioGroup, FormControlLabel, FormControl, Typography, Box } from '@mui/material';
import CreditCardDetail from '@/components/common/creditCardDetail';

const CheckoutForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const stripe = useStripe();
  const elements = useElements();
  const [saveStripeInfo, { isLoading, isError, data }] = useSaveStripeInfoMutation();

  const [cardDetails, setCardDetails] = useState({
    cardNumberError: null,
    expiredError: null,
    cvcError: null
  });

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handleCardDetailsChange = (field: string, value: string) => {
    setCardDetails((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      setError('Stripe has not loaded');
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) {
      setError('Card Element not found');
      return;
    }

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (stripeError) {
      setError(stripeError.message);
      return;
    }

    try {
      const paymentInfo = {
        payment_method_id: paymentMethod?.id || '',
      };
      await saveStripeInfo(paymentInfo);
      console.log('Payment info saved successfully:', data);
    } catch (error) {
      setError('Error saving payment info');
      console.error('Error saving payment info:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <FormControl component="fieldset">
        <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange}>
          <FormControlLabel value="credit_card" control={<Radio />} label="Credit Card" />
          {paymentMethod === 'credit_card' && (
            <Box sx={{ my: 2 }}>
              <CreditCardDetail onCardDetailsChange={handleCardDetailsChange} />
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
      {error && <Typography color="error">{error}</Typography>}
    </form>
  );
};

export default CheckoutForm;
