import { ChatUserProfile, Message } from '@/data/chat';

export interface AdminChatRoom {
  id: number;
  created_by: ChatUserProfile | null;
  created_at: string;
  latest_message?: Message | null;
}

export interface AdminChatRoomDetail extends AdminChatRoom {
  messages: Message[];
}
