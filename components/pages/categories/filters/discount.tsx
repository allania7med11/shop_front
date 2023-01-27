import { RootState } from "@/store/reducer";
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
import { useDispatch, useSelector } from "react-redux";

export const Discount = () => {
  const { min, max } = useSelector((state: RootState) => ({
    min: state.filters.discount_min || "",
    max: state.filters.discount_max || "",
  }));
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
          value={`${min}-${max}`}
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
