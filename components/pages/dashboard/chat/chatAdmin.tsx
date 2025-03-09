import React, { useEffect, useState } from 'react';
import { MessageWrite } from '@/data/chat';
import { useChatsQuery } from '@/store/reducer/apis/admin/chatAdminApi';
import { ChatRoom } from '@/components/common/chat/chatRoom';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { ChatList } from './ChatList';
import { useAdminChatWebSocket } from '@/hooks/useAdminChatWebSocket';
import { ArrowBack } from '@mui/icons-material';

export default function ChatAdmin() {
  const { data: chats = [], isLoading: isChatsLoading } = useChatsQuery();
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [showChatRoom, setShowChatRoom] = useState(false); // Toggle for small screens
  const isSmallScreen = useMediaQuery('(max-width: 768px)'); // Check screen size

  useEffect(() => {
    if (!selectedChatId && chats.length > 0) {
      setSelectedChatId(chats[0].id);
    }
  }, [chats, selectedChatId]);

  const {
    roomOwner,
    messages,
    sendMessage,
    isLoading: isChatDetailLoading,
  } = useAdminChatWebSocket(selectedChatId!);

  const handleSend = (message: MessageWrite) => {
    if (selectedChatId) {
      sendMessage(message);
    }
  };

  if (isChatsLoading) {
    return <Typography variant="body1">Loading chats...</Typography>;
  }
  let closeChatRoom = null;
  if (isSmallScreen) {
    closeChatRoom = () => setShowChatRoom(false);
  }
  return (
    <Box
      display="flex"
      flexDirection={isSmallScreen ? 'column' : 'row'}
      flexGrow={1}
      justifyContent="stretch"
    >
      {/* Chat List (Hidden on small screens when a chat is selected) */}
      {(!isSmallScreen || !showChatRoom) && (
        <Box flex={1} p={4} display="flex">
          <ChatList
            chats={chats}
            selectedChatId={selectedChatId}
            onSelectChat={id => {
              setSelectedChatId(id);
              if (isSmallScreen) setShowChatRoom(true); // Hide chat list on small screens
            }}
          />
        </Box>
      )}

      {/* Chat Room (Visible only when a chat is selected) */}
      {(isSmallScreen && showChatRoom) || !isSmallScreen ? (
        <Box flex={2} display="flex" p={2} maxWidth="800px">
          {selectedChatId && !isChatDetailLoading ? (
            <ChatRoom
              roomOwner={roomOwner}
              messages={messages}
              onSend={handleSend}
              sx={{
                width: '450px',
                height: '625px',
                flexGrow: 1,
                maxHeight: 'min(625px, 80vh)',
                display: 'flex',
              }}
              onClose={closeChatRoom}
              closeIcon={<ArrowBack />}
            />
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <Typography variant="h6">Select a chat to view its messages</Typography>
            </Box>
          )}
        </Box>
      ) : null}
    </Box>
  );
}
