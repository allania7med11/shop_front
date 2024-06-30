import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useSaveStripeInfoMutation } from '@/store/reducer/apis/paymentApi';

const CheckoutForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
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
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        email: email,
      },
    });

    if (error) {
      setError(error.message);
      return;
    }
    try {
      const paymentInfo = {
        email: email,
        payment_method_id: paymentMethod?.id || '', 
      };
      await saveStripeInfo(paymentInfo);
      console.log('Payment info saved successfully:', data);
    } catch (error) {
      console.error('Error saving payment info:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <div className="form-row">
        <label htmlFor="email">Email Address</label>
        <input
          className="form-input"
          id="email"
          name="email"
          type="email"
          placeholder="jenny.rosen@example.com"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="form-row">
        <label>Credit or debit card</label>
        <CardElement id="card-element" onChange={handleChange} />
        <div className="card-errors" role="alert">
          {error}
        </div>
      </div>
      <button type="submit" className="submit-btn" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Submit Payment'}
      </button>
      {isError && <p>Error occurred while processing payment</p>}
      {data && <p>Payment info saved successfully</p>}
    </form>
  );
};

export default CheckoutForm;
