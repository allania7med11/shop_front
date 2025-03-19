import { useEffect, useState } from 'react';
import { useMessagesQuery } from '@/store/reducer/apis/chatApi';
import { MessageWrite, Message } from '@/data/chat';
import { wsBaseUrl } from '@/utils/config';
import { useGetUserProfileQuery } from '@/store/reducer/apis/authApi';
import { IsUserProfile } from '@/data/auth';

export const useChatWebSocket = () => {
  const { data: profile = false } = useGetUserProfileQuery();
  const { data: initialMessages = [], isLoading, error, isSuccess } = useMessagesQuery();
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    if (socket) {
      console.log('Cleaning up WebSocket');
      socket.onopen = null;
      socket.onmessage = null;
      socket.onclose = null;
      socket.onerror = null;
      socket.close();
      setSocket(null); // Ensure state updates and removes reference
    }
    const wsUrl = `${wsBaseUrl}/chats/`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => console.log('WebSocket connected:', wsUrl);

    ws.onmessage = event => {
      try {
        const messageData = JSON.parse(event.data);
        if (messageData.data) {
          setMessages(prev => [
            ...prev,
            {
              ...messageData.data,
              is_mine: is_mine_by_user(messageData.data, profile), // `profile` is used here
            },
          ]);
        } else if (messageData.error) {
          console.error('WebSocket error:', messageData.error);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onclose = () => console.log('WebSocket disconnected');

    ws.onerror = error => console.error('WebSocket error:', error);

    setSocket(ws);

    return () => {
      console.log('Cleaning up WebSocket before reinitialization');

      if (ws) {
        ws.onopen = null;
        ws.onmessage = null;
        ws.onclose = null;
        ws.onerror = null;
        ws.close();
      }
    };
  }, [isSuccess, profile]);

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
  if (!message.created_by) {
    return true;
  }
  if (!profile) {
    return false;
  }
  return message.created_by.email == profile.email;
};
