import { Icon } from "@iconify/react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "../common/Link";
import { grey } from "@mui/material/colors";

const linkSX = {
    "& a": {
      color: grey[800],
      display: "flex",
      alignItems: "center",
      "&:-webkit-any-link": {
        textDecoration: "none",
      },
      "&:hover": {
        textDecoration: "none",
      },
    },
  };

const categories = [
  {
    name: "Mobiles",
    slug: "mobiles",
    icon: "entypo:mobile",
  },
  {
    name: "Laptops",
    slug: "laptops",
    icon: "ic:round-laptop",
  },
  {
    name: "Tvs",
    slug: "tvs",
    icon: "ic:baseline-tv",
  },
];

export const CategoriesList = () => (
  <List
    sx={{
      overflow: "auto",
      maxHeight: "90%",
      "& ul": { padding: 0 },
    }}
    subheader={<li />}
  >
    <li key={`section-categories`}>
      <ul>
        <ListSubheader>{`CATEGORIES`}</ListSubheader>
        {categories.map((category) => (
          <ListItem key={`item-category-${category.name}`}>
            <Link href={`/categories/${category.slug}/`} sx={linkSX}>
              <ListItemIcon sx={{ minWidth: 48, pl: 2.5 }}>
                <Icon icon={`${category.icon}`} />
              </ListItemIcon>
              <ListItemText primary={`${category.name}`} />
            </Link>
          </ListItem>
        ))}
      </ul>
    </li>
  </List>
);
