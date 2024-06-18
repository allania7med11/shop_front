import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Card from "@mui/material/Card";
import { CartStep } from "./cartStep";
import { Button } from "@mui/material";
import useAuth from "@/hooks/useAuth";
import { OrderValidationStep } from "./orderValidationStep";
import { AuthModal } from "./authModal";
import { StepHeader } from "./stepHeader";


export const CreateOrder = () => {
  let steps = ["Cart", "Order Validation", "Order Complete"];
  let { isAuthenticated } = useAuth();
  const [activeStep, setActiveStep] = React.useState(0);
  const [disableNext, setDisableNext] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  React.useEffect(() => {
    if (activeStep > 0 && !isAuthenticated) {
      setActiveStep(0)
      handleOpen()
    }
    if (isAuthenticated) {
      handleClose()
    }
  }, [isAuthenticated, activeStep])
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  return (
    <Box sx={{ width: "100%", maxWidth: "1000px", margin: "auto" }}>
      <AuthModal
        open={open}
        onClose={handleClose}
      />
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <StepHeader title={steps[activeStep]} />
        {activeStep == 0 && <CartStep setDisableNext={setDisableNext} />}
        {activeStep == 1 && <OrderValidationStep />}
      </Box>
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
