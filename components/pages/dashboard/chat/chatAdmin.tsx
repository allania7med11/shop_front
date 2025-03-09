import React, { useEffect, useState } from 'react';
import { MessageWrite } from '@/data/chat';
import { useChatsQuery } from '@/store/reducer/apis/admin/chatAdminApi';
import { ChatRoom } from '@/components/common/chat/chatRoom';
import { Box, Typography } from '@mui/material';
import { ChatList } from './ChatList';
import { useAdminChatWebSocket } from '@/hooks/useAdminChatWebSocket';

export default function ChatAdmin() {
  const { data: chats = [], isLoading: isChatsLoading } = useChatsQuery();
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  useEffect(() => {
    if (!selectedChatId && chats.length > 0) {
      setSelectedChatId(chats[0].id);
    }
  }, [chats, selectedChatId]);

  // Use the custom WebSocket hook for admin chat if a chat is selected.
  const {
    roomOwner,
    messages,
    sendMessage,
    isLoading: isChatDetailLoading,
  } = useAdminChatWebSocket(selectedChatId!);

  // Use the WebSocket send function to send a message.
  const handleSend = (message: MessageWrite) => {
    if (selectedChatId) {
      sendMessage(message);
    }
  };

  if (isChatsLoading) {
    return <Typography variant="body1">Loading chats...</Typography>;
  }

  return (
    <Box display="flex" alignItems="center" flexWrap="wrap">
      <Box
        p={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        flexGrow={1}
        flexShrink={1}
      >
        <ChatList
          chats={chats}
          selectedChatId={selectedChatId}
          onSelectChat={id => setSelectedChatId(id)}
        />
      </Box>
      <Box flex={1} display="flex" flexDirection="column" alignItems="center" flexGrow={1}>
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
