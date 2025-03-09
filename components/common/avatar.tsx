import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, Typography, Box, Button, Divider } from '@mui/material';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from '@/components/common/Link';
import { grey } from '@mui/material/colors';
import { useLogoutUserMutation } from '@/store/reducer/apis/authApi';
import useAuth from '@/hooks/useAuth';
import { sxLink } from '@/styles/linkStyle';

export const AvatarComponent = () => {
  const { isAuthenticated, fullName, profile_photo } = useAuth();
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const userLoggedIn = Boolean(fullName);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await logoutUser().unwrap();
    handleClose();
  };

  return (
    <Box display="flex" alignItems="center">
      <Button
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="large"
        sx={{ color: grey[800], textTransform: 'none' }}
      >
        {userLoggedIn ? (
          <>
            <Avatar
              alt="Profile Photo"
              src={profile_photo}
              sx={{ width: 40, height: 40 }}
            />
            <ArrowDropDownOutlinedIcon />
          </>
        ) : (
          <>
            <Avatar>
              <PersonIcon />
            </Avatar>
            <ArrowDropDownOutlinedIcon />
          </>
        )}
      </Button>
      <Menu id="user-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        {isAuthenticated ? (
          [
            <MenuItem key="1" onClick={handleClose}>
              <Link href="/auth/profile" sx={sxLink}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} >
                    <Avatar
                      alt="Profile Photo"
                      src={profile_photo}
                      sx={{ width: 48, height: 48 }}
                    />
                    <Typography variant="body1">{fullName}</Typography>
                  </Box>
                  <Button variant="outlined" sx={{ textTransform: "none", width: "100%", p: 0, borderRadius: "50px" }}>View Profile</Button>
                </Box>
              </Link>
            </MenuItem>,
            <Divider />,
            <MenuItem onClick={handleLogout} disabled={isLoading}>
              {isLoading ? 'Logging out...' : 'Logout'}
            </MenuItem>,
          ]

        ) : (
          [
            <MenuItem key="1" onClick={handleClose}>
              <Link href="/auth/register" sx={sxLink}>
                Sign up
              </Link>
            </MenuItem>,
            <MenuItem key="2" onClick={handleClose}>
              <Link href="/auth/login" sx={sxLink}>
                Login
              </Link>
            </MenuItem>,
          ]
        )}
      </Menu>
    </Box>
  );
};
