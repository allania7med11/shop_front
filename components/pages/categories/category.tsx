import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { ProductsSwiper } from "components/pages/index/productsSwiper";
import { blueGrey } from "@mui/material/colors";
import { FC } from "react";
import { IsCategory } from "@/data/categories";
import pluralize from "pluralize";
import { QueryStatus } from "react-query/types/core";
import {
  createTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
  ThemeProvider,
} from "@mui/material";
import React from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const sxToolbar: SxProps = {
  backgroundColor: blueGrey[600],
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "12px 6px",
  py: "12px"
};

export const Category: FC<{
  category: IsCategory;
  status: QueryStatus;
  sx: SxProps;
}> = ({ category, status, sx }) => {
  if (status === "idle") {
    return;
  }
  if (status === "loading") {
    return <p>Loading data...</p>;
  }
  if (status === "error") {
    return <p>Error fetching data</p>;
  }
  let products = category ? category.products : [];
  const [order, setOrder] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setOrder(event.target.value as string);
  };
  return (
    <Paper elevation={3} sx={sx}>
      <AppBar position="static">
        <ThemeProvider theme={darkTheme}>
          <Toolbar variant="dense" sx={sxToolbar}>
            <Typography variant="h6" component="div">
              {category.name}
            </Typography>
            <FormControl sx={{ minWidth: "180px" }} size="small">
              <InputLabel id="order-select-label">Order by</InputLabel>
              <Select
                labelId="order-select-label"
                id="order-select"
                value={order}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value="">----</MenuItem>
                <MenuItem value="price">Price: Low to High</MenuItem>
                <MenuItem value="-price">Price: High to Low</MenuItem>
                <MenuItem value="name">Name: A to Z</MenuItem>
                <MenuItem value="-name">Name: Z to A</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="subtitle1" component="div">
              {products.length} {pluralize("Result", products.length)}
            </Typography>
          </Toolbar>
        </ThemeProvider>
      </AppBar>
      <ProductsSwiper products={products} />
    </Paper>
  );
};
