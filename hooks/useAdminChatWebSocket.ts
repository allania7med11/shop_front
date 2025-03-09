import { useEffect, useState } from 'react';
import { MessageWrite, Message } from '@/data/chat';
import { wsBaseUrl } from '@/utils/config';
import { useChatQuery } from '@/store/reducer/apis/admin/chatAdminApi';
import { IsUserProfile } from '@/data/auth';
import { getGuestProfile } from '@/utils/auth';
import { useGetUserProfileQuery } from '@/store/reducer/apis/authApi';

export const useAdminChatWebSocket = (chatId: number) => {
  const { data: profile } = useGetUserProfileQuery();
  const {
    data: chatDetail,
    isLoading,
    error,
  } = useChatQuery(chatId, {
    skip: !chatId,
  });
  const roomOwner: IsUserProfile = chatDetail?.created_by ?? getGuestProfile();
  const initialMessages = chatDetail?.messages || [];
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    if (!chatId) return;

    const wsUrl = `${wsBaseUrl}/admin/chats/${chatId}/`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connected:', wsUrl);
    };

    ws.onmessage = event => {
      try {
        const messageData = JSON.parse(event.data);

        if (messageData.data) {
          const message: Message = {
            ...messageData.data,
            is_mine: is_mine_by_admin(messageData.data, profile),
          };
          setMessages(prev => [...prev, message]);
        } else if (messageData.error) {
          console.error('WebSocket error:', messageData.error);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.onerror = error => {
      console.error('WebSocket error:', error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [chatId]);

  const sendMessage = (message: MessageWrite) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          content: message.content, // Send only the "content" field (matches Django Channels)
        })
      );
    } else {
      console.error('WebSocket is not open');
    }
  };

  return { roomOwner, messages, sendMessage, isLoading, error };
};

const is_mine_by_admin = (message: Message, profile: IsUserProfile) => {
  if (!message.created_by) {
    return false;
  }
  return message.created_by.email == profile.email;
};
