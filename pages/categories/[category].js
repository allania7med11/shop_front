import * as React from 'react';
import Container from '@mui/material/Container';
import Copyright from 'src/Copyright';
import Box from '@mui/material/Box';
import { PageTitle } from 'components/common/pageTitle';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router'

export default function Index() {
    const router = useRouter()
    const { category } = router.query
    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <PageTitle sx={{ py: 7 }}>
                    {category} category page
                </PageTitle>
                <Copyright sx={{ py: 7 }} />
            </Box>
        </Container>
    );
}