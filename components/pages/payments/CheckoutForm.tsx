import React from "react";
import {  Radio, FormControlLabel, FormControl, Typography, Box } from "@mui/material";
import CreditCardDetail from "@/components/common/creditCardDetail";
import { UseFormReturn } from "react-hook-form";
import FormRadioGroupField from "@/components/common/Form/formRadioGroupField";
import { IsOrder } from "@/data/cart";

const CheckoutForm: React.FC<{ form: UseFormReturn<IsOrder>  }> = ({ form }) => {
  const { control, watch } = form
  const paymentMethod = watch("payment.payment_method");

  return (
    <>
      <FormControl component="fieldset">
        <FormRadioGroupField name="payment.payment_method" control={control} rules={{ required: "Payment Method is required" }}>
          <FormControlLabel value="stripe" control={<Radio />} label="Credit Card" />
          {paymentMethod === "stripe" && (
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
