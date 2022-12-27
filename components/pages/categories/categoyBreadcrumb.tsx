import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { FC } from "react";
import { Link, SxProps, Theme } from "@mui/material";
import { IsCategory } from "@/data/categories";
import { CustomLink } from "@/components/common/customLink";

export const CategoryBreadcrumbs: FC<{
  sx?: SxProps<Theme>;
  category: IsCategory;
}> = ({ sx, category }) => {
  const breadcrumbs = [<CustomLink href={`/`}>See More</CustomLink>];
  if (category) {
    breadcrumbs.push(
      <CustomLink
        href={`/categories/${category.slug}/`}
        underline="hover"
        key="2"
        color="inherit"
      >
        {category.name}
      </CustomLink>
    );
  }

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={sx}
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
};
