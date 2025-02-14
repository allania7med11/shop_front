import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from './useAuth';

const useRedirectIfAnonymous = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login/');
    }
  }, [isAuthenticated]);
};

export default useRedirectIfAnonymous;
