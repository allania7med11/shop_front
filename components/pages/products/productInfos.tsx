import * as React from "react";
import { FC } from "react";
import { Paper, SxProps, Theme, Typography } from "@mui/material";
import { IsProduct } from "@/data/categories";
import { IsUrl } from "@/components/common/customBreadcrumb";
import { ProductPrice } from "@/components/common/productPrice";

export const ProductInfos: FC<{
  product: IsProduct;
}> = ({ product }) => {
  const { name, price, price_currency, discount } = product;

  return (
    <Paper elevation={3} sx={{ p: "24px", display: "flex", flexDirection: "column", gap: "32px" }}>
      <Typography gutterBottom variant="h5" component="div">
        {name}
      </Typography>
      <ProductPrice priceInfos={{ price, price_currency, discount }} size="medium" />
      <Typography gutterBottom variant="h6" component="div">
        About this product
      </Typography>
    </Paper>
  );
};
