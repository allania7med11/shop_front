import { Box, Button, Card, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { Register } from "@/components/common/register";

export const AuthStep = () => {
  const router = useRouter();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "24px 12px",
        }}
      >
        <Typography variant="h6">Create Account</Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          sx={{ textTransform: "none" }}
          onClick={() => router.back()}
        >
          Already have an account?
        </Button>
      </Card>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Register />
      </Box>
    </Box>
  );
};
