import React, { useState } from 'react';
import { ChatButton } from './ChatButton';
import { ChatRoom } from './ChatRoom';
import { ChatUserProfile, Message, MessageWrite } from '@/data/chat';

// Static initial messages
const initialMessages: Message[] = [
  {
    id: 1,
    content: 'Hello! How are you?',
    created_by: { first_name: 'Alice', last_name: 'Doe', profile_photo: null },
    created_at: '2024-02-20T10:00:00Z',
    is_mine: false,
  },
  {
    id: 2,
    content: "I'm good, thanks! What about you?",
    created_by: null, // If the sender is the current user
    created_at: '2024-02-20T10:01:00Z',
    is_mine: true,
  },
  {
    id: 3,
    content: 'Just working on some projects.',
    created_by: { first_name: 'Alice', last_name: 'Doe', profile_photo: null },
    created_at: '2024-02-20T10:02:00Z',
    is_mine: false,
  },
  {
    id: 4,
    content: 'Sounds great! Need any help?',
    created_by: null,
    created_at: '2024-02-20T10:03:00Z',
    is_mine: true,
  },
  {
    id: 5,
    content: "Maybe! I'll let you know soon.",
    created_by: { first_name: 'Alice', last_name: 'Doe', profile_photo: null },
    created_at: '2024-02-20T10:04:00Z',
    is_mine: false,
  },
  {
    id: 6,
    content: 'Looking forward to it!',
    created_by: null,
    created_at: '2024-02-20T10:05:00Z',
    is_mine: true,
  },
  {
    id: 7,
    content: 'By the way, have you seen the latest update?',
    created_by: { first_name: 'Alice', last_name: 'Doe', profile_photo: null },
    created_at: '2024-02-20T10:06:00Z',
    is_mine: false,
  },
  {
    id: 8,
    content: 'Not yet! Let me check.',
    created_by: null,
    created_at: '2024-02-20T10:07:00Z',
    is_mine: true,
  },
  {
    id: 9,
    content: "It's pretty cool! They added new features.",
    created_by: { first_name: 'Alice', last_name: 'Doe', profile_photo: null },
    created_at: '2024-02-20T10:08:00Z',
    is_mine: false,
  },
  {
    id: 10,
    content: "Awesome! Can't wait to try it.",
    created_by: null,
    created_at: '2024-02-20T10:09:00Z',
    is_mine: true,
  },
];

const ChatContainer = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
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
