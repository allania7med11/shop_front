import { useEffect, useState, useMemo } from 'react';
import { useMessagesQuery } from '@/store/reducer/apis/chatApi';
import { MessageWrite, Message, WebSocketMessage } from '@/data/chat';
import { wsBaseUrl } from '@/utils/config';
import { useGetUserProfileQuery } from '@/store/reducer/apis/authApi';
import { IsUserProfile } from '@/data/auth';

export const useChatWebSocket = () => {
  const { data: profile = false, isFetching: isFetchingProfile } = useGetUserProfileQuery();
  const {
    data: initialMessages = [],
    isLoading,
    error,
    isSuccess,
    isFetching,
  } = useMessagesQuery();
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [typingMessage, setTypingMessage] = useState<Message | null>(null);

  // Compute final messages array including typing indicator
  const finalMessages = useMemo(() => {
    if (!typingMessage) return messages;
    return [...messages, typingMessage];
  }, [messages, typingMessage]);

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
  }, [isFetchingProfile]); // WebSocket resets when profile is being fetched

  // Effect to recreate WebSocket when messages are successfully refetched
  useEffect(() => {
    if (isFetching) {
      console.log('🔄 Messages are being refetched, WebSocket will stay disconnected.');
      return; // Do nothing, let profile fetching handle WebSocket cleanup
    }

    if (!isFetching && isSuccess) {
      console.log('✅ WebSocket connection will be created.');

      // Reset messages when messages history is refetched
      setMessages(Array.isArray(initialMessages) ? initialMessages : []);

      // Define WebSocket URL
      const wsUrl = `${wsBaseUrl}/chats/`;

      // Create WebSocket connection
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => console.log('WebSocket connected:', wsUrl);

      ws.onmessage = event => {
        try {
          const data = JSON.parse(event.data).data as WebSocketMessage;
          let message;

          switch (data.message_type) {
            case 'typing':
              if (data.payload.is_typing) {
                setTypingMessage({
                  ...data.payload.message,
                  is_mine: false,
                });
              } else {
                setTypingMessage(null);
              }
              break;

            case 'message':
              message = {
                ...data.payload.message,
                is_mine: is_mine_by_user(data.payload.message, profile),
              };
              setMessages(prev => [...prev, message]);
              break;

            default:
              console.error('Unknown message type:', data.message_type);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setTypingMessage(null);
      };

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
    }
  }, [isFetching, isSuccess, initialMessages, profile]); // ✅ Keep profile in dependencies

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
  return {
    messages: finalMessages,
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
