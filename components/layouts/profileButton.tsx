import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useLogoutMutation, useProfileQuery } from "@/store/reducer/apis/authApi";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import { Link } from "@/components/common/Link";

const profileButton = () => {
    const [logout, response] = useLogoutMutation();
    let { data: profile = false, error } = useProfileQuery();
    if(error){
        profile = false
    }
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = async () => {
        setAnchorEl(null);
        await logout()
    };
    return (
        <div>
            <Button
                sx={{ textTransform: "none" }}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                endIcon={<PermIdentityIcon sx={{ color: "gray" }} />}
                onClick={handleClick}
            >
                <Typography color="gray">
                    {profile
                        ? `Welcome ${profile.first_name} ${profile.last_name}`
                        : `Welcome, log in`}
                </Typography>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {profile && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
                {!profile && (
                    <MenuItem>
                        <Link href="/auth/login" sx={{ "& a": { textDecoration: "none", color: "gray" } }}>
                            Login
                        </Link>
                    </MenuItem>
                )}
            </Menu>
        </div>
    );
};

export default profileButton;
