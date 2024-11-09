import * as React from 'react';
import Container from '@mui/material/Container';
import Copyright from 'src/Copyright';
import Box from '@mui/material/Box';
import { Login } from '@/components/common/login';
import useRedirectIfLoggedIn from '@/hooks/useRedirectIfLoggedIn';
import { Reminder } from '@/components/common/reminder';

export default function Index() {
  useRedirectIfLoggedIn();
  return (
    <Container maxWidth={false} sx={{ maxWidth: '1400px' }}>
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 7 }}>
          <Login />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
          <Reminder message="New to Logipsum?" link="/auth/register" linkText="Join now" />
        </Box>
        <Copyright sx={{ py: 7 }} />
      </Box>
    </Container>
  );
}
