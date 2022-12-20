import * as React from 'react';
import Container from '@mui/material/Container';
import Copyright from 'src/Copyright';
import Box from '@mui/material/Box';
import { PageTitle } from 'components/common/pageTitle';
import { Categories } from 'components/pages/index/categories';

export default function Index() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <PageTitle sx={{ py: 7 }}>
          Discover Our Products and Categories
        </PageTitle>
        <Categories />
        <Copyright sx={{ py: 7 }} />
      </Box>
    </Container>
  );
}
