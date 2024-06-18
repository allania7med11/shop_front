import React from "react";
import {
    Box,
    Paper,
    InputLabel,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
} from "@mui/material";

export const OrderValidationStep = () => {
    return (
        <Paper
            elevation={3}
            sx={{
                display: "flex",
                padding: "32px 48px",
                flexDirection: "column",
                width: "100%",
                margin: "auto",
            }}
        >
            <form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <Box>
                        <InputLabel htmlFor="street">Street</InputLabel>
                        <TextField
                            id="street"
                            name="street"
                            variant="outlined"
                            fullWidth
                            placeholder="123 Main Street"
                        />
                    </Box>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Box sx={{ flex: 1 }}>
                            <InputLabel htmlFor="city">City</InputLabel>
                            <TextField
                                id="city"
                                name="city"
                                variant="outlined"
                                fullWidth
                                placeholder="Springfield"
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <InputLabel htmlFor="zip">Zip Code</InputLabel>
                            <TextField
                                id="zip"
                                name="zip"
                                variant="outlined"
                                fullWidth
                                placeholder="12345"
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Box sx={{ flex: 1 }}>
                            <InputLabel htmlFor="country">Country</InputLabel>
                            <TextField
                                id="country"
                                name="country"
                                variant="outlined"
                                fullWidth
                                placeholder="United States"
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <InputLabel htmlFor="phone">Phone</InputLabel>
                            <TextField
                                id="phone"
                                name="phone"
                                variant="outlined"
                                fullWidth
                                placeholder="+1 (555) 123-4567"
                            />
                        </Box>
                    </Box>
                    <Box>
                        <RadioGroup
                            aria-label="payment"
                            defaultValue="cash"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel
                                value="cash"
                                control={<Radio />}
                                label="Pay with cash upon delivery"
                            />
                        </RadioGroup>
                    </Box>
                </Box>
            </form>
        </Paper>
    );
};

