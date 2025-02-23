import { Message, MessageWrite } from '@/data/chat';
import { AdminChatRoom } from '@/data/admin/adminChat';
import { api } from '..';

const chatAdminApi = api.injectEndpoints({
  endpoints: builder => ({
    adminChats: builder.query<AdminChatRoom[], void>({
      query: () => '/admin/chats/',
      providesTags: ['AdminChats'],
    }),

    adminChatMessages: builder.query<Message[], number>({
      query: chatId => `/admin/chats/${chatId}/messages/`,
      providesTags: (result, error, chatId) => [{ type: 'AdminChatRoomDetail', id: chatId }],
    }),

    createAdminChatMessage: builder.mutation<
      Message,
      { chatId: number; data: { message: MessageWrite } }
    >({
      query: ({ chatId, data }) => ({
        url: `/admin/chats/${chatId}/messages/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { chatId }) => [{ type: 'AdminChatRoomDetail', id: chatId }],
    }),
  }),
});

export const { useAdminChatsQuery, useAdminChatMessagesQuery, useCreateAdminChatMessageMutation } =
  chatAdminApi;

export default chatAdminApi;
