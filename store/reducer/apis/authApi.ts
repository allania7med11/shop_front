import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./utils";
import { AuthResponse,  IsUser,  LoginCredentials} from "@/data/auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include"
  }),
  endpoints: (builder) => ({
    createGuestItem: builder.mutation({
      query: () => ({
        url: "/create_guest/",
        method: "POST",
      }),
    }),
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: '/auth/token/',
        method: 'POST',
        body: credentials,
      }),
    }),
    profile: builder.query<IsUser, void>({
      query: () => "/auth/profile/",
    }),
  }),
});

export const {
    useCreateGuestItemMutation,
    useLoginMutation,
    useProfileQuery,
} = authApi;