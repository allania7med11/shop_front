import React from "react";
import { Control } from "react-hook-form";
import { DeliveryAddress } from "./DeliveryAddress";

interface OrderValidationStepProps {
  globalErrors: string[];
  control: Control<any>;
}

export const OrderValidationStep: React.FC<OrderValidationStepProps> = ({ globalErrors, control }) => {
  return (
    <DeliveryAddress globalErrors={globalErrors} control={control} />
  );
};
