import * as React from "react";
import Grid from "@mui/material/Grid";
import { StripeTextFieldCVC, StripeTextFieldExpiry, StripeTextFieldNumber } from "./Form/commonTextFields";

export default function CreditCardDetail() {
  const [state, setState] = React.useState({
    cardNumberComplete: false,
    expiredComplete: false,
    cvcComplete: false,
    cardNumberError: null,
    expiredError: null,
    cvcError: null
  });

  const onElementChange = (field, errorField) => ({
    complete,
    error = { message: null }
  }) => {
    setState({ ...state, [field]: complete, [errorField]: error.message });
  };

  const { cardNumberError, expiredError, cvcError } = state;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <StripeTextFieldNumber
          error={Boolean(cardNumberError)}
          labelErrorMessage={cardNumberError}
          onChange={onElementChange("cardNumberComplete", "cardNumberError")}
        />
      </Grid>
      <Grid item xs={6}>
        <StripeTextFieldExpiry
          error={Boolean(expiredError)}
          labelErrorMessage={expiredError}
          onChange={onElementChange("expiredComplete", "expiredError")}
        />
      </Grid>
      <Grid item xs={6}>
        <StripeTextFieldCVC
          error={Boolean(cvcError)}
          labelErrorMessage={cvcError}
          onChange={onElementChange("cvcComplete", "cvcError")}
        />
      </Grid>
    </Grid>
  );
}