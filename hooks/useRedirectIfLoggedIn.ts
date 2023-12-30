import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useProfileQuery } from '@/store/reducer/apis/authApi';

const useRedirectIfLoggedIn = () => {
    const router = useRouter();
    let { data: profile = false, error } = useProfileQuery();
    if (error) {
        profile = false
    }
    useEffect(() => {
        if (profile) {
            router.push('/');
        }
    }, [profile, router]);
};

export default useRedirectIfLoggedIn;