import * as React from "react";

import { Badge, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Logo from "@/components/layouts/logo";
import { AppBar } from "@/components/layouts/appBar.styled";
import { Link } from "@/components/common/Link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCartItemsQuery } from "@/store/reducer/apis/cartApi";
import { useProfileQuery } from "@/store/reducer/apis/authApi";

export default function NavBar({ open, handleDrawerOpen }) {
  const { data: items = [] } = useCartItemsQuery();
  const { data: profile = false } = useProfileQuery();
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
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Link href="/auth/login" sx={{ "& a": { textDecoration: "none" } }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography color="gray">
                {profile ? `Welcome ${profile.first_name} ${profile.last_name}` : `Welcome, log in`}
              </Typography>
              <IconButton>
                <PermIdentityIcon />
              </IconButton>
            </Box>
          </Link>
          <Link href="/cart">
            <IconButton>
              <Badge badgeContent={items.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
        </Box>

      </Toolbar>
    </AppBar>
  );
}