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
  const profile_photo = profile && profile.profile_photo ? profile.profile_photo : "/static/images/user_authenticated.png";

  return { isAuthenticated, profile, fullName, profile_photo };
};

export default useAuth;
