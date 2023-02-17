import * as React from "react";
import { FC } from "react";
import { SxProps, Theme } from "@mui/material";
import { IsProduct } from "@/data/categories";
import { CustomBreadcrumbs, IsUrl } from "@/components/common/customBreadcrumb";

export const ProductBreadcrumbs: FC<{
  sx?: SxProps<Theme>;
  product: IsProduct;
}> = ({ sx, product }) => {
  const urls: IsUrl[] = [{ name: "Home", href: `/` }];
  if (product) {
    const category = product.category;
    urls.push(
      ...[
        { name: category.name, href: `/categories?slug=${category.slug}` },
        { name: product.name, href: `/products?slug=${product.slug}` },
      ]
    );
  }

  return <CustomBreadcrumbs sx={sx} urls={urls} />;
};
