import { Box, CircularProgress } from "@mui/material";

export const Loading = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "max(400px,40vh)",
    }}
  >
    <CircularProgress size="4rem" />
  </Box>
);
