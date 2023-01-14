import * as React from "react";
import { FC } from "react";
import { Box, Paper, SxProps, Typography } from "@mui/material";
import { IsProduct } from "@/data/categories";
import { ProductPrice } from "@/components/common/productPrice";
import { HtmlRender } from "@/components/common/htmlRender";
import { grey } from "@mui/material/colors";

const sxPaper: SxProps = {
  p: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  height: "100%",
};

export const ProductInfos: FC<{
  product: IsProduct;
}> = ({ product }) => {
  const { name, price, price_currency, discount, description_html } = product;

  return (
    <Paper elevation={3} sx={sxPaper}>
      <Typography gutterBottom variant="h5" component="div">
        {name}
      </Typography>
      <ProductPrice
        priceInfos={{ price, price_currency, discount }}
        size="medium"
      />
      <Box>
        <Typography gutterBottom variant="h6" component="div">
          About this product
        </Typography>
        <Typography
          gutterBottom
          variant="body1"
          component="div"
          sx={{ color: grey[800], wordBreak: "break-all" }}
        >
          <HtmlRender rawHTML={description_html} />
        </Typography>
      </Box>
    </Paper>
  );
};
