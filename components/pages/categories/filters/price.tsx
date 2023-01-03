import {
  Paper,
  Typography,
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

export const Price = () => {
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
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="price-max">Max</InputLabel>
          <OutlinedInput
            id="price-max"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Max"
          />
        </FormControl>
      </Box>
    </Paper>
  );
};
