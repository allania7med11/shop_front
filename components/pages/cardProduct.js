import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { ProductPrice } from "components/pages/productPrice";

export const CardProduct = ({ product }) => {
  const { name, image, price, price_currency, discount } = product;
  return (
    <Card sx={{ maxWidth: 220 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={image}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
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
