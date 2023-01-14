import * as React from "react";
import { FC } from "react";
import { SxProps, Theme } from "@mui/material";
import { IsCategory } from "@/data/categories";
import { CustomBreadcrumbs, IsUrl } from "@/components/common/customBreadcrumb";


export const CategoryBreadcrumbs: FC<{
  sx?: SxProps<Theme>;
  category: IsCategory;
}> = ({ sx, category }) => {
  const urls: IsUrl[] = [{ name: "Home", href: `/` }];
  if (category) {
    urls.push({ name: category.name, href: `/categories/${category.slug}/` });
  }

  return <CustomBreadcrumbs sx={sx} urls={urls} />;
};
