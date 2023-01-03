import "swiper/css";
import "swiper/css/navigation";
import Box from "@mui/material/Box";
import { IsProduct } from "@/data/categories";
import { FC } from "react";
import { CardProduct } from "@/components/common/cardProduct";
import { SxProps } from "@mui/material";

const sxProducts: SxProps = {
  p: "24px",
  display: "grid",
  gap: "24px",
  gridTemplateColumns: "repeat(auto-fill, minmax(min(230px, 100%), 1fr))",
  justifyItems: "center"
};

export const Products: FC<{ products: IsProduct[] }> = ({ products }) => {
  return (
    <Box sx={sxProducts}>
      {products &&
        products.map((product, key) => (
          <CardProduct key={key} product={product} />
        ))}
    </Box>
  );
};
