import { Message, MessageWrite } from '@/data/chat';
import { AdminChatRoom, AdminChatRoomDetail } from '@/data/admin/adminChat';
import { api } from '..';

const chatAdminApi = api.injectEndpoints({
  endpoints: builder => ({
    chats: builder.query<AdminChatRoom[], void>({
      query: () => '/admin/chats/',
      providesTags: ['AdminChats'],
    }),

    chat: builder.query<AdminChatRoomDetail, number>({
      query: chatId => `/admin/chats/${chatId}/`,
      providesTags: (result, error, chatId) => [{ type: 'AdminChatRoomDetail', id: chatId }],
    }),

    addChatMessage: builder.mutation<Message, { chatId: number; data: MessageWrite }>({
      query: ({ chatId, data }) => ({
        url: `/admin/chats/${chatId}/add_message/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { chatId }) => [{ type: 'AdminChatRoomDetail', id: chatId }],
    }),
  }),
});

export const { useChatsQuery, useChatQuery, useAddChatMessageMutation } = chatAdminApi;
export default chatAdminApi;
