import { useGetUserProfileQuery } from '@/store/reducer/apis/authApi';
import { getFullName } from '@/utils/auth';
import { useMemo } from 'react';

const useAuth = () => {
  const { data: profile = false, isSuccess, isLoading, error } = useGetUserProfileQuery();

  const isAuthenticated = useMemo(() => isSuccess && !!profile, [isSuccess, profile]);
  const isAdmin = useMemo(() => isSuccess && profile && profile.is_admin, [isSuccess, profile]);

  const fullName = useMemo(() => (profile ? getFullName(profile) : null), [profile]);
  const profile_photo = useMemo(
    () =>
      profile && profile.profile_photo
        ? profile.profile_photo
        : '/static/images/user_authenticated.png',
    [profile]
  );

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
