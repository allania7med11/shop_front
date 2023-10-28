import { Button, Card, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from 'next/router'


export const Cart = () => {
  const router = useRouter()
  return (
    <div>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "24px 12px",
        }}
      >
        <Typography variant="h6">Shopping Cart</Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          sx={{ textTransform: "none" }}
          onClick={() => router.back()}
        >
          Continue Shopping
        </Button>
      </Card>
    </div>
  );
};
