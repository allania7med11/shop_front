import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { ProductsSwiper } from "components/pages/index/productsSwiper";

export const Category = ({ category }) => {
  return (
    <Paper elevation={3}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {category.name}
          </Typography>
          <Button
            color="inherit"
            sx={{ textDecoration: "underline", textTransform: "none" }}
          >
            See More
          </Button>
        </Toolbar>
      </AppBar>
      <ProductsSwiper products={category.products} />
    </Paper>
  );
};
