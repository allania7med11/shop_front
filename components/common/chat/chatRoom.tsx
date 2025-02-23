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
  SxProps,
  Theme,
} from '@mui/material';
import { Close, Send } from '@mui/icons-material';
import { Message, MessageWrite, ChatUserProfile } from '@/data/chat'; // Imported ChatUserProfile
import { grey } from '@mui/material/colors';
import useChatScroll from '@/hooks/useChatScroll';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { formatDate } from '@/utils/date';

const ChatRoom = ({
  roomOwner,
  messages,
  onSend,
  onClose,
  sx,
}: {
  roomOwner: ChatUserProfile; // Room Owner Profile
  messages: Message[];
  onSend: (msg: MessageWrite) => void;
  onClose?: () => void;
  sx?: SxProps<Theme>;
}) => {
  const [input, setInput] = useState('');
  const { messagesEndRef, chatContainerRef, farFromBottom } = useChatScroll(messages);

  const handleSend = () => {
    if (input.trim()) {
      onSend({ content: input });
      setInput('');
    }
  };

  return (
    <Paper
      sx={{
        width: 400,
        height: 600,
        maxWidth: '90vw',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 3,
        gap: 1,
        position: 'relative',
        overflow: 'auto',
        ...sx,
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
          <Avatar src={roomOwner.profile_photo || '/static/images/user_authenticated.png'} />
          <Typography variant="h6" fontWeight="bold">
            {roomOwner.first_name} {roomOwner.last_name}
          </Typography>
        </Box>

        {onClose && (
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        )}
      </Box>
      <Box
        display="flex"
        flexGrow={1}
        flexDirection="column"
        justifyContent="space-between"
        gap={2}
        sx={{ overflowY: 'auto', overflowX: 'hidden', px: 1, pt: 1 }}
        ref={chatContainerRef} // Attach ref to detect scroll changes
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
                  <Tooltip title={formatDate(msg.created_at)} arrow>
                    <span>{msg.content}</span>
                  </Tooltip>
                }
                sx={{
                  bgcolor: msg.is_mine ? 'primary.main' : grey[100],
                  color: msg.is_mine ? 'white' : grey[900],
                  p: 1,
                  wordBreak: 'break-word',
                  borderRadius: 4,
                  maxWidth: '70%',
                  cursor: 'pointer',
                }}
              />
            </ListItem>
          ))}
          {/* Dummy div for scrolling to bottom */}
          <div ref={messagesEndRef} />
        </List>
        {/* Floating Arrow Down Button - Shows only when user far from bottom */}
        {farFromBottom > 100 && (
          <IconButton
            onClick={() => {
              messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            sx={{
              position: 'absolute',
              bottom: 70,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'white',
              color: 'primary.main',
              '&:hover': { backgroundColor: 'grey.200' },
              '&:focus': { backgroundColor: 'white' },
              '&:active': { backgroundColor: 'grey.300' },
              width: 40,
              height: 40,
              borderRadius: '50%',
              boxShadow: 3,
            }}
          >
            <ArrowDownwardIcon sx={{ fontSize: 24 }} />
          </IconButton>
        )}
      </Box>
      <Box
        component="form"
        display="flex"
        p={1}
        borderTop={`1px solid ${grey[300]}`}
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Write a message..."
          multiline
          maxRows={5}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <IconButton color="primary" type="submit" disabled={!input.trim()}>
          <Send />
        </IconButton>
      </Box>
    </Paper>
  );
};

export { ChatRoom };
