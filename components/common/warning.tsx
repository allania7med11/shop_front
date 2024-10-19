import { Box } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

export const Warning = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'max(400px,40vh)',
    }}
  >
    <WarningIcon color="warning" sx={{ fontSize: '4rem!important' }} />
  </Box>
);
