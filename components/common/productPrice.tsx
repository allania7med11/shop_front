import { IsDiscount } from "@/data/categories";
import { Box, Chip, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import getSymbolFromCurrency from "currency-symbol-map";

export interface IsPriceInfos {
  price: string;
  price_currency: string;
  discount: IsDiscount;
}
type IsSize = "medium" | "small";

const getPrices = ({ price, price_currency, discount }: IsPriceInfos) => {
  const priceValue = parseFloat(price);
  const percentValue = parseFloat(discount.percent);
  const symbol = getSymbolFromCurrency(price_currency);
  if (!discount || !discount.active) {
    return {
      priceAfterDiscount: `${symbol}${Math.round(priceValue * 100) / 100}`,
    };
  }
  const discountValue = (Number(price) * Number(discount.percent)) / 100;
  const priceAfterDiscountValue =
    Math.round((Number(price) - discountValue) * 100) / 100;
  return {
    oldPrice: `${symbol}${Math.round(priceValue * 100) / 100}`,
    discount_text: `${Math.round(percentValue)}% OFF`,
    priceAfterDiscount: `${symbol}${priceAfterDiscountValue}`,
  };
};

export const ProductPrice: React.FC<{
  priceInfos: IsPriceInfos;
  size?: IsSize;
}> = ({ priceInfos, size = "small" }) => {
  let variant: "body2" | "h4" = size == "small" ? "body2" : "h4";
  if (!priceInfos.discount) {
    return <Typography variant={variant}>{priceInfos.price}</Typography>;
  }
  const { priceAfterDiscount, oldPrice, discount_text } = getPrices(priceInfos);
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Typography variant={variant}>{priceAfterDiscount}</Typography>
      {discount_text && (
        <ProductDiscount oldPrice={oldPrice} discount_text={discount_text} size={size} />
      )}
    </Box>
  );
};

const ProductDiscount = ({ oldPrice, discount_text, size }) => {
  return (
  <>
    <Typography
      variant={size == "small" ? "body2" : "h5"}
      color="text.secondary"
      sx={{ textDecoration: "line-through", marginLeft: size == "small" ? "8px" : "24px", }}
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
        height: size == "small" ? 28 : 40,
        fontSize: size == "small" ? "16px" : "24px",
      }}
    />
  </>
)};
