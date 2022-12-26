import * as React from 'react';

import { Button, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from "@/components/layouts/logo"
import { AppBar } from '@/components/layouts/appBar.styled';



export default function NavBar({ open, handleDrawerOpen }) {
  return (
    <AppBar position="fixed" open={open} sx={{ bgcolor: "white", color: "black", height: "64px" }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          sx={{
            mr: 2,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Button variant="text">
          <Logo />
        </Button>
      </Toolbar>
    </AppBar>
  );
}
