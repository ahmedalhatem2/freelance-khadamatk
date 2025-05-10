
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  image: string | null;
  last_seen?: string;
  status?: 'online' | 'offline';
}

export interface Message {
  id: number;
  from: number;
  to: number;
  content: string;
  created_at: string;
  read?: boolean;
}

export interface Conversation {
  id: number;
  user: User;
  last_message?: Message;
  unread_count: number;
  updated_at: string;
}

export interface SendMessagePayload {
  from: number;
  to: number;
  content: string;
}

export interface ChatState {
  conversations: Conversation[];
  activeConversation: User | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  isWebSocketConnected: boolean;
}
