import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemText from '@mui/material/ListItemText';
import { Link } from '../common/Link';
import { grey } from '@mui/material/colors';
import { useCategoriesQuery } from '@/store/reducer/apis/productApi';
import { ListItemIcon, SxProps } from '@mui/material';
import { AccountCircle, ShoppingBasket } from '@mui/icons-material';
import useAuth from '@/hooks/useAuth';

const sxItem: SxProps = {
  display: 'flex',
  py: 0,
  mb: "12px",
  '& >div': {
    flexGrow: 1,
  },
  '& a': {
    with: '100%',
    color: grey[700],
    display: 'flex',
    alignItems: 'center',
    '&:-webkit-any-link': {
      textDecoration: 'none',
    },
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: grey[100],
      color: grey[900],
    },
  },
};

export const CategoriesList = () => {
  const { data } = useCategoriesQuery();
  const { isAuthenticated } = useAuth();
  return (
    <List
      sx={{
        overflow: 'auto',
        maxHeight: '90%',
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {isAuthenticated && <li key={`section-user`}>
        <ul>
          <ListSubheader sx={{ lineHeight: "36px", mt: "16px" }}>{`USER`}</ListSubheader>
          <ListItem key={`item-user-profile`} sx={sxItem}>
            <Link href={`/auth/profile/`}>
              <ListItemIcon sx={{ minWidth: "40px" }}>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary={`Profile`} />
            </Link>
          </ListItem>
        </ul>
      </li>}
      <li key={`section-categories`}>
        <ul>
          <ListSubheader sx={{ lineHeight: "36px", mt: "24px" }}>{`CATEGORIES`}</ListSubheader>
          {data &&
            data.map(category => (
              <ListItem key={`item-category-${category.name}`} sx={sxItem}>
                <Link href={`/categories?slug=${category.slug}`}>
                  <ListItemIcon sx={{ minWidth: "40px", visibility: "hidden" }}>
                    <ShoppingBasket />
                  </ListItemIcon>
                  <ListItemText sx={{ textTransform: "capitalize" }} primary={`${category.name}`} />
                </Link>
              </ListItem>
            ))}
        </ul>
      </li>
    </List>
  );
};
