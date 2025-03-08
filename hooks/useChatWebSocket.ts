import { useEffect, useState } from 'react';
import { useMessagesQuery } from '@/store/reducer/apis/chatApi';
import { MessageWrite, Message } from '@/data/chat';
import { wsBaseUrl } from '@/utils/config';
import { useGetUserProfileQuery } from '@/store/reducer/apis/authApi';
import { IsUserProfile } from '@/data/auth';

export const useChatWebSocket = () => {
  const { data: profile = false } = useGetUserProfileQuery();
  const { data: initialMessages, isLoading, error } = useMessagesQuery();
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    const wsUrl = `${wsBaseUrl}/chats/`;

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
            is_mine: is_mine_by_user(messageData.data, profile),
          };
          setMessages(prev => [...prev, message]); // Append the new message
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
  }, []);

  const sendMessage = (message: MessageWrite) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const formattedMessage = {
        content: message.content, // Send only the "content" field (matches Django Channels)
      };
      socket.send(JSON.stringify(formattedMessage));
    } else {
      console.error('WebSocket is not open');
    }
  };

  return { messages, sendMessage, isLoading, error };
};

const is_mine_by_user = (message: Message, profile: false | IsUserProfile) => {
  if (!message.created_by || !profile) {
    return true;
  }
  return message.created_by.email == profile.email;
};
