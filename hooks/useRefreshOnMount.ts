import { useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * Fixes Swiper rendering issue when navigating directly in production (NGINX).
 * Ensures a soft refresh on mount without a full page reload.
 */
const useRefreshOnMount = () => {
  const router = useRouter();

  useEffect(() => {
    // Trigger a soft page refresh on mount
    router.replace(router.asPath);
  }, []);
};

export default useRefreshOnMount;
