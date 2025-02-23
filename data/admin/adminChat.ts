import { Message, MessageWrite } from '@/data/chat';

export interface AdminChatRoom {
  id: number;
  latest_message?: Message;
}

export interface AdminChatRoomDetail extends AdminChatRoom {
  messages: Message[];
}

export interface AdminChatRoomWrite {
  message: MessageWrite;
}
