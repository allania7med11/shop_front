import * as React from "react";

import { Badge, Box, Button, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "@/components/layouts/logo";
import { AppBar } from "@/components/layouts/appBar.styled";
import { Link } from "@/components/common/Link";
import { AvatarComponent } from "@/components/common/avatar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCartItemsQuery } from "@/store/reducer/apis/cartApi";
import { useGetUserProfileQuery } from "@/store/reducer/apis/authApi";  
import { getFullName } from "@/utils/auth";

export default function NavBar({ open, handleDrawerOpen }) {
  const { data: items = [] } = useCartItemsQuery();
  const { data: userProfile } = useGetUserProfileQuery();  

  return (
    <AppBar
      position="fixed"
      open={open}
      sx={{ bgcolor: "white", color: "black", height: "64px" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          sx={{
            mr: 2,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <Button variant="text">
            <Logo />
          </Button>
        </Link>
        <Box sx={{ flexGrow: 1 }}></Box>
        <AvatarComponent fullName={ getFullName(userProfile) } /> 
        <Link href="/cart">
          <IconButton>
            <Badge badgeContent={items.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}