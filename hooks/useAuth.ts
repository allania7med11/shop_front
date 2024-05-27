import { useGetUserProfileQuery } from '@/store/reducer/apis/authApi';

const useAuth = () => {
    let { data: profile = false, error } = useGetUserProfileQuery();
    if (error) {
        profile = false
    }
    let isAuthenticated = !!profile
    return { isAuthenticated, profile }
};

export default useAuth;