import { Paper, Typography, Box, TextField } from "@mui/material";

export const Price = () => {
  return (
    <Paper
      elevation={3}
      sx={{ p: "16px", display: "flex", flexDirection: "column", gap: "24px" }}
    >
      <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
        Price
      </Typography>
      <Box sx={{ display: "flex", gap: "8px" }}>
        <TextField label="min" variant="outlined" />
        <TextField label="max" variant="outlined" />
      </Box>
    </Paper>
  );
};
