import { useEffect, useRef, useState } from 'react';
import { throttle } from 'lodash';

const useChatScroll = messages => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);
  const [farFromBottom, setFarFromBottom] = useState<number>(0);

  // Detect if user is at the bottom
  const handleScroll = () => {
    if (!chatContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const scrollBottom = scrollTop + clientHeight;
    setIsAtBottom(scrollHeight - scrollBottom <= 10); // Adding margin to account for small inconsistencies
    setFarFromBottom(scrollHeight - scrollBottom);
  };

  useEffect(() => {
    // This useEffect detects user scrolling inside the chat container
    // and updates the `isAtBottom` state accordingly.
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return; // Exit if the chat container is not available

    // Attach a throttled event listener to prevent excessive function calls
    const throttledScroll = throttle(handleScroll, 200);
    chatContainer.addEventListener('scroll', throttledScroll);

    return () => {
      chatContainer.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  // Scroll to bottom only if user is at bottom
  useEffect(() => {
    if (isAtBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAtBottom]);

  return { messagesEndRef, chatContainerRef, isAtBottom, farFromBottom };
};

export default useChatScroll;
