import React from "react";
import { Control } from "react-hook-form";
import { DeliveryAddress } from "./deliveryAddress";
import { Alert, Box } from "@mui/material";
import OrderSummary from "./orderSummary";
import { PaymentMethod } from "./paymentMethod";

interface OrderValidationStepProps {
  globalErrors: string[];
  control: Control<any>;
}

export const OrderValidationStep: React.FC<OrderValidationStepProps> = ({ globalErrors, control }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <OrderSummary />
      {globalErrors && globalErrors.map((error, index) => (
        <Alert key={index} severity="error">
          {error}
        </Alert>
      ))}
      <DeliveryAddress  control={control} />
      <PaymentMethod  control={control} />
    </Box>
  );
};
