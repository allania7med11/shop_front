import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { DrawerHeader } from 'components/layouts/drawer.styled.js';
import { drawerWidth } from "constants/drawerWidth"
import Logo from "components/layouts/logo.js"
import ListSubheader from '@mui/material/ListSubheader';

const categories = [
  {
    name: "Mobiles"
  },
  {
    name: "Laptops"
  },
  {
    name: "Tvs"
  },
]

const CategoriesList = () => (
  <List
    sx={{
      overflow: 'auto',
      maxHeight: "90%",
      '& ul': { padding: 0 },
    }}
    subheader={<li />}
  >
    
      <li key={`section-categories`}>
        <ul>
          <ListSubheader>{`CATEGORIES`}</ListSubheader>
          {categories.map((category) => (
            <ListItem key={`item-category-${category.name}`}>
              <ListItemText primary={`${category.name}`} />
            </ListItem>
          ))}
        </ul>
      </li>
  </List>)


export default function MiniDrawer({ open, handleDrawerClose }) {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
        variant=""
        anchor="left"
        open={open}>
        <DrawerHeader>
          <Button variant="text">
            <Logo />
          </Button>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <CategoriesList />
      </Drawer>
    </Box>
  );
}
