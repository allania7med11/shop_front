import { IsCategory } from "@/data/categories";
import {
  AppBar,
  Box,
  Paper,
  SxProps,
  Toolbar,
  Typography,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import React from "react";
import { FC } from "react";
import { Discount } from "./filters/discount";
import { Price } from "./filters/price";
import { Search } from "./filters/search";

export const Filters: FC<{ category: IsCategory; sx: SxProps }> = ({
  category,
  sx,
}) => {
  let products = category ? category.products : [];
  const [search, setSearch] = React.useState<(string)[]>([]);
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
      <Box sx={{ py: "24px", px: "8px", display: "flex", flexDirection: "column", gap : "24px" }}>
        <div>{`search: ${search}`}</div>
        <Search options = {products.map(product => product.name)} value={search} setValue={setSearch} />
        <Price />
        <Discount />
      </Box>
    </Paper>
  );
};
