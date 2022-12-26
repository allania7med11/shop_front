import Box from "@mui/material/Box";
import { Category } from "@/components/pages/index/category";
import { IsCategory } from "@/data/categories";
import { FC } from "react";

export const Categories: FC<{ categories: IsCategory[] }> = ({categories}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {categories.map((category, key) => (
        <Category key={key} category={category} />
      ))}
    </Box>
  );
};
