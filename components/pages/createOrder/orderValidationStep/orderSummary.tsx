import React from "react";
import {
    Box,
    Divider,
    Paper,
    Typography
} from "@mui/material";

const products = [
    { name: "HP Pavilion 15-DK1056WM", quantity: 2, price: 2062.16 },
    { name: "Samsung Universe 9", quantity: 1, price: 1055.9 },
    { name: "iPhone 9", quantity: 3, price: 1433.55 }
];

const OrderSummary = () => {
    return (
        <Paper elevation={3}>
            <Box sx={{ backgroundColor: "rgba(0, 0, 0, 0.02)", padding: "16px 32px" }}>
                <Typography variant="h6" color="rgba(0, 0, 0, 0.6)">
                    Order Summary
                </Typography>
            </Box>
            <Box sx={{ padding: "16px 48px 32px", display: "flex", flexDirection: "column", gap: 1 }}>
                {products.map((product, index) => (
                    <Box key={index} sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography>{`${product.name} x ${product.quantity}`}</Typography>
                            <Typography>{`$${product.price}`}</Typography>
                        </Box>
                        {index < products.length - 1 && <Divider />}
                    </Box>
                ))}
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
