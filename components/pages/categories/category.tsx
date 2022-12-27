import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { ProductsSwiper } from "components/pages/index/productsSwiper";
import { blueGrey } from '@mui/material/colors';
import { FC } from "react";
import { IsCategory } from "@/data/categories";
import pluralize from "pluralize";
import { QueryStatus } from "react-query/types/core";


export const Category: FC<{ category: IsCategory, status: QueryStatus }> = ({ category, status }) => {
  if (status === "idle") {
    return ;
  }
  if (status === "loading") {
    return <p>Loading data...</p>;
  }
  if (status === "error") {
    return <p>Error fetching data</p>;
  }
  let products = category? category.products: []
  return (
    <Paper elevation={3}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ backgroundColor: blueGrey[600] }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {category.name}
          </Typography>
          <Typography variant="subtitle1" component="div">
            {products.length} {pluralize("Result", products.length)}
          </Typography>
        </Toolbar>
      </AppBar>
      <ProductsSwiper products={products} />
    </Paper>
  );
};
