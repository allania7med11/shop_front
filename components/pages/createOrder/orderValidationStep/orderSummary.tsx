import React from "react";
import {
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";

export const OrderSummary = () => {

  return (
    <Paper
      elevation={3}
    >
      <Box sx={{ backgroundColor: grey[50],  padding: "16px 24px" }}>
        <Typography color={grey[700]} fontSize="18px" fontWeight="bold">Order Summary</Typography>
      </Box>
      <Box sx={{
        display: "flex",
        padding: "32px 48px 40px 48px",
        flexDirection: "column",
        width: "100%",
        margin: "auto",
      }}>
        
      </Box>
    </Paper>
  );
};
