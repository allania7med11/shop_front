import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, IconButton, Typography, Box } from '@mui/material';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from '@/components/common/Link'; // Corrected import path

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
            {userLoggedIn ? (
                <Typography variant="h6" marginLeft={1} onClick={handleClick}>
                    {fullName}
                    <ArrowDropDownOutlinedIcon />
                </Typography>
            ) : (
                <>
                    <IconButton
                        aria-controls="user-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        size="large"
                    >
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                        <ArrowDropDownOutlinedIcon />
                    </IconButton>
                </>
            )}
            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                {userLoggedIn ? (
                    <MenuItem onClick={handleClose}>
                        <Link href="/logout">Logout</Link>
                    </MenuItem>
                ) : (
                    <>
                        <MenuItem onClick={handleClose}>
                            <Link href="/signup">Sign up</Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link href="/login">Login</Link>
                        </MenuItem>
                    </>
                )}
            </Menu>
        </Box>
    );
};
