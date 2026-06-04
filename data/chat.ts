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
  // A path the agent wants the client to open (e.g. "/cart/"), so chat can drive the screen.
  navigate?: string;
}

// Complete WebSocket Message Structure
export interface WebSocketMessage {
  message_type: WebSocketMessageType;
  payload: WebSocketPayload;
}

export interface MessageWrite {
  content: string;
}

// The customer's current page, sent with each message so the agent is page-aware
// (e.g. won't offer to open a page they're already on). Cart contents stay in view_cart.
export interface ClientContext {
  current_path: string;
}
