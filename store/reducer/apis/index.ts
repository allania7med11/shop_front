import { AuthCredentials } from '@/data/auth';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`

interface RootState {
    auth: AuthCredentials;
}

// initialize an empty api service that we'll inject endpoints into later as needed
const api_init = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const accessToken = (getState() as RootState).auth.access;
            if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
})

export const api = api_init.enhanceEndpoints({ addTagTypes: ["Cart", "User"] })
