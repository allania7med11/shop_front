import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { ProductsSwiper } from "components/pages/index/productsSwiper";
import { blueGrey } from '@mui/material/colors';
import { FC } from "react";
import { IsCategory } from "@/data/categories";
import { CustomLink } from "@/components/common/customLink";

const linkSX = {
  textDecoration: "underline", textTransform: "none", color: "white",
  "&:hover": {
    textDecoration: "underline"
  }
}

 
export const Category: FC<{ category: IsCategory }> = ({ category }) => {
  let products = category? category.products: []
  return (
    <Paper elevation={3}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ backgroundColor: blueGrey[600] }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {category.name}
          </Typography>
          <CustomLink href={`/categories/${category.slug}/`} sx={linkSX}>
              See More
          </CustomLink>
        </Toolbar>
      </AppBar>
      <ProductsSwiper products={products} />
    </Paper>
  );
};