import React, { useState } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter(chat =>
    getFullName(chat.created_by).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Paper
      sx={{
        width: 'min(400px, 90vw)',
        maxHeight: 'min(600px, 80vh)',
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
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
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
        {filteredChats.length > 0 ? (
          filteredChats.map(chat => (
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
          ))
        ) : (
          <Typography sx={{ p: 2, textAlign: 'center' }}>No chats found</Typography>
        )}
      </List>
    </Paper>
  );
};
