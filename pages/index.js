import * as React from 'react';
import Container from '@mui/material/Container';
import ProTip from 'src/ProTip';
import Copyright from 'src/Copyright';
import Box from '@mui/material/Box';
import { PageTitle } from 'components/pages/pageTitle';

export default function Index() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <PageTitle>
          Discover Our Products and Categories
        </PageTitle>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
