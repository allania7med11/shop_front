import * as React from 'react';
import { store } from '@/store';
import Box from '@mui/material/Box';
import Navbar from '@/components/layouts/navBar';
import Sidebar from '@/components/layouts/sideBar';
import { Main } from '@/components/layouts/main.styled';
import { Provider } from 'react-redux';

export default function Layout({ children }) {
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Provider store={store}>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      <Main open={open}>
        <Box sx={{ mt: 10 }}>{children}</Box>
      </Main>
    </Provider>
  );
}
