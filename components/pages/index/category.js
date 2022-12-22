import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { ProductsSwiper } from "components/pages/index/productsSwiper";
import Link from "next/link";
import { blueGrey } from '@mui/material/colors';

const linkSX = {
  textDecoration: "underline", textTransform: "none", color: "white",
  "&:hover": {
    textDecoration: "underline"
  }
}

export const Category = ({ category }) => {
  return (
    <Paper elevation={3}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ backgroundColor: blueGrey[600] }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {category.name}
          </Typography>
          <Link href={`/categories/${category.slug}/`} passHref>
            <Button
              sx={linkSX}
            >
              See More
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <ProductsSwiper products={category.products} />
    </Paper>
  );
};
