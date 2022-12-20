import Box from "@mui/material/Box";
import { Category } from "components/pages/index/category";
import { useCategoriesRead } from "hooks/api/categories";

export const Categories = (categories) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {categories
        // @ts-ignore
        .map((category, key) => (
          <Category key={key} category={category} />
        ))}
    </Box>
  );
};
