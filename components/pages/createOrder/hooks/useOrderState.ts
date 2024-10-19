import { useState, useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import { useCurrentCartQuery } from '@/store/reducer/apis/cartApi';

interface UseOrderStateReturn {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  disableNext: boolean;
  setDisableNext: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useOrderState = (): UseOrderStateReturn => {
  const [activeStep, setActiveStep] = useState(0);
  const [disableNext, setDisableNext] = useState(true);
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { data } = useCurrentCartQuery();
  const items = data ? data.items : [];
  const cartEmpty = items.length === 0;

  useEffect(() => {
    setDisableNext(activeStep < 2 && cartEmpty);
  }, [cartEmpty, activeStep]);

  useEffect(() => {
    if (activeStep === 1 && !isAuthenticated) {
      setActiveStep(0);
      setOpen(true);
    }
    if (isAuthenticated) {
      setOpen(false);
    }
  }, [isAuthenticated, activeStep]);

  return {
    activeStep,
    setActiveStep,
    disableNext,
    setDisableNext,
    open,
    setOpen,
  };
};

export default useOrderState;
