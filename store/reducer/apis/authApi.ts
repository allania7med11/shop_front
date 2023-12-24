import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./utils";
import { AuthCredentials, IsUser, LoginCredentials } from "@/data/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      headers.set("X-CSRFToken", cookies.get("csrftoken"))
      return headers
    }
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