import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Card from "@mui/material/Card";
import { CartStep } from "./cartStep";

const steps = ["Cart", "Login", "Address", "Review"];

export const CreateOrder = () => {
  const activeStep = 0;
  return (
    <Box sx={{ width: "100%" }}>
      <Card sx={{padding: "24px", margin:"32px auto", maxWidth: "800px"}}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            const stepProps: { completed?: boolean } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Card>

      {activeStep == 0 && <CartStep />}
    </Box>
  );
};
