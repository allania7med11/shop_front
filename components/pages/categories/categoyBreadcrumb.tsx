import * as React from "react";
import { FC } from "react";
import { Breadcrumbs, SxProps, Theme } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { IsCategory } from "@/data/categories";
import { Link } from "@/components/common/Link";
import { grey } from "@mui/material/colors";



const linkSX = {
  "& a": {
    color: grey[800],
    "&:-webkit-any-link": {
      textDecoration: "none",
    },
    "&:hover": {
      textDecoration: "underline",
    },
  },
};

export const CategoryBreadcrumbs: FC<{
  sx?: SxProps<Theme>;
  category: IsCategory;
}> = ({ sx, category }) => {
  const breadcrumbs = [<Link key="1" href={`/`} sx={linkSX}>Home</Link>];
  if (category) {
    breadcrumbs.push(
      <Link
        href={`/categories/${category.slug}/`}
        key="2"
        sx={linkSX}
      >
        {category.name}
      </Link>
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
