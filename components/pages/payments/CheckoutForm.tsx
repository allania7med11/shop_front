import React from "react";
import {
  Radio,
  FormControlLabel,
  FormControl,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import CreditCardDetail from "@/components/common/creditCardDetail";
import { UseFormReturn } from "react-hook-form";
import FormRadioGroupField from "@/components/common/Form/formRadioGroupField";
import { IsOrder } from "@/data/cart";
import { useCurrentCartQuery } from "@/store/reducer/apis/cartApi";

const CheckoutForm: React.FC<{ form: UseFormReturn<IsOrder> }> = ({ form }) => {
  const { control, watch } = form;
  const paymentMethod = watch("payment.payment_method");
  const { data } = useCurrentCartQuery();
  const total_amount = data ? data.total_amount : "";

  return (
    <>
      <FormControl component="fieldset" sx={{ width: "100%" }}>
        <FormRadioGroupField
          name="payment.payment_method"
          control={control}
          rules={{ required: "Payment Method is required" }}
        >
          <FormControlLabel
            value="stripe"
            control={<Radio />}
            label="Credit Card"
          />
          {paymentMethod === "stripe" && (
            <Box sx={{ my: 2 }}>
              <CreditCardDetail />
            </Box>
          )}
          <FormControlLabel
            value="cash_on_delivery"
            control={<Radio />}
            label="Pay with cash upon delivery"
          />
        </FormRadioGroupField>
      </FormControl>
      <Divider sx={{ margin: "10px auto" }} />
      <Typography variant="h6" gutterBottom>
        All Total: ${total_amount}
      </Typography>
    </>
  );
};

export default CheckoutForm;
