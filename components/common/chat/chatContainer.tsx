import React, { useState } from 'react';
import { ChatButton } from './chatButton';
import { ChatRoom } from './chatRoom';
import { MessageWrite } from '@/data/chat';
import { useChatWebSocket } from '@/hooks/useChatWebSocket';
import { IsUserProfile } from '@/data/auth';
import { getAdminProfile } from '@/utils/auth';

const ChatContainer = () => {
  const [open, setOpen] = useState(false);
  const { messages, sendMessage } = useChatWebSocket();
  const roomOwner: IsUserProfile = getAdminProfile();

  const handleSend = (message: MessageWrite) => {
    sendMessage(message);
  };

  return (
    <>
      {!open && <ChatButton onClick={() => setOpen(true)} />}
      {open && (
        <ChatRoom
          roomOwner={roomOwner}
          messages={messages}
          onSend={handleSend}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default ChatContainer;
