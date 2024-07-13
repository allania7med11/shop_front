import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '@/components/pages/payments/CheckoutForm';
import { stripePublicKey } from '@/utils/config';

const stripePromise = loadStripe(stripePublicKey);
export default function Index() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );

}

