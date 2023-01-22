import { IsDiscount } from "@/data/categories";
import { Box, Chip, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import getSymbolFromCurrency from "currency-symbol-map";

export interface IsPriceInfos {
  price: string;
  price_currency: string;
  discount: IsDiscount;
  current_price: number;
}
type IsSize = "medium" | "small";

const getPrices = ({ price, price_currency, discount, current_price }: IsPriceInfos) => {
  const symbol = getSymbolFromCurrency(price_currency);
  if (!discount || !discount.active) {
    return {
      priceAfterDiscount: `${symbol}${current_price}`,
    };
  }
  const priceValue = parseFloat(price);
  const percentValue = parseFloat(discount.percent);
  return {
    oldPrice: `${symbol}${Math.round(priceValue * 100) / 100}`,
    discount_text: `${Math.round(percentValue)}% OFF`,
    priceAfterDiscount: `${symbol}${current_price}`,
  };
};

export const ProductPrice: React.FC<{
  priceInfos: IsPriceInfos;
  size?: IsSize;
}> = ({ priceInfos, size = "small" }) => {
  let variant: "body2" | "h4" = size == "small" ? "body2" : "h4";
  const { priceAfterDiscount, oldPrice, discount_text } = getPrices(priceInfos);
  if (!discount_text) {
    return <Typography variant={variant}>{priceAfterDiscount}</Typography>;
  }
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
