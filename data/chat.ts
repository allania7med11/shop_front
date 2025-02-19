export interface ChatUserProfile {
  first_name: string;
  last_name: string;
  profile_photo: string | null;
}

export interface Message {
  id: number;
  content: string;
  created_by: ChatUserProfile | null;
  created_at: string;
  is_mine: boolean;
}

export interface MessageWrite {
  content: string;
}
