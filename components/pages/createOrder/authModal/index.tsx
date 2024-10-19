import { LoginForm } from '@/components/pages/createOrder/authModal/loginForm';
import { Box, Card, Fab, IconButton, Modal, SxProps } from '@mui/material';
import { RegisterForm } from './registerForm';
import { grey } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';

const cardStyles: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  alignItems: { xs: 'center', md: 'stretch' },
  justifyContent: 'space-evenly',
  padding: '32px 48px 72px 48px',
  gap: '64px',
  width: '90%',
  maxWidth: { xs: '600px', md: '1200px' },
  outline: 'none',
  flexDirection: { xs: 'column', md: 'row' },
  maxHeight: '95vh',
  overflowY: 'auto',
};

const closeButtonStyles: SxProps = {
  position: 'absolute',
  right: 8,
  top: 8,
  color: grey[500],
};

const boxStyles: SxProps = {
  width: { xs: '90%', md: '40%' },
  maxWidth: '400px',
  pt: '20px',
  flexGrow: 1,
};

const separatorBoxStyles: SxProps = {
  backgroundColor: grey[300],
  width: { xs: '100%', md: '2px' },
  minHeight: { xs: '2px', md: '100%' },
  position: 'relative',
};

const fabStyles: SxProps = {
  position: 'absolute',
  top: { xs: '50%', md: '25%' },
  left: '50%',
  transform: 'translate(-50%, -50%)',
  '@media (min-width:900px)': {
    transform: 'translate(-50%, -25%)', // Override transform for md and up
  },
  backgroundColor: grey[200],
  color: grey[700],
};

export const AuthModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Card sx={cardStyles}>
        <IconButton aria-label="close" onClick={onClose} sx={closeButtonStyles}>
          <CloseIcon />
        </IconButton>
        <Box sx={boxStyles}>
          <RegisterForm />
        </Box>
        <Box sx={separatorBoxStyles}>
          <Fab sx={fabStyles}>OR</Fab>
        </Box>
        <Box sx={boxStyles}>
          <LoginForm />
        </Box>
      </Card>
    </Modal>
  );
};
