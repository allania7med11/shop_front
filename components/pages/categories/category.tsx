import Paper from "@mui/material/Paper";
import { FC } from "react";
import { IsCategory } from "@/data/categories";
import { QueryStatus } from "react-query/types/core";
import {
  SxProps,
} from "@mui/material";
import React from "react";
import { Products } from "./products";
import { CategoryHeader } from "./categoryHeader";
import { blueGrey } from "@mui/material/colors";



export const Category: FC<{
  category: IsCategory;
  status: QueryStatus;
  sx: SxProps;
}> = ({ category, status, sx }) => {
  if (status === "idle") {
    return;
  }
  if (status === "loading") {
    return <p>Loading data...</p>;
  }
  if (status === "error") {
    return <p>Error fetching data</p>;
  }
  let products = category ? category.products  : [];
  return (
    <Paper elevation={3} sx={{ backgroundColor: blueGrey[50], ...sx }}>
      <CategoryHeader category={category} />
      <Products products={products} />
    </Paper>
  );
};
