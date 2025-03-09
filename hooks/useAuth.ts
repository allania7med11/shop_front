import { useGetUserProfileQuery } from '@/store/reducer/apis/authApi';
import { getFullName } from '@/utils/auth';

const useAuth = () => {
  const { data: profile = false, isSuccess, isLoading, error } = useGetUserProfileQuery();
  const isAuthenticated = !!profile;
  const isAdmin = profile && profile.is_admin;
  const fullName = profile ? getFullName(profile) : null;
  const profile_photo =
    profile && profile.profile_photo
      ? profile.profile_photo
      : '/static/images/user_authenticated.png';

  return {
    isSuccess,
    isLoading,
    error,
    isAuthenticated,
    isAdmin,
    profile,
    fullName,
    profile_photo,
  };
};

export default useAuth;
