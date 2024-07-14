import React from "react";
import { Control } from "react-hook-form";
import { DeliveryAddress } from "./deliveryAddress";
import { Box } from "@mui/material";
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
      <DeliveryAddress globalErrors={globalErrors} control={control} />
      <PaymentMethod />
    </Box>
  );
};
