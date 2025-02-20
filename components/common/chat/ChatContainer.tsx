import React, { useState } from 'react';
import { ChatButton } from './ChatButton';
import { ChatRoom } from './ChatRoom';
import { ChatUserProfile, Message, MessageWrite } from '@/data/chat';

const ChatContainer = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const roomOwner: ChatUserProfile = {
    first_name: 'Logipsum',
    last_name: '',
    profile_photo: '/static/LogoSmall.svg',
  };

  const handleSend = (message: MessageWrite) => {
    const newMessage: Message = {
      id: messages.length + 1,
      content: message.content,
      created_by: null,
      created_at: new Date().toLocaleTimeString(),
      is_mine: true,
    };
    setMessages([...messages, newMessage]);
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
