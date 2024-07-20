import * as React from "react";
import { Box } from "@mui/material";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import { OrderContext } from "./orderContext";
import { CartStep } from "./cartStep";
import { OrderValidationStep } from "./orderValidationStep";
import { OrderCompleteStep } from "./orderCompleteStep";
import { AuthModal } from "./authModal";
import { StepHeader } from "./stepHeader";
import { IsOrder } from "@/data/cart";
import useOrderState from "./hooks/useOrderState";
import useSubmitOrder from "./hooks/useSubmitOrder";
import useOrderNavigation from "./hooks/useOrderNavigation";
import OrderNavigationButtons from "./orderNavigationButtons";
import { OrderStepper } from "./orderStepper";

const steps = ["Cart", "Order Validation", "Order Complete"];
const stepsNext = ["Next", "Order", "Continue Shopping"];
const stepsBack = ["Back", "Back", "Back Home"];

export const CreateOrder: React.FC = () => {
  const {
    activeStep,
    setActiveStep,
    disableNext,
    setDisableNext,
    open,
    setOpen,
  } = useOrderState();
  const form: UseFormReturn<IsOrder> = useForm<IsOrder>({
    defaultValues: { payment: { payment_method: "stripe" } },
  });
  const { onSubmit, isLoading, isSuccess, globalErrors } = useSubmitOrder(form);
  const { handleBack, handleNext } = useOrderNavigation(
    activeStep,
    setActiveStep,
    setDisableNext,
    onSubmit,
    isSuccess,
    form,
    () => setOpen(true),
    () => setOpen(false)
  );

  return (
    <OrderContext.Provider value={setActiveStep}>
      <FormProvider {...form}>
        <Box sx={{ width: "100%", maxWidth: "1000px", margin: "auto" }}>
          <AuthModal open={open} onClose={() => setOpen(false)} />
          <OrderStepper activeStep={activeStep} steps={steps} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <StepHeader title={steps[activeStep]} />
            {activeStep === 0 && <CartStep />}
            {activeStep === 1 && (
              <OrderValidationStep globalErrors={globalErrors} />
            )}
            {activeStep === 2 && <OrderCompleteStep />}
          </Box>
          <OrderNavigationButtons
            activeStep={activeStep}
            stepsBack={stepsBack}
            stepsNext={stepsNext}
            disableNext={disableNext}
            handleBack={handleBack}
            handleNext={handleNext}
            isLoading={isLoading}
          />
        </Box>
      </FormProvider>
    </OrderContext.Provider>
  );
};
