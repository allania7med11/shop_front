import 'swiper/css';
import 'swiper/css/navigation';
import Box from '@mui/material/Box';
import { CardProduct } from '@/components/common/cardProduct';
import { SxProps } from '@mui/material';
import { useProductsQuery } from '@/store/reducer/apis/productApi';
import { FetchWrap } from '@/components/common/fetchWrap';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducer';
import { IsProductFilters } from '@/data/categories';
import { useCurrentCartQuery } from '@/store/reducer/apis/cartApi';
import { addItemsToProducts } from '@/utils/products';
import { useMemo } from 'react';

const sxProducts: SxProps = {
  p: '24px',
  display: 'grid',
  gap: '24px',
  gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))',
  justifyItems: 'center',
};

export const Products = () => {
  const { data } = useCurrentCartQuery();

  const items = useMemo(() => data?.items ?? [], [data?.items]);
  const filters: IsProductFilters = useSelector((state: RootState) => {
    // Define a list of keys excluding categorySlug since it's always present
    const keys: (keyof IsProductFilters)[] = [
      'search',
      'current_price_min',
      'current_price_max',
      'discount_min',
      'discount_max',
      'ordering',
    ];
    // Create an object with only non-empty filters based on the list of keys
    const category = state.filters.categorySlug;
    let nonEmptyFilters = category ? { category: category } : {};
    nonEmptyFilters = keys.reduce((acc, key) => {
      const value = state.filters[key];
      // Check if the value is not empty (for strings and arrays)
      if (value !== '' && !(Array.isArray(value) && value.length === 0)) {
        acc[key] = value;
      }
      return acc;
    }, nonEmptyFilters);

    // Assign categorySlug to category since it's always not empty
    nonEmptyFilters.category = state.filters.categorySlug;

    return nonEmptyFilters;
  });

  const {
    data: productsApi = [],
    error,
    isLoading,
  } = useProductsQuery(filters, {
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
