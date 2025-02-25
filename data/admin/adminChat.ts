import { Message } from '@/data/chat';
import { IsUserProfile } from '../auth';

export interface AdminChatRoom {
  id: number;
  created_by: IsUserProfile | null;
  created_at: string;
  latest_message?: Message | null;
}

export interface AdminChatRoomDetail extends AdminChatRoom {
  messages: Message[];
}
