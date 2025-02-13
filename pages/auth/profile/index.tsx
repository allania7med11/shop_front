import * as React from 'react';
import Container from '@mui/material/Container';
import Copyright from 'src/Copyright';
import Box from '@mui/material/Box';
import useRedirectIfAnonymous from '@/hooks/useRedirectIfAnonymous';
import { UpdateAccount } from '@/components/pages/profile/updateAccount';

export default function Index() {
  useRedirectIfAnonymous()
  return (
    <Container maxWidth={false} sx={{ maxWidth: '1400px' }}>
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 7 }}>
          <UpdateAccount />
        </Box>
        <Copyright sx={{ py: 7 }} />
      </Box>
    </Container>
  );
}
