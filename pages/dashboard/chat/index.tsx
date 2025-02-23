import * as React from 'react';
import Container from '@mui/material/Container';
import Copyright from 'src/Copyright';
import Box from '@mui/material/Box';
import { CustomBreadcrumbs, IsUrl } from '@/components/common/customBreadcrumb';
import ChatAdmin from '@/components/pages/dashboard/chat/chatAdmin';

export default function Index() {
  const urls: IsUrl[] = [
    { name: 'Home', href: `/` },
    { name: 'Chat', href: `/dashboard/chat/` },
  ];
  return (
    <Container maxWidth={false} sx={{ maxWidth: '1400px' }}>
      <CustomBreadcrumbs sx={{ pt: 2 }} urls={urls} />
      <Box sx={{ my: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 7 }}>
          <ChatAdmin />
        </Box>
        <Copyright sx={{ py: 7 }} />
      </Box>
    </Container>
  );
}
