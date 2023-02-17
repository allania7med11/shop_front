import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "../common/Link";
import { grey } from "@mui/material/colors";
import { useCategoriesQuery } from "@/store/reducer/apis/productApi";
import { SxProps } from "@mui/material";

const sxItem: SxProps = {
  display: "flex",
  "& >div": {
    flexGrow: 1,
  },
  "& a": {
    with: "100%",
    color: grey[700],
    display: "flex",
    alignItems: "center",
    "&:-webkit-any-link": {
      textDecoration: "none",
    },
    "&:hover": {
      textDecoration: "none",
      backgroundColor: grey[100],
      color: grey[900],
    },
  },
};

export const CategoriesList = () => {
  const { data } = useCategoriesQuery();
  return (
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
          {data &&
            data.map((category) => (
              <ListItem key={`item-category-${category.name}`} sx={sxItem}>
                <Link href={`/categories?slug=${category.slug}`} >
                  <ListItemText sx={{  pl: 4 }} primary={`${category.name}`} />
                </Link>
              </ListItem>
            ))}
        </ul>
      </li>
    </List>
  );
};
