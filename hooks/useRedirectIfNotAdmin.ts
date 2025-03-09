import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from './useAuth';

const useRedirectIfNotAdmin = () => {
  const router = useRouter();
  const { isAdmin, isLoading, error } = useAuth();
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push('/');
    }
  }, [isAdmin, isLoading]);
  return { isAdmin, isLoading, error };
};

export default useRedirectIfNotAdmin;
