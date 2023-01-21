import Paper from "@mui/material/Paper";
import { FC } from "react";
import { IsCategory } from "@/data/categories";
import { SxProps } from "@mui/material";
import React from "react";
import { Products } from "./products";
import { CategoryHeader } from "./categoryHeader";
import { blueGrey } from "@mui/material/colors";

export const Category: FC<{
  sx: SxProps;
}> = ({ sx }) => {
  return (
    <Paper elevation={3} sx={{ backgroundColor: blueGrey[50], ...sx }}>
      <CategoryHeader />
      <Products />
    </Paper>
  );
};
