import {
  AppBar,
  Box,
  Paper,
  SxProps,
  Toolbar,
  Typography,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { FC } from "react";

export const Filters: FC<{ sx: SxProps }> = ({ sx }) => {
  return (
    <Paper elevation={3} sx={{ backgroundColor: blueGrey[50], ...sx }}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
          sx={{ backgroundColor: blueGrey[600], minHeight: "64px" }}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Filters
          </Typography>
        </Toolbar>
      </AppBar>
    </Paper>
  );
};
