import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./utils";

interface UserProfile {
    email: string;
    first_name: string;
    last_name: string;
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        credentials: "include"  
    }),
    endpoints: (builder) => ({
        getUserProfile: builder.query<UserProfile, void>({
            query: () => "/auth/profile"
        })
    }),
});

export const {
    useGetUserProfileQuery
} = authApi;
