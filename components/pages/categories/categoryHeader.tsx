import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { blueGrey } from "@mui/material/colors";
import pluralize from "pluralize";
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
import { useRouter } from "next/router";
import { useCategoryQuery } from "@/store/reducer/apis/productApi";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const sxToolbar: SxProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "12px 6px",
  py: "12px",
  minHeight: "64px",
};

export const CategoryHeader = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data, error, isLoading } = useCategoryQuery(slug);
  const products = data && data.products;
  const [order, setOrder] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setOrder(event.target.value as string);
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" sx={{ backgroundColor: blueGrey[600] }}>
        <Toolbar variant="dense" sx={sxToolbar}>
          <Typography variant="h6" component="div">
            {data && data.name}
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
            {products &&
              `${products.length} ${pluralize("Result", products.length)}`}
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};
