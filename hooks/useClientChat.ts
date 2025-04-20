import { useEffect, useState } from 'react';
import { useMessagesQuery } from '@/store/reducer/apis/chatApi';
import { Message } from '@/data/chat';
import { wsBaseUrl } from '@/utils/config';
import { useGetUserProfileQuery } from '@/store/reducer/apis/authApi';
import { IsUserProfile } from '@/data/auth';
import { useChat } from './useChat';

export const useClientChat = () => {
  const { data: profile = false, isFetching: isFetchingProfile } = useGetUserProfileQuery();
  const {
    data: initialMessages = [],
    isLoading,
    error,
    isSuccess,
    isFetching,
  } = useMessagesQuery();
  const [socket, setSocket] = useState<WebSocket | null>(null);

  // Effect to clean up WebSocket when `profile` is invalidated or refetching
  useEffect(() => {
    if (isFetchingProfile) {
      console.log('🔄 Profile is being refetched, cleaning up WebSocket.');

      // Close existing WebSocket connection
      if (socket) {
        socket.onopen = null;
        socket.onmessage = null;
        socket.onclose = null;
        socket.onerror = null;
        socket.close();
        setSocket(null);
      }

      return; // Stop further execution while profile is being fetched
    }
  }, [isFetchingProfile, socket]); // WebSocket resets when profile is being fetched

  // Use the shared WebSocket hook
  const {
    messages,
    sendMessage,
    socket: wsSocket,
  } = useChat({
    wsUrl: isFetching || !isSuccess ? '' : `${wsBaseUrl}/chats/`,
    initialMessages: Array.isArray(initialMessages) ? initialMessages : [],
    profile,
    isMineFunction: is_mine_by_user,
    onConnect: () => setSocket(wsSocket),
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
