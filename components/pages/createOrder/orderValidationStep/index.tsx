import React from "react";
import { DeliveryAddress } from "./deliveryAddress";
import { Box } from "@mui/material";

export const OrderValidationStep = ({globalErrors, control}) => {

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <DeliveryAddress globalErrors={globalErrors} control={control} />
    </Box>
  );
};
