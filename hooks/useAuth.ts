import { useGetUserProfileQuery } from '@/store/reducer/apis/authApi';
import { getFullName } from '@/utils/auth';

const useAuth = () => {
  let { data: profile = false } = useGetUserProfileQuery();
  const { error } = useGetUserProfileQuery();
  if (error) {
    profile = false;
  }

  const isAuthenticated = !!profile;
  const fullName = profile ? getFullName(profile) : null;

  return { isAuthenticated, profile, fullName };
};

export default useAuth;
