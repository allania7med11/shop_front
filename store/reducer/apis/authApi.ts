import {  IsUser, LoginCredentials, RegisterCredentials } from "@/data/auth";
import { api } from ".";


const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<void, LoginCredentials>({
      query: (credentials) => ({
        url: '/auth/login/',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation<void, RegisterCredentials>({
      query: (credentials) => ({
        url: '/auth/register/',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation<void, void>({
      query: () => "/auth/logout/",
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
  useRegisterMutation,
  useLogoutMutation,
  useProfileQuery,
} = authApi;