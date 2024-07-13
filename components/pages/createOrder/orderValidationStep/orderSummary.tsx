import React from "react";
import {
    Box,
    Paper,
    Typography
} from "@mui/material";

const OrderSummary = () => {
    return (
        <Paper elevation={3}>
            <Box sx={{ backgroundColor: "rgba(0, 0, 0, 0.02)", padding: "16px 32px" }}>
                <Typography variant="h6" color="rgba(0, 0, 0, 0.6)">
                    Order Summary
                </Typography>
            </Box>
            <Box sx={{ padding: "16px 48px 32px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <Typography>HP Pavilion 15-DK1056WM x 2</Typography>
                    <Typography>$2062.16</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <Typography>Samsung Universe 9 x 1</Typography>
                    <Typography>$1055.9</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <Typography>iPhone 9 x 3</Typography>
                    <Typography>$1433.55</Typography>
                </Box>
            </Box>
            <Box sx={{ backgroundColor: "rgba(0, 0, 0, 0.02)", padding: "16px 48px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                    <Typography variant="h6" color="rgba(0, 0, 0, 0.6)">Payable Total</Typography>
                    <Typography variant="h6" color="rgba(0, 0, 0, 0.6)">$4551.62</Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default OrderSummary;
