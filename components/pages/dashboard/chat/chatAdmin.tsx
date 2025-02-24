import React, { useEffect, useState } from 'react';
import { ChatUserProfile, MessageWrite } from '@/data/chat';
import {
  useChatsQuery,
  useChatQuery,
  useAddChatMessageMutation,
} from '@/store/reducer/apis/admin/chatAdminApi';
import { ChatRoom } from '@/components/common/chat/chatRoom';
import { Box, Typography } from '@mui/material';
import { ChatList } from './ChatList';

export default function ChatAdmin() {
  const { data: chats = [], isLoading: isChatsLoading } = useChatsQuery();
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  useEffect(() => {
    if (!selectedChatId && chats.length > 0) {
      setSelectedChatId(chats[0].id);
    }
  }, [chats, selectedChatId]);
  const { data: chatDetail, isLoading: isChatDetailLoading } = useChatQuery(selectedChatId!, {
    skip: !selectedChatId,
  });
  const [addChatMessage] = useAddChatMessageMutation();
  const handleSend = (message: MessageWrite) => {
    if (selectedChatId) {
      addChatMessage({ chatId: selectedChatId, data: message });
    }
  };
  const roomOwner: ChatUserProfile = chatDetail?.created_by ?? {
    first_name: 'Anonymous',
    last_name: '',
    profile_photo: '/static/images/anonymous.png',
  };
  const messages = chatDetail?.messages || [];
  if (isChatsLoading) {
    return <Typography variant="body1">Loading chats...</Typography>;
  }
  return (
    <Box display="flex" alignItems="center">
      <ChatList
        chats={chats}
        selectedChatId={selectedChatId}
        onSelectChat={id => setSelectedChatId(id)}
      />
      <Box flex={1} display="flex" flexDirection="column">
        <Box sx={{ height: '100%', p: 2 }}>
          {selectedChatId && !isChatDetailLoading ? (
            <ChatRoom
              roomOwner={roomOwner}
              messages={messages}
              onSend={handleSend}
              sx={{ width: '600px', height: '650px' }}
            />
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <Typography variant="h6">Select a chat to view its messages</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
