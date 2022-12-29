import "swiper/css";
import "swiper/css/navigation";
import { blueGrey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import { IsProduct } from "@/data/categories";
import { FC } from "react";
import { CardProduct } from "@/components/common/cardProduct";

export const Products: FC<{ products: IsProduct[] }> = ({ products }) => {
  return (
    <Box sx={{ p: "24px" }}>
      {products &&
        products.map((product, key) => (
          <CardProduct key={key} product={product} />
        ))}
    </Box>
  );
};
