import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./utils";
import { AuthCredentials, IsUser, LoginCredentials } from "@/data/auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include"
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<AuthCredentials, LoginCredentials>({
        query: (credentials) => ({
          url: '/auth/login/',
          method: 'POST',
          body: credentials,
        }),
        invalidatesTags: ["User"],
    }),
    profile: builder.query<IsUser, void>({
        query: () => "/auth/profile/",
        providesTags: ["User"],
    }),
  }),
});

export const {
    useLoginMutation,
    useProfileQuery,
  } = authApi;