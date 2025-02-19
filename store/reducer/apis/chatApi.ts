import { api } from '.';
import { Message, MessageWrite } from '@/data/chat';

const chatApi = api.injectEndpoints({
  endpoints: builder => ({
    messages: builder.query<Message[], void>({
      query: () => '/chats/messages/',
      providesTags: ['Messages'],
    }),
    createMessage: builder.mutation<Message, MessageWrite>({
      query: newMessage => ({
        url: '/chats/messages/',
        method: 'POST',
        body: newMessage,
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
});

export const { useMessagesQuery, useCreateMessageMutation } = chatApi;
