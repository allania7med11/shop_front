import "swiper/css";
import "swiper/css/navigation";
import Box from "@mui/material/Box";
import { CardProduct } from "@/components/common/cardProduct";
import { SxProps } from "@mui/material";
import { useProductsQuery } from "@/store/reducer/apis/productApi";
import { FetchWrap } from "@/components/common/fetchWrap";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducer";
import { IsProductFilters } from "@/data/categories";
import { useCurrentCartQuery } from "@/store/reducer/apis/cartApi";
import { addItemsToProducts } from "@/utils/products";

const sxProducts: SxProps = {
  p: "24px",
  display: "grid",
  gap: "24px",
  gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))",
  justifyItems: "center",
};

export const Products = () => {
  const { data: { items } } = useCurrentCartQuery();
  const filters: IsProductFilters = useSelector((state: RootState) => ({
    category: state.filters.categorySlug || "",
    search: state.filters.search || [""],
    current_price_min: state.filters.current_price_min || "",
    current_price_max: state.filters.current_price_max || "",
    discount_min: state.filters.discount_min || "",
    discount_max: state.filters.discount_max || "",
    ordering: state.filters.ordering || "",
  }));
  const { data: productsApi = [], error, isLoading } = useProductsQuery(filters, {
    skip: !filters.category,
  });
  const products = addItemsToProducts(productsApi, items);
  return (
    <FetchWrap isLoading={isLoading} error={error} data={products}>
      <Box sx={sxProducts}>
        {products.map((product, key) => (
          <CardProduct key={key} product={product} />
        ))}
      </Box>
    </FetchWrap>
  );
};
