import { useGetUserProfileQuery } from '@/store/reducer/apis/authApi';
import { getFullName } from '@/utils/auth';

const useAuth = () => {
    let { data: profile = false, error } = useGetUserProfileQuery();
    if (error) {
        profile = false
    }
    let isAuthenticated = !!profile
    let fullName = profile ? getFullName(profile) : null
    return { isAuthenticated, profile, fullName }
};

export default useAuth;