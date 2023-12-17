import { AuthCredentials, IsUser, LoginCredentials } from "@/data/auth";
import { api } from ".";


const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createGuestItem: builder.mutation({
      query: () => ({
        url: "/create_guest/",
        method: "POST",
      }),
    }),
    login: builder.mutation<AuthCredentials, LoginCredentials>({
      query: (credentials) => ({
        url: '/auth/token/',
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
  useCreateGuestItemMutation,
  useLoginMutation,
  useProfileQuery,
} = authApi;