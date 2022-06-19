import * as React from 'react';
import Navbar from 'components/layouts/navBar'
import Sidebar from 'components/layouts/sideBar'
import { Main } from 'components/layouts/main.styled.js';


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
        {children}
      </Main>
    </>
  )
}