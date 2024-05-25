import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./utils";
import { IsUserProfile } from "@/data/auth";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        credentials: "include"  
    }),
    endpoints: (builder) => ({
        getUserProfile: builder.query<IsUserProfile, void>({
            query: () => "/auth/profile"
        })
    }),
});

export const {
    useGetUserProfileQuery
} = authApi;
