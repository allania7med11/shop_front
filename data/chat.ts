import { IsUserProfile } from './auth';

export interface Message {
  id: number;
  content: string;
  created_by: IsUserProfile | null;
  created_at: string;
  is_mine: boolean;
}

export interface MessageWrite {
  content: string;
}
