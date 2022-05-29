import { Box, Chip, Typography } from "@mui/material";
import { green } from "@mui/material/colors";

const toNumber = (str) => Number(str.slice(1));
const getDiscount = (price, oldPrice) => {
  if (!oldPrice) {
    return;
  }
  const oldValue = toNumber(oldPrice);
  const value = toNumber(price);
  return Math.round(((oldValue - value) / oldValue) * 100);
};
export const ProductPrice = ({ price, oldPrice }) => {
  const discount = getDiscount(price, oldPrice);
  if (!discount) {
    return <Typography variant="body2">{price}</Typography>;
  }
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Typography variant="body2">{price}</Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textDecoration: "line-through" }}
      >
        {oldPrice}
      </Typography>
      <Chip
        label={`${discount}% OFF`}
        sx={{
          color: green[400],
          fontWeight: "Bold",
          backgroundColor: green[50],
          borderRadius: 100,
          height: 28,
        }}
      />
    </Box>
  );
};
