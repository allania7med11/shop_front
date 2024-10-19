import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { blueGrey } from '@mui/material/colors';
import pluralize from 'pluralize';
import {
  createTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
  ThemeProvider,
} from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';
import { useCategoryQuery } from '@/store/reducer/apis/productApi';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrdering } from '@/store/reducer/slices/filters';
import { IsProductOrder } from '@/data/categories';
import { RootState } from '@/store/reducer';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const sxToolbar: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '12px 6px',
  py: '12px',
  minHeight: '64px',
};

export const CategoryHeader = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data } = useCategoryQuery(slug, {
    skip: !router.isReady,
  });
  const products = data && data.products;
  const { order } = useSelector((state: RootState) => ({
    order: state.filters.ordering || '',
  }));
  const dispatch = useDispatch();
  const setOrder = value => dispatch(updateOrdering(value));
  const handleChange = (event: SelectChangeEvent) => {
    setOrder(event.target.value as IsProductOrder);
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" sx={{ backgroundColor: blueGrey[600] }}>
        <Toolbar variant="dense" sx={sxToolbar}>
          <Typography variant="h6" component="div">
            {data && data.name}
          </Typography>
          <FormControl sx={{ minWidth: '180px' }} size="small">
            <InputLabel id="order-select-label">Order by</InputLabel>
            <Select
              labelId="order-select-label"
              id="order-select"
              label="Age"
              value={order}
              onChange={handleChange}
            >
              <MenuItem value="">----</MenuItem>
              <MenuItem value="current_price">Price: Low to High</MenuItem>
              <MenuItem value="-current_price">Price: High to Low</MenuItem>
              <MenuItem value="name">Name: A to Z</MenuItem>
              <MenuItem value="-name">Name: Z to A</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="subtitle1" component="div">
            {products && `${products.length} ${pluralize('Result', products.length)}`}
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};
