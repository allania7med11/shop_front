import * as React from 'react';
import Container from '@mui/material/Container';
import Copyright from 'src/Copyright';
import Box from '@mui/material/Box';
import { PageTitle } from '@/components/common/pageTitle';
import { Categories } from '@/components/pages/index/categories';
import { useCategoriesQuery } from '@/store/reducer/apis/productApi';
import { FetchWrap } from '@/components/common/fetchWrap';

export default function Index() {
  const { data, error, isLoading } = useCategoriesQuery();
  return (
    <Container maxWidth={false} sx={{ maxWidth: '1400px' }}>
      <Box sx={{ my: 4 }}>
        <PageTitle sx={{ py: 7 }}>Discover Our Products and Categories</PageTitle>
        <FetchWrap isLoading={isLoading} error={error} data={data}>
          <Categories categories={data} />
        </FetchWrap>
        <Copyright sx={{ py: 7 }} />
      </Box>
    </Container>
  );
}
