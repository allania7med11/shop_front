import { useGetUserProfileQuery } from '@/store/reducer/apis/authApi';
import { getFullName, getProfilePhoto } from '@/utils/auth';
import { useMemo } from 'react';

const useAuth = () => {
  const { data, isSuccess, isLoading, error } = useGetUserProfileQuery();
  const profile = useMemo(() => {
    if (error) {
      return false;
    }
    if (isSuccess) {
      return data;
    }
    return false;
  }, [isSuccess, error, data]);
  const isAuthenticated = useMemo(() => isSuccess && !!profile, [profile]);
  const isAdmin = useMemo(() => isSuccess && profile && profile.is_admin, [profile]);

  const fullName = useMemo(() => (profile ? getFullName(profile) : null), [profile]);
  const profile_photo = useMemo(() => getProfilePhoto(profile), [profile]);
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
