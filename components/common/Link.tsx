import NextLink from 'next/link';
import Box from '@mui/material/Box';

export const Link = ({ href, children, ...props }) => (
  <Box {...props}>
    <NextLink href={href} passHref>
      {children}
    </NextLink>
  </Box>
);
