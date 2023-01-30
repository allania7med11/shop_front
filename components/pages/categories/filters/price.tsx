import { RootState } from "@/store/reducer";
import {
  updateCurrentPriceMax,
  updateCurrentPriceMin,
} from "@/store/reducer/slices/filters";
import {
  Paper,
  Typography,
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Price = () => {
  const { store_min, store_max } = useSelector((state: RootState) => ({
    store_min: state.filters.current_price_min || "",
    store_max: state.filters.current_price_max || "",
  }));
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  useEffect(() => {
    setMin(store_min);
  }, [store_min]);
  useEffect(() => {
    setMax(store_max);
  }, [store_max]);
  const dispatch = useDispatch();
  const setStoreMin = (value) => dispatch(updateCurrentPriceMin(value));
  const setStoreMax = (value) => dispatch(updateCurrentPriceMax(value));
  return (
    <Paper
      elevation={3}
      sx={{ p: "16px", display: "flex", flexDirection: "column", gap: "24px" }}
    >
      <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
        Price
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "16px 8px",
          flexWrap: "wrap",
          "& >div": { width: "80px", flexGrow: 1 },
        }}
      >
        <FormControl fullWidth>
          <InputLabel htmlFor="price-min">Min</InputLabel>
          <OutlinedInput
            id="price-min"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Min"
            type="number"
            value={min}
            onChange={(event) => setMin(event.target.value)}
            onBlur={(event) => {
              setStoreMin(event.target.value);
            }}
            onKeyPress={(event) => {
              var target = event.target as unknown as { value: string };
              event.key === "Enter" && setStoreMin(target.value);
            }}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="price-max">Max</InputLabel>
          <OutlinedInput
            id="price-max"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Max"
            type="number"
            value={max}
            onChange={(event) => setMax(event.target.value)}
            onBlur={(event) => {
              setStoreMax(event.target.value);
            }}
            onKeyPress={(event) => {
              var target = event.target as unknown as { value: string };
              event.key === "Enter" && setStoreMax(target.value);
            }}
          />
        </FormControl>
      </Box>
    </Paper>
  );
};
