import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./utils";
import { IsUserProfile } from "@/data/auth";
import { getCsrfToken } from "@/utils/auth";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        credentials: "include",
        prepareHeaders: (headers) => {
            let token = getCsrfToken()
            if (token) {
                headers.set('X-CSRFToken', token)
            }
            return headers;
        } 
    }),
    endpoints: (builder) => ({
        getCSRF: builder.query<string, void>({
            query: () => "/auth/csrf/",
            transformResponse: response => response['X-CSRFToken'],
        }),
        getUserProfile: builder.query<IsUserProfile, void>({
            query: () => "/auth/profile/"
        }),
        logoutUser: builder.mutation<void, void>({
            query: () => ({
                url: "/auth/logout/",
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useGetCSRFQuery,
    useGetUserProfileQuery,
    useLogoutUserMutation
} = authApi;
