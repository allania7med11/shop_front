import { useMemo } from 'react';
import { Message } from '@/data/chat';
import { wsBaseUrl } from '@/utils/config';
import { useChatQuery } from '@/store/reducer/apis/admin/chatAdminApi';
import { IsUserProfile } from '@/data/auth';
import { getGuestProfile } from '@/utils/auth';
import { useGetUserProfileQuery } from '@/store/reducer/apis/authApi';
import { useChat } from './useChat';

export const useAdminChat = (chatId: number) => {
  const { data: profile } = useGetUserProfileQuery();
  const {
    data: chatDetail,
    isLoading,
    error,
  } = useChatQuery(chatId, {
    skip: !chatId,
  });
  const roomOwner: IsUserProfile = chatDetail?.created_by ?? getGuestProfile();
  const initialMessages = useMemo(() => chatDetail?.messages ?? [], [chatDetail?.messages]);

  // Use the shared WebSocket hook
  const { messages, sendMessage } = useChat({
    wsUrl: chatId ? `${wsBaseUrl}/admin/chats/${chatId}/` : '',
    initialMessages,
    profile,
    isMineFunction: is_mine_by_admin,
  });

  return { roomOwner, messages, sendMessage, isLoading, error };
};

const is_mine_by_admin = (message: Message, profile: IsUserProfile | undefined) => {
  if (!message.created_by) {
    return false;
  }
  if (!profile) {
    return false;
  }
  return message.created_by.email == profile.email;
};
