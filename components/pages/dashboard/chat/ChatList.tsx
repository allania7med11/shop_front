// src/components/pages/dashboard/chat/ChatList.tsx
import React from 'react';
import { AdminChatRoom } from '@/data/admin/adminChat';
import {
  Paper,
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  InputAdornment,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getFullName, getProfilePhoto } from '@/utils/auth';
import { timeAgoShort } from '@/utils/date';

type ChatListProps = {
  chats: AdminChatRoom[];
  selectedChatId: number | null;
  onSelectChat: (id: number) => void;
};

export const ChatList: React.FC<ChatListProps> = ({ chats, selectedChatId, onSelectChat }) => {
  return (
    <Paper
      sx={{
        width: '400px',
        height: '600px',
        display: 'flex',
        flexDirection: 'column',
      }}
      elevation={2}
    >
      <Box p={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Chats
        </Typography>
      </Box>

      <Box px={2} pb={1}>
        <TextField
          placeholder="Search"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {chats.map(chat => (
          <ListItem disablePadding key={chat.id}>
            <ListItemButton
              selected={chat.id === selectedChatId}
              onClick={() => onSelectChat(chat.id)}
            >
              <ListItemAvatar>
                <Avatar src={getProfilePhoto(chat.created_by)} />
              </ListItemAvatar>
              <ListItemText
                primary={getFullName(chat.created_by)}
                secondary={
                  chat.latest_message ? (
                    <>
                      <span
                        style={{
                          display: 'inline-block',
                          maxWidth: '80%',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          verticalAlign: 'middle',
                        }}
                      >
                        {chat.latest_message.content}
                      </span>
                      {' • '}
                      {timeAgoShort(chat.latest_message.created_at)}
                    </>
                  ) : (
                    'No messages yet'
                  )
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
