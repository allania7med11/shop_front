import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { UseFormReturn } from "react-hook-form";
import { IsOrder } from "@/data/cart";
import useAuth from "@/hooks/useAuth";

const useOrderNavigation = (
    activeStep: number,
    setActiveStep: React.Dispatch<React.SetStateAction<number>>,
    setDisableNext: React.Dispatch<React.SetStateAction<boolean>>,
    onSubmit: (form_data: IsOrder) => Promise<void>,
    isSuccess: boolean,
    form: UseFormReturn<IsOrder>,
    handleOpen: () => void,
    handleClose: () => void,
) => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const { handleSubmit } = form;

    useEffect(() => {
        if (activeStep === 1 && !isAuthenticated) {
            setActiveStep(0);
            handleOpen();
        }
        if (isAuthenticated) {
            handleClose();
        }
    }, [isAuthenticated, activeStep, setActiveStep, handleOpen, handleClose]);

    useEffect(() => {
        if (isSuccess) {
            setActiveStep(2);
        }
    }, [isSuccess, setActiveStep]);

    const handleBack = useCallback(() => {
        if (activeStep === 2) {
            router.push("/");
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    }, [activeStep, router, setActiveStep]);

    const handleNext = useCallback(async () => {
        if (activeStep === 1) {
            setDisableNext(true);
            await handleSubmit(onSubmit)();
            setDisableNext(false);
        } else if (activeStep === 2) {
            router.back();
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    }, [activeStep, handleSubmit, onSubmit, setActiveStep, setDisableNext, router]);

    return { handleBack, handleNext };
};

export default useOrderNavigation;
