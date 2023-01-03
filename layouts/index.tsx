import * as React from 'react';
import Box from "@mui/material/Box";
import Navbar from '@/components/layouts/navBar'
import Sidebar from '@/components/layouts/sideBar'
import { Main } from '@/components/layouts/main.styled';


export default function Layout({ children }) {
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      <Main open={open}>
      <Box sx={{ mt: 10 }}>
        {children}
      </Box>
      </Main>
    </>
  )
}