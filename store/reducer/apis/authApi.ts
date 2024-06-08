import {   ConfirmResetPasswordCredentials, IsUserProfile, LoginCredentials, RegisterCredentials } from "@/data/auth";
import { api } from ".";


const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<void, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Cart", "User"],
    }),
    register: builder.mutation<void, RegisterCredentials>({
      query: (credentials) => ({
        url: "/auth/register/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Cart", "User"],
    }),
    getUserProfile: builder.query<IsUserProfile, void>({
        query: () => "/auth/profile/",
        providesTags: ["User"],
    }),
    logoutUser: builder.mutation<void, void>({
        query: () => ({
            url: "/auth/logout/",
            method: "POST",
        }),
        invalidatesTags: ["Cart", "User"],
    }),
    resetPassword: builder.mutation<void, { email: string }>({
      query: (data) => ({
        url: "/auth/password/reset/",
        method: "POST",
        body: data,
      }),
    }),
    confirmResetPassword: builder.mutation<void, ConfirmResetPasswordCredentials>({
      query: (credentials) => ({
        url: `/auth/password/reset/confirm/${credentials.uid}/${credentials.token}/`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserProfileQuery,
  useLogoutUserMutation,
  useResetPasswordMutation,
  useConfirmResetPasswordMutation
} = authApi;