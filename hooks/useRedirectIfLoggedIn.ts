import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from './useAuth';

const useRedirectIfLoggedIn = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated]);
};

export default useRedirectIfLoggedIn;
