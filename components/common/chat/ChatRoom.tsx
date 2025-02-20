import React, { useState } from 'react';
import {
  IconButton,
  TextField,
  Box,
  Paper,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { Close, Send } from '@mui/icons-material';
import { Message, MessageWrite, ChatUserProfile } from '@/data/chat'; // Imported ChatUserProfile
import { grey } from '@mui/material/colors';

const ChatRoom = ({
  roomOwner,
  messages,
  onSend,
  onClose,
}: {
  messages: Message[];
  onSend: (msg: MessageWrite) => void;
  onClose: () => void;
  roomOwner: ChatUserProfile; // Room Owner Profile
}) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend({ content: input });
      setInput('');
    }
  };

  return (
    <Paper
      sx={{
        width: 350,
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 3,
        gap: 1,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px="10px"
        py="10px"
        bgcolor="white"
        boxShadow={3}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar src={roomOwner.profile_photo} />
          <Typography variant="h6" fontWeight="bold">
            {roomOwner.first_name} {roomOwner.last_name}
          </Typography>
        </Box>

        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <Box
        display="flex"
        flexGrow={1}
        flexDirection="column"
        justifyContent="space-between"
        gap={2}
        sx={{ overflowY: 'auto', maxHeight: 400, px: 1, pt: 1 }}
      >
        <Box display="flex" flexGrow={1} flexDirection="column" alignItems="center">
          <Avatar src={roomOwner.profile_photo} />
          <Typography variant="h6" fontWeight="bold">
            {roomOwner.first_name} {roomOwner.last_name}
          </Typography>
        </Box>
        <List>
          {messages.map(msg => (
            <ListItem
              key={msg.id}
              sx={{ justifyContent: msg.is_mine ? 'flex-end' : 'flex-start', py: '2px' }}
            >
              {!msg.is_mine && msg.created_by && (
                <ListItemAvatar>
                  <Avatar src={msg.created_by.profile_photo || undefined} />
                </ListItemAvatar>
              )}
              <ListItemText
                primary={
                  <Tooltip title={msg.created_at} arrow>
                    <span>{msg.content}</span>
                  </Tooltip>
                }
                sx={{
                  bgcolor: msg.is_mine ? 'primary.main' : grey[100],
                  color: msg.is_mine ? 'white' : grey[900],
                  p: 1,
                  borderRadius: 2,
                  maxWidth: '75%',
                  cursor: 'pointer',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box display="flex" p={1} borderTop={`1px solid ${grey[300]}`}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Write a message..."
        />
        <IconButton color="primary" onClick={handleSend} disabled={!input.trim()}>
          <Send />
        </IconButton>
      </Box>
    </Paper>
  );
};

export { ChatRoom };
