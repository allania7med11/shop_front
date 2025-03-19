import { useGetUserProfileQuery } from '@/store/reducer/apis/authApi';
import { getFullName, getProfilePhoto } from '@/utils/auth';
import { useMemo } from 'react';

const useAuth = () => {
  const { data: profile = false, isSuccess, isLoading, error } = useGetUserProfileQuery();

  const isAuthenticated = useMemo(() => isSuccess && !!profile, [isSuccess, profile]);
  const isAdmin = useMemo(() => isSuccess && profile && profile.is_admin, [isSuccess, profile]);

  const fullName = useMemo(
    () => (profile ? getFullName(profile) : null),
    [isAuthenticated, profile]
  );
  const profile_photo = useMemo(() => getProfilePhoto(profile), [isAuthenticated, profile]);

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
