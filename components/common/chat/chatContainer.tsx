import React, { useState } from 'react';
import { ChatButton } from './chatButton';
import { ChatRoom } from './chatRoom';
import { MessageWrite } from '@/data/chat';
import { useCreateMessageMutation, useMessagesQuery } from '@/store/reducer/apis/chatApi';
import { IsUserProfile } from '@/data/auth';
import { getAdminProfile } from '@/utils/auth';

const ChatContainer = () => {
  const [open, setOpen] = useState(false);
  const { data: messages } = useMessagesQuery();
  const [createMessage] = useCreateMessageMutation();
  const roomOwner: IsUserProfile = getAdminProfile();

  const handleSend = (message: MessageWrite) => {
    createMessage(message);
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
