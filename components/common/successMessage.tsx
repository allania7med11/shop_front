import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Typography } from '@mui/material';

interface SuccessMessageProps {
  message: string;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <CheckCircleIcon sx={{ fontSize: '60px', color: 'success.main' }} />
      <Typography variant="h6" mt={2} sx={{ color: 'success.main', textAlign: 'center' }}>
        {message}
      </Typography>
    </Box>
  );
};
