import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Card from "@mui/material/Card";
import { CartStep } from "./cartStep";
import { Button } from "@mui/material";
import { AuthStep } from "./authStep";
import useAuth from "@/hooks/useAuth";

export const CreateOrder = () => {
  let steps = ["Cart", "Login", "Address", "Review"];
  let { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    steps = ["Cart", "Address", "Review"];
  }
  const [activeStep, setActiveStep] = React.useState(0);
  const [disableNext, setDisableNext] = React.useState(true);
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Card sx={{ padding: "24px", margin: "32px auto", maxWidth: "800px" }}>
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
      {activeStep == 0 && <CartStep setDisableNext={setDisableNext} />}
      {steps[activeStep] == "Login" && <AuthStep setDisableNext={setDisableNext} />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          pt: 2,
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button onClick={handleNext} disabled={disableNext}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Box>
  );
};
