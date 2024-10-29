import { Button, Card, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';

export const StepHeader = ({ title }) => {
  const router = useRouter();
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '24px 12px',
      }}
    >
      <Typography variant="h5">{title}</Typography>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{ textTransform: 'none' }}
        onClick={() => router.back()}
      >
        Continue Shopping
      </Button>
    </Card>
  );
};
