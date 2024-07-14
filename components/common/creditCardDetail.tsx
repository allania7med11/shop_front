import React from 'react';
import Grid from '@mui/material/Grid';
import { StripeTextFieldCVC, StripeTextFieldExpiry, StripeTextFieldNumber } from './Form/commonTextFields';

const CreditCardDetail = ({ onCardDetailsChange }) => {
  const [state, setState] = React.useState({
    cardNumberError: null,
    expiredError: null,
    cvcError: null
  });

  const onElementChange = (errorField) => (event) => {
    const { error } = event;
    setState((prevState) => ({
      ...prevState,
      [errorField]: error ? error.message : null,
    }));
    onCardDetailsChange(errorField, error ? error.message : null);
  };

  const { cardNumberError, expiredError, cvcError } = state;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <StripeTextFieldNumber
          error={Boolean(cardNumberError)}
          labelErrorMessage={cardNumberError}
          onChange={onElementChange('cardNumberError')}
        />
      </Grid>
      <Grid item xs={6}>
        <StripeTextFieldExpiry
          error={Boolean(expiredError)}
          labelErrorMessage={expiredError}
          onChange={onElementChange('expiredError')}
        />
      </Grid>
      <Grid item xs={6}>
        <StripeTextFieldCVC
          error={Boolean(cvcError)}
          labelErrorMessage={cvcError}
          onChange={onElementChange('cvcError')}
        />
      </Grid>
    </Grid>
  );
};

export default CreditCardDetail;
