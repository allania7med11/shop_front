import React from "react";
import { DeliveryAddress } from "./deliveryAddress";
import { Box } from "@mui/material";
import { OrderSummary } from "./orderSummary";

export const OrderValidationStep = ({globalErrors, control}) => {

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <OrderSummary />
      <DeliveryAddress globalErrors={globalErrors} control={control} />
    </Box>
  );
};
