import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import { CardProduct } from "components/pages/cardProduct";

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
      <Box
        sx={{ backgroundColor: blue[50], display: "flex", padding: 4, gap: 4 }}
      >
        {category.products.map((product) => (
          <CardProduct product={product} />
        ))}
      </Box>
    </Paper>
  );
};
