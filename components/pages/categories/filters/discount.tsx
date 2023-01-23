import { updateDiscount } from "@/store/reducer/slices/filters";
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
import { useDispatch } from "react-redux";

export const Discount = () => {
  const dispatch = useDispatch();
  const setDiscount = (value) => dispatch(updateDiscount(value));
  const handleChange = (event: SelectChangeEvent) => {
    setDiscount(event.target.value.split("-") as [string, string]);
  };
  return (
    <Paper
      elevation={3}
      sx={{ p: "16px", display: "flex", flexDirection: "column", gap: "24px" }}
    >
      <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
        Discount
      </Typography>
      <FormControl>
        <InputLabel id="discount">Discount by</InputLabel>
        <Select
          labelId="discount"
          id="discount"
          label="Discount by"
          onChange={handleChange}
        >
          <MenuItem value="-">----</MenuItem>
          <MenuItem value={"-10"}>up to 10%</MenuItem>
          <MenuItem value={"10-20"}>10% to 20%</MenuItem>
          <MenuItem value={"20-30"}>20% to 30%</MenuItem>
          <MenuItem value={"30-"}>30% or more</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
};
