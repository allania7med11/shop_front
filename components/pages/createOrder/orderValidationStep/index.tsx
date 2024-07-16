import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { DeliveryAddress } from "./deliveryAddress";
import { Alert, Box } from "@mui/material";
import OrderSummary from "./orderSummary";
import { PaymentMethod } from "./paymentMethod";


interface OrderValidationStepProps {
  globalErrors: string[];
  form: UseFormReturn<FieldValues, any, undefined>
}

export const OrderValidationStep: React.FC<OrderValidationStepProps> = ({ globalErrors, form }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <OrderSummary />
      {globalErrors && globalErrors.map((error, index) => (
        <Alert key={index} severity="error">
          {error}
        </Alert>
      ))}
      <DeliveryAddress form={form} />
      <PaymentMethod form={form} />
    </Box>
  );
};
