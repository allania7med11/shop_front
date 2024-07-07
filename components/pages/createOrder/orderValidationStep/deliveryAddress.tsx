import React from "react";
import {
  Box,
  Paper,
  InputLabel,
  Alert,
  Typography,
} from "@mui/material";
import FormTextField from "@/components/common/Form/formTextField";
import { grey } from "@mui/material/colors";

export const DeliveryAddress = ({ globalErrors, control }) => {

  return (
    <Paper
      elevation={3}
    >
      <Box sx={{ backgroundColor: grey[50],  padding: "16px 24px" }}>
        <Typography color={grey[700]} fontSize="18px" fontWeight="bold">Delivery Address</Typography>
      </Box>
      <Box sx={{
        display: "flex",
        padding: "32px 48px 40px 48px",
        flexDirection: "column",
        width: "100%",
        margin: "auto",
      }}>
        <form>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {globalErrors && globalErrors.map((error, index) => (
              <Alert key={index} severity="error">
                {error}
              </Alert>
            ))}
            <Box>
              <InputLabel htmlFor="street">Street</InputLabel>
              <FormTextField
                name="street"
                control={control}
                defaultValue=""
                rules={{ required: "Street is required" }}
                type="text"
                id="street"
                placeholder="123 Main Street"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <InputLabel htmlFor="city">City</InputLabel>
                <FormTextField
                  name="city"
                  control={control}
                  defaultValue=""
                  rules={{ required: "City is required" }}
                  type="text"
                  id="city"
                  placeholder="Springfield"
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <InputLabel htmlFor="zip">Zip Code</InputLabel>
                <FormTextField
                  name="zip_code"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Zip Code is required" }}
                  type="text"
                  id="zip"
                  placeholder="12345"
                  variant="outlined"
                  fullWidth
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <InputLabel htmlFor="country">Country</InputLabel>
                <FormTextField
                  name="country"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Country is required" }}
                  type="text"
                  id="country"
                  placeholder="United States"
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <InputLabel htmlFor="phone">Phone</InputLabel>
                <FormTextField
                  name="phone"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Phone is required" }}
                  type="text"
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  variant="outlined"
                  fullWidth
                />
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Paper>
  );
};
