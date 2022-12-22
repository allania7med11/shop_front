import Box from "@mui/material/Box";
import { Category } from "components/pages/index/category";

export const Categories = ({categories}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {categories.map((category, key) => (
        <Category key={key} category={category} />
      ))}
    </Box>
  );
};
