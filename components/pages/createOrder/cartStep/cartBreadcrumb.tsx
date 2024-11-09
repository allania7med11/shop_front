import * as React from 'react';
import { FC } from 'react';
import { SxProps, Theme } from '@mui/material';
import { CustomBreadcrumbs, IsUrl } from '@/components/common/customBreadcrumb';

export const CartBreadcrumbs: FC<{
  sx?: SxProps<Theme>;
}> = ({ sx }) => {
  const urls: IsUrl[] = [
    { name: 'Home', href: `/` },
    { name: 'Cart', href: `/cart` },
  ];
  return <CustomBreadcrumbs sx={sx} urls={urls} />;
};
