import { Box, Chip, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import getSymbolFromCurrency from "currency-symbol-map";

const getPrices = (price, price_currency, discount) => {
  const symbol = getSymbolFromCurrency(price_currency);
  if (!discount.active) {
    return { priceAfterDiscount: `${symbol}${Math.round(price * 100) / 100}` };
  }
  const discountValue = (Number(price) * Number(discount.percent)) / 100;
  const priceAfterDiscountValue =
    Math.round((Number(price) - discountValue) * 100) / 100;
  return {
    oldPrice: `${symbol}${Math.round(price * 100) / 100}`,
    discount_text: `${Math.round(discount.percent)}% OFF`,
    priceAfterDiscount: `${symbol}${priceAfterDiscountValue}`,
  };
};
export const ProductPrice = ({ price, price_currency, discount }) => {
  const { priceAfterDiscount, oldPrice, discount_text } = getPrices(
    price,
    price_currency,
    discount
  );
  if (!discount) {
    return <Typography variant="body2">{price}</Typography>;
  }
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Typography variant="body2">{priceAfterDiscount}</Typography>
      {discount_text && (
        <ProductDiscount oldPrice={oldPrice} discount_text={discount_text} />
      )}
    </Box>
  );
};

const ProductDiscount = ({ oldPrice, discount_text }) => (
  <>
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ textDecoration: "line-through" }}
    >
      {oldPrice}
    </Typography>
    <Chip
      label={discount_text}
      sx={{
        color: green[400],
        fontWeight: "Bold",
        backgroundColor: green[50],
        borderRadius: 100,
        height: 28,
      }}
    />
  </>
);
