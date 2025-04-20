import { useEffect, useState, useMemo } from 'react';
import { MessageWrite, Message, WebSocketMessage } from '@/data/chat';
import { IsUserProfile } from '@/data/auth';

interface UseChatOptions {
  wsUrl: string;
  initialMessages?: Message[];
  profile?: IsUserProfile | false;
  isMineFunction: (message: Message, profile: IsUserProfile | false | undefined) => boolean;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export const useChat = ({
  wsUrl,
  initialMessages = [],
  profile,
  isMineFunction,
  onConnect,
  onDisconnect,
}: UseChatOptions) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [typingMessage, setTypingMessage] = useState<Message | null>(null);

  // Compute final messages array including typing indicator
  const finalMessages = useMemo(() => {
    if (!typingMessage) return messages;
    return [...messages, typingMessage];
  }, [messages, typingMessage]);

  // Update messages when initialMessages change
  useEffect(() => {
    if (initialMessages.length > 0) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  // WebSocket connection management
  useEffect(() => {
    if (!wsUrl) return;

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connected:', wsUrl);
      if (onConnect) onConnect();
    };

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
              is_mine: isMineFunction(data.payload.message, profile),
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
      if (onDisconnect) onDisconnect();
    };

    ws.onerror = error => {
      console.error('WebSocket error:', error);
    };

    setSocket(ws);

    return () => {
      if (ws) {
        ws.onopen = null;
        ws.onmessage = null;
        ws.onclose = null;
        ws.onerror = null;
        ws.close();
      }
    };
  }, [wsUrl, profile, isMineFunction, onConnect, onDisconnect]);

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
    socket,
  };
};
