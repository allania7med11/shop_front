import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./utils";
import { AuthResponse,  LoginCredentials} from "@/data/auth";

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
  }),
});

export const {
    useCreateGuestItemMutation,
    useLoginMutation
} = authApi;