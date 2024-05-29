import { Box, Button, Card, Typography } from "@mui/material";
import { Register } from "@/components/common/register";
import React from "react";
import { Login } from "@/components/common/login";

export const AuthStep = ({ setDisableNext }) => {
  setDisableNext(true);
  const [hasAccount, setHasAccount] = React.useState(false);
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
          variant="text"
          sx={{ textTransform: "none" }}
          onClick={() => setHasAccount((prev) => !prev)}
        >
          {hasAccount ? "Don't have account?" : "Already have an account?"}
        </Button>
      </Card>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {hasAccount ? <Login /> : <Register />}
      </Box>
    </Box>
  );
};
