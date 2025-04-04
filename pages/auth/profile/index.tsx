import * as React from 'react';
import Container from '@mui/material/Container';
import Copyright from 'src/Copyright';
import Box from '@mui/material/Box';
import useRedirectIfAnonymous from '@/hooks/useRedirectIfAnonymous';
import { UpdateAccount } from '@/components/pages/profile/updateAccount';
import { CustomBreadcrumbs, IsUrl } from '@/components/common/customBreadcrumb';

export default function Index() {
  useRedirectIfAnonymous();
  const urls: IsUrl[] = [
    { name: 'Home', href: `/` },
    { name: 'Profile', href: `/auth/profile/` },
  ];
  return (
    <Container maxWidth={false} sx={{ maxWidth: '1400px' }}>
      <CustomBreadcrumbs sx={{ pt: 2 }} urls={urls} />
      <Box sx={{ my: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
          <UpdateAccount />
        </Box>
        <Copyright sx={{ py: 7 }} />
      </Box>
    </Container>
  );
}
