import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Card from "@mui/material/Card";
import { CartStep } from "./cartStep";
import { Button, CircularProgress } from "@mui/material";
import useAuth from "@/hooks/useAuth";
import { OrderValidationStep } from "./orderValidationStep";
import { AuthModal } from "./authModal";
import { StepHeader } from "./stepHeader";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import {
  useCurrentCartQuery,
  useCreateOrderMutation,
} from "@/store/reducer/apis/cartApi";
import useErrors from "@/hooks/useErrors";
import { OrderCompleteStep } from "./orderCompleteStep";
import { useRouter } from "next/router";
import { grey } from "@mui/material/colors";
import { IsOrder } from "@/data/cart";
import { OrderContext } from "./orderContext";
import useOrderState from "./hooks/useOrderState";
import usePayment from "./hooks/usePayment";


const steps = ["Cart", "Order Validation", "Order Complete"];
const stepsNext = ["Next", "Order", "Continue Shopping"];
const stepsBack = ["Back", "Back", "Back Home"];


export const CreateOrder = () => {
  const router = useRouter();
  const { data } = useCurrentCartQuery();
  const items = data ? data.items : [];
  let cartEmpty = items.length == 0;
  const { activeStep, setActiveStep, disableNext, setDisableNext, open, setOpen } = useOrderState();
  let { isAuthenticated } = useAuth();
  React.useEffect(() => {
    if (activeStep < 2 && cartEmpty) {
      setDisableNext(true);
    } else {
      setDisableNext(false);
    }
  }, [cartEmpty, activeStep]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const form: UseFormReturn<IsOrder>  = useForm<IsOrder>({
    defaultValues: {
      payment: {
        payment_method: "stripe"
      }
    }
  });
  const { handleSubmit, setError, clearErrors, getValues } = form;
  const [createOrder, { isLoading, error, isSuccess }] =
    useCreateOrderMutation();
  const { globalErrors, setGlobalErrors } = useErrors(
    error,
    setError,
    getValues
  );
  
  const setPaymentMethodId = usePayment(setGlobalErrors);
  const onSubmit = async (form_data: IsOrder) => {
    clearErrors();
    setGlobalErrors([]);
    if (form_data.payment.payment_method === "stripe") {
      await setPaymentMethodId(form_data);
    }
    await createOrder(form_data);
  };
  React.useEffect(() => {
    if (activeStep == 1 && !isAuthenticated) {
      setActiveStep(0);
      handleOpen();
    }
    if (isAuthenticated) {
      handleClose();
    }
  }, [isAuthenticated, activeStep]);
  const handleBack = () => {
    if (activeStep == 2) {
      router.push("/");
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };
  const handleNext = async () => {
    if (activeStep == 1) {
      setDisableNext(true);
      await handleSubmit(onSubmit)();
      setDisableNext(false);
    } else if (activeStep == 2) {
      router.back();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  React.useEffect(() => {
    if (isSuccess) {
      setActiveStep(2);
    }
  }, [isSuccess]);
  return (
    <OrderContext.Provider value={setActiveStep}>
      <FormProvider {...form}>
        <Box sx={{ width: "100%", maxWidth: "1000px", margin: "auto" }}>
          <AuthModal open={open} onClose={handleClose} />
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
            {activeStep == 0 && <CartStep />}
            {activeStep == 1 && (
                <OrderValidationStep globalErrors={globalErrors} />
            )}
            {activeStep == 2 && <OrderCompleteStep />}
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
              sx={{ color: grey[700] }}
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              {stepsBack[activeStep]}
            </Button>
            <Button onClick={handleNext} disabled={disableNext} variant="contained">
              {stepsNext[activeStep]}
              {isLoading && <CircularProgress size={24} color="inherit" />}
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </OrderContext.Provider>
  );
};
