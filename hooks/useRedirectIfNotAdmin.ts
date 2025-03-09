import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from './useAuth';

const useRedirectIfNotAdmin = () => {
  const router = useRouter();
  const { isAdmin, isSuccess, isLoading, error } = useAuth();

  useEffect(() => {
    if (isSuccess && !isAdmin) {
      router.push('/');
    }
  }, [isAdmin]);
  return { isAdmin, isSuccess, isLoading, error };
};

export default useRedirectIfNotAdmin;
