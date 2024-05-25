import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, Typography, Box, SxProps, Button } from '@mui/material';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from '@/components/common/Link';
import { grey } from '@mui/material/colors';

const sxLink: SxProps = { "& a": { textDecoration: 'none', color: "inherit" } };

export const AvatarComponent: React.FC<{ fullName: string }> = ({ fullName }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const userLoggedIn = Boolean(fullName);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box display="flex" alignItems="center">
            <Button
                aria-controls="user-menu"
                aria-haspopup="true"
                onClick={handleClick}
                size="large"
                sx={{ color: grey[800], textTransform: "none" }}
            >
                {userLoggedIn ? (
                    <Box display="flex" alignItems="center">
                        <Typography variant="body1">
                            {fullName}
                        </Typography>
                        <ArrowDropDownOutlinedIcon />
                    </Box>
                ) : (
                    <>
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                        <ArrowDropDownOutlinedIcon />
                    </>
                )}
            </Button>
            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                {userLoggedIn ? (
                    <MenuItem onClick={handleClose}>
                        <Link href="/logout" sx={sxLink}>Logout</Link>
                    </MenuItem>
                ) : (
                    <>
                        <MenuItem onClick={handleClose}>
                            <Link href="/signup" sx={sxLink}>Sign up</Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link href="/login" sx={sxLink}>Login</Link>
                        </MenuItem>
                    </>
                )}
            </Menu>
        </Box>
    );
};
