import React from 'react';
import { ChatUserProfile, MessageWrite } from '@/data/chat';
import { useCreateMessageMutation, useMessagesQuery } from '@/store/reducer/apis/chatApi';
import { ChatRoom } from '@/components/common/chat/chatRoom';
import { Box } from '@mui/material';

const ChatAdmin = () => {
  const { data: messages = [] } = useMessagesQuery();
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
    <Box>
      <ChatRoom
        roomOwner={roomOwner}
        messages={messages}
        onSend={handleSend}
        sx={{
          width: '600px',
          height: '650px',
        }}
      />
    </Box>
  );
};

export default ChatAdmin;
