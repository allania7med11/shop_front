import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Link } from "@/components/common/Link";
import { useProfileQuery } from "@/store/reducer/apis/authApi";
import { Box, IconButton, Typography } from "@mui/material";

const profileButton = () => {
    const { data: profile = false } = useProfileQuery();
    return (
    <Link href="/auth/login" sx={{ "& a": { textDecoration: "none" } }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography color="gray">
            {profile ? `Welcome ${profile.first_name} ${profile.last_name}` : `Welcome, log in`}
        </Typography>
        <IconButton>
            <PermIdentityIcon />
        </IconButton>
        </Box>
  </Link>)
}

export default profileButton