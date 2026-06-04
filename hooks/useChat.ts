import { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import { MessageWrite, Message, WebSocketMessage, ClientContext } from '@/data/chat';
import { IsUserProfile } from '@/data/auth';
import { api } from '@/store/reducer/apis';

interface UseChatOptions {
  wsUrl: string;
  initialMessages?: Message[];
  profile?: IsUserProfile | false;
  isMineFunction: (message: Message, profile: IsUserProfile | false | undefined) => boolean;
  // Snapshot of the customer's live screen, attached to each outgoing message (client chat only).
  getClientContext?: () => ClientContext;
}

export const useChat = ({
  wsUrl,
  initialMessages = [],
  profile,
  isMineFunction,
  getClientContext,
}: UseChatOptions) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [typingMessage, setTypingMessage] = useState<Message | null>(null);

  // Compute final messages array including typing indicator
  const finalMessages = useMemo(() => {
    if (!typingMessage) return messages;
    return [...messages, typingMessage];
  }, [messages, typingMessage]);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  // WebSocket connection management
  useEffect(() => {
    if (!wsUrl) return;

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connected:', wsUrl);
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
            // The AI reply may have changed server state (e.g. added to cart); refetch
            // exactly the caches the server flagged so the UI (cart badge) stays live.
            if (data.payload.invalidates?.length) {
              dispatch(api.util.invalidateTags(data.payload.invalidates));
            }
            // The agent can also drive the screen (e.g. "show me my cart" -> /cart/).
            // Router singleton (not the hook) so this needs no extra effect dependency.
            if (data.payload.navigate) {
              Router.push(data.payload.navigate);
            }
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

    ws.onerror = error => {
      console.error('WebSocket error:', error);
    };

    setSocket(ws);

    // Return cleanup function
    return () => {
      if (ws) {
        ws.onopen = null;
        ws.onmessage = null;
        ws.onclose = null;
        ws.onerror = null;
        ws.close();
      }
    };
  }, [wsUrl, profile, isMineFunction, dispatch]);

  const sendMessage = (message: MessageWrite) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      // Attach the current page so the agent is page-aware (won't offer a page they're on).
      // Cart contents are NOT sent — the agent reads those via the view_cart tool.
      const formattedMessage = {
        content: message.content,
        client_context: { current_path: Router.asPath },
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
