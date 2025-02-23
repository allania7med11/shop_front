import React from 'react';
import { ChatUserProfile, MessageWrite } from '@/data/chat';
import {
  useChatsQuery,
  useChatQuery,
  useAddChatMessageMutation,
} from '@/store/reducer/apis/admin/chatAdminApi';
import { ChatRoom } from '@/components/common/chat/chatRoom';
import { Box } from '@mui/material';

const ChatAdmin = () => {
  const { data: chats = [] } = useChatsQuery();
  const firstChatId = chats.length > 0 ? chats[0].id : undefined;
  const { data: chatDetail } = useChatQuery(firstChatId!, { skip: !firstChatId });
  const [addChatMessage] = useAddChatMessageMutation();
  const roomOwner: ChatUserProfile = chatDetail?.created_by ?? {
    first_name: 'Logipsum',
    last_name: '',
    profile_photo: '/static/LogoSmall.svg',
  };

  const handleSend = (message: MessageWrite) => {
    if (firstChatId) {
      addChatMessage({ chatId: firstChatId, data: message });
    }
  };
  const messages = chatDetail?.messages || [];

  return (
    <Box>
      <ChatRoom
        roomOwner={roomOwner}
        messages={messages}
        onSend={handleSend}
        sx={{ width: '600px', height: '650px' }}
      />
    </Box>
  );
};

export default ChatAdmin;
