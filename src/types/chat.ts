
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  image: string | null;
  last_seen?: string;
  status?: 'online' | 'offline';
  email?: string;
  phone?: string;
}

export interface Message {
  id: number;
  conversation_id: number;
  sender_id: number;
  massage: string; // Note: API uses "massage" instead of "message"
  is_read: number;
  created_at: string;
  updated_at: string;
  sender?: User;
}

export interface Conversation {
  id: number;
  user_one_id: number;
  user_two_id: number;
  updated_at: string;
  created_at: string;
  last_message?: Message;
  unread_count?: number;
  other_user?: User;
}

export interface SendMessagePayload {
  conversation_id: number;
  message: string;
}

export interface StartConversationPayload {
  reciver_id: number;
}

export interface ChatState {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  isWebSocketConnected: boolean;
}
