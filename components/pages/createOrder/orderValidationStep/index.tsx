import React from "react";
import {  UseFormReturn } from "react-hook-form";
import { DeliveryAddress } from "./deliveryAddress";
import { Alert, Box } from "@mui/material";
import OrderSummary from "./orderSummary";
import { PaymentMethod } from "./paymentMethod";
import { IsOrder } from "@/data/cart";


interface OrderValidationStepProps {
  globalErrors: string[];
  form: UseFormReturn<IsOrder>
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
