import React, { useState } from 'react';
import { ChatButton } from './ChatButton';
import { ChatRoom } from './ChatRoom';
import { ChatUserProfile, MessageWrite } from '@/data/chat';
import { useCreateMessageMutation, useMessagesQuery } from '@/store/reducer/apis/chatApi';

const ChatContainer = () => {
  const [open, setOpen] = useState(false);
  const { data: messages } = useMessagesQuery();
  const [createMessage] = useCreateMessageMutation();
  const roomOwner: ChatUserProfile = {
    first_name: 'Logipsum',
    last_name: '',
    profile_photo: '/static/LogoSmall.svg',
  };

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
