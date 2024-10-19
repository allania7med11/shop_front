import * as React from 'react';
import Container from '@mui/material/Container';
import Copyright from 'src/Copyright';
import Box from '@mui/material/Box';
import useRedirectIfLoggedIn from '@/hooks/useRedirectIfLoggedIn';
import { Reminder } from '@/components/common/reminder';
import { ForgetPassword } from '@/components/common/forgetPassword';
import { CustomBreadcrumbs, IsUrl } from '@/components/common/customBreadcrumb';

export default function Index() {
  useRedirectIfLoggedIn();
  const urls: IsUrl[] = [
    { name: 'Home', href: `/` },
    { name: 'Forgot Password', href: `/auth/forget_password/` },
  ];
  return (
    <Container maxWidth={false} sx={{ maxWidth: '1400px' }}>
      <CustomBreadcrumbs sx={{ pt: 2 }} urls={urls} />
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 5 }}>
          <ForgetPassword />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
          <Reminder message="Don’t have an account?" link="/auth/register" linkText="Sign up" />
        </Box>
        <Copyright sx={{ py: 7 }} />
      </Box>
    </Container>
  );
}
