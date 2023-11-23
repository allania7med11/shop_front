import { Box, Button, Card, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from 'next/router'
import { CartTable } from "./cartTable";


export const CartStep = () => {
  const router = useRouter()
  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: "32px"}}>
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
      <CartTable />
    </Box>
  );
};
