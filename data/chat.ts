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

// RTK Query cache tags the server can ask the client to refetch (subset of api tag types).
export type CacheTag = 'Cart';

// WebSocket Payload Structure
export interface WebSocketPayload {
  message: Message;
  is_typing?: boolean;
  // Set when the AI reply changed server state, so the client refetches just these caches.
  invalidates?: CacheTag[];
}

// Complete WebSocket Message Structure
export interface WebSocketMessage {
  message_type: WebSocketMessageType;
  payload: WebSocketPayload;
}

export interface MessageWrite {
  content: string;
}
