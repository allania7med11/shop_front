import * as React from 'react';
import { FC } from 'react';
import { Breadcrumbs, SxProps, Theme } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from '@/components/common/Link';
import { grey } from '@mui/material/colors';

export interface IsUrl {
  name: string;
  href: string;
}

const linkSX = {
  '& a': {
    color: grey[800],
    '&:-webkit-any-link': {
      textDecoration: 'none',
    },
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

export const CustomBreadcrumbs: FC<{
  sx?: SxProps<Theme>;
  urls: IsUrl[];
}> = ({ sx, urls }) => {
  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={sx}>
      {urls.map((url, id) => (
        <Link href={url.href} key={id} sx={linkSX}>
          {url.name}
        </Link>
      ))}
    </Breadcrumbs>
  );
};
