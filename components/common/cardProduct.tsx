import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { ProductPrice } from "@/components/common/productPrice";
import { IsProduct } from "@/data/categories";
import { Link } from "./Link";

export const CardProduct: React.FC<{ product: IsProduct }> = ({ product }) => {
  const { name, files, price, price_currency, discount, current_price } = product;
  const imageUrl = files.length > 0 ? files[0].url : "";
  return (
    <Card sx={{ width: 260, display: "flex", flexDirection: "column", px: 1 }}>
      <Link href={`/products/${product.slug}/`}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={imageUrl}
          sx={{ objectFit: "contain", mt: 2 }}
        />
      </Link>

      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: 0.5, pt: 3 }}
      >
        <Tooltip title={name} arrow>
          <Typography noWrap gutterBottom variant="body1" component="div">
            {name}
          </Typography>
        </Tooltip>
        <ProductPrice priceInfos={{ price, price_currency, discount, current_price }} />
      </CardContent>
    </Card>
  );
};
