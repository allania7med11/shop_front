import React from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { grey } from '@mui/material/colors';

interface OrderNavigationButtonsProps {
  activeStep: number;
  stepsBack: string[];
  stepsNext: string[];
  disableNext: boolean;
  handleBack: () => void;
  handleNext: () => void;
  isLoading: boolean;
}

const OrderNavigationButtons: React.FC<OrderNavigationButtonsProps> = ({
  activeStep,
  stepsBack,
  stepsNext,
  disableNext,
  handleBack,
  handleNext,
  isLoading,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        pt: 2,
        justifyContent: 'center',
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
  );
};

export default OrderNavigationButtons;
