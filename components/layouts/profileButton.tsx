import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useProfileQuery } from "@/store/reducer/apis/authApi";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import { Link } from "@/components/common/Link";

const profileButton = () => {
    const { data: profile = false } = useProfileQuery();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                {profile && (
                    <Link href="/auth/login" sx={{ "& a": { textDecoration: "none", color: "gray" } }}>
                        <MenuItem>Logout</MenuItem>
                    </Link>
                )}
                {!profile && (
                    <Link href="/auth/login" sx={{ "& a": { textDecoration: "none", color: "gray" } }}>
                        <MenuItem>Login</MenuItem>
                    </Link>
                )}
            </Menu>
        </div>
    );
};

export default profileButton;
