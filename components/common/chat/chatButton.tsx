import React from 'react';
import { Fab } from '@mui/material';
import { Chat as ChatIcon } from '@mui/icons-material';

const ChatButton = ({ onClick }: { onClick: () => void }) => (
  <Fab
    color="primary"
    aria-label="chat"
    onClick={onClick}
    sx={{ position: 'fixed', bottom: 16, right: 16 }}
  >
    <ChatIcon />
  </Fab>
);

export { ChatButton };
