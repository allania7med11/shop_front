import React, { useContext } from "react";
import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import { useCurrentCartQuery } from "@/store/reducer/apis/cartApi";
import EditIcon from "@mui/icons-material/Edit";
import { OrderContext } from "../orderContext";

const OrderSummary = () => {
  const { data } = useCurrentCartQuery();
  const items = data ? data.items : [];
  const total_amount = data ? data.total_amount : "";
  const setActiveStep = useContext(OrderContext);
  return (
    <Paper elevation={3}>
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.02)",
          padding: "16px 32px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" color="rgba(0, 0, 0, 0.6)">
          Order Summary
        </Typography>
        <IconButton onClick={() => setActiveStep(0)}>
          <EditIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          padding: "16px 48px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>{`${item.product.name} x ${item.quantity}`}</Typography>
              <Typography>{`$${item.subtotal}`}</Typography>
            </Box>
            {index < items.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>
      <Box
        sx={{ backgroundColor: "rgba(0, 0, 0, 0.02)", padding: "16px 48px" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
          }}
        >
          <Typography variant="h6" color="rgba(0, 0, 0, 0.6)">
            Payable Total
          </Typography>
          <Typography variant="h6" color="rgba(0, 0, 0, 0.6)">
            ${total_amount}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default OrderSummary;
