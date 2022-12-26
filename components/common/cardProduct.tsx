import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { ProductPrice } from "@/components/common/productPrice";
import { IsProduct } from "@/data/categories";

export const CardProduct: React.FC<{ product: IsProduct }> = ({ product }) => {
  const { name, files, price, price_currency, discount } = product;
  const imageUrl = files.length > 0 ? files[0].url : "";
  return (
    <Card
      sx={{ maxWidth: 220, display: "flex", flexDirection: "column", px: 1 }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={imageUrl}
        sx={{ objectFit: "contain", mt: 2 }}
      />
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: 0.5, pt: 3 }}
      >
        <Tooltip title={name} arrow>
          <Typography noWrap gutterBottom variant="body1" component="div">
            {name}
          </Typography>
        </Tooltip>
        <ProductPrice
          price={price}
          price_currency={price_currency}
          discount={discount}
        />
      </CardContent>
    </Card>
  );
};
