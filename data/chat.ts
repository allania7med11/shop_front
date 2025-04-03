import { IsUserProfile } from './auth';

// Message Types
export type WebSocketMessageType = 'message' | 'typing';

export interface Message {
  id: number;
  content: string;
  created_at: string;
  created_by: IsUserProfile | null;
  is_mine?: boolean;
}

// WebSocket Payload Structure
export interface WebSocketPayload {
  message: Message;
  is_typing?: boolean;
}

// Complete WebSocket Message Structure
export interface WebSocketMessage {
  message_type: WebSocketMessageType;
  payload: WebSocketPayload;
}

export interface MessageWrite {
  content: string;
}
