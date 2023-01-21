import "swiper/css";
import "swiper/css/navigation";
import Box from "@mui/material/Box";
import { CardProduct } from "@/components/common/cardProduct";
import { SxProps } from "@mui/material";
import { useProductsQuery } from "@/store/reducer/apis/productApi";
import { useRouter } from "next/router";
import { FetchWrap } from "@/components/common/fetchWrap";

const sxProducts: SxProps = {
  p: "24px",
  display: "grid",
  gap: "24px",
  gridTemplateColumns: "repeat(auto-fill, minmax(min(230px, 100%), 1fr))",
  justifyItems: "center",
};

export const Products = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data, error, isLoading } = useProductsQuery(slug, {
    skip: !router.isReady,
  });
  const products = data ? data : [];
  return (
    <FetchWrap isLoading={isLoading} error={error} data={data}>
      <Box sx={sxProducts}>
        {products.map((product, key) => (
          <CardProduct key={key} product={product} />
        ))}
      </Box>
    </FetchWrap>
  );
};
