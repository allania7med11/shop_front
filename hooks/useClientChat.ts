import { useMessagesQuery } from '@/store/reducer/apis/chatApi';
import { Message } from '@/data/chat';
import { wsBaseUrl } from '@/utils/config';
import { useGetUserProfileQuery } from '@/store/reducer/apis/authApi';
import { IsUserProfile } from '@/data/auth';
import { useChat } from './useChat';

export const useClientChat = () => {
  const { data: profile = false } = useGetUserProfileQuery();
  const {
    data: initialMessages = [],
    isLoading,
    error,
    isSuccess,
    isFetching,
  } = useMessagesQuery();

  // Use the shared WebSocket hook
  const { messages, sendMessage } = useChat({
    wsUrl: isFetching || !isSuccess ? '' : `${wsBaseUrl}/chats/`,
    initialMessages: Array.isArray(initialMessages) ? initialMessages : [],
    profile,
    isMineFunction: is_mine_by_user,
  });

  return {
    messages,
    sendMessage,
    isLoading,
    error,
  };
};

const is_mine_by_user = (message: Message, profile: false | IsUserProfile) => {
  if (!message.created_by) {
    return true;
  }
  if (!profile) {
    return false;
  }
  return message.created_by.email == profile.email;
};
