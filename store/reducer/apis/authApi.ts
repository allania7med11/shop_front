import {
  ConfirmResetPasswordCredentials,
  IsUserProfile,
  LoginCredentials,
  RegisterCredentials,
} from '@/data/auth';
import { api } from '.';

const authApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<void, LoginCredentials>({
      query: credentials => ({
        url: '/auth/login/',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Cart', 'User', 'Messages', 'AdminChats', 'AdminChatRoomDetail'],
    }),
    register: builder.mutation<void, RegisterCredentials>({
      query: credentials => ({
        url: '/auth/register/',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Cart', 'User', 'Messages', 'AdminChats', 'AdminChatRoomDetail'],
    }),
    getUserProfile: builder.query<IsUserProfile, void>({
      query: () => '/auth/profile/',
      providesTags: ['User'],
    }),
    updateUserProfile: builder.mutation<void, Partial<IsUserProfile>>({
      query: profileData => {
        const formData = new FormData();
        Object.entries(profileData).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, value);
          }
        });
        return {
          url: '/auth/profile/',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['User'],
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout/',
        method: 'POST',
      }),
      invalidatesTags: ['Cart', 'User', 'Messages', 'AdminChats', 'AdminChatRoomDetail'],
    }),
    resetPassword: builder.mutation<void, { email: string }>({
      query: data => ({
        url: '/auth/password/reset/',
        method: 'POST',
        body: data,
      }),
    }),
    confirmResetPassword: builder.mutation<void, ConfirmResetPasswordCredentials>({
      query: credentials => ({
        url: `/auth/password/reset/confirm/${credentials.uid}/${credentials.token}/`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useLogoutUserMutation,
  useResetPasswordMutation,
  useConfirmResetPasswordMutation,
} = authApi;
