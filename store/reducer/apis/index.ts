import { AuthCredentials } from '@/data/auth';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setTokens } from '../slices/auth';
export const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`

interface RootState {
    auth: AuthCredentials;
}


const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as RootState).auth.access;
        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }
        return headers;
    },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        // try to get a new token
        const refreshResult = await baseQuery('auth/token/refresh/', api, extraOptions)
        if (refreshResult.data) {
            // store the new token
            api.dispatch(setTokens(refreshResult.data))
            // retry the initial query
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(loggedOut())
        }
    }
    return result
}

// initialize an empty api service that we'll inject endpoints into later as needed
const api_init = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
})

export const api = api_init.enhanceEndpoints({
    addTagTypes: ["Cart", "User"],
});
