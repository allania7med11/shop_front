import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import React from "react";

export const Discount = () => {
    const [discount, setDiscount] = React.useState("");

    const handleChange = (event: SelectChangeEvent) => {
      setDiscount(event.target.value as string);
    };
  return (
    <Paper
      elevation={3}
      sx={{ p: "16px", display: "flex", flexDirection: "column", gap: "24px" }}
    >
      <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
        Price
      </Typography>
      <FormControl>
            <InputLabel id="discount">Discount by</InputLabel>
            <Select
              labelId="discount"
              id="discount"
              value={discount}
              label="Discount by"
              onChange={handleChange}
            >
              <MenuItem value="">----</MenuItem>
              <MenuItem value={0}>up to 10%</MenuItem>
              <MenuItem value={10}>10% to 20%</MenuItem>
              <MenuItem value={20}>20% to 30%</MenuItem>
              <MenuItem value={30}>30% or more</MenuItem>
            </Select>
          </FormControl>
    </Paper>
  );
};
