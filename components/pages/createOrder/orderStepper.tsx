import React from 'react';
import { Card, Stepper, Step, StepLabel } from '@mui/material';

interface OrderStepperProps {
  activeStep: number;
  steps: string[];
}

export const OrderStepper: React.FC<OrderStepperProps> = ({ activeStep, steps }) => {
  return (
    <Card sx={{ padding: '24px', margin: '32px auto', maxWidth: '800px' }}>
      <Stepper activeStep={activeStep}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Card>
  );
};
