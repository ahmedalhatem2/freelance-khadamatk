import { API_BASE_URL } from "@/config/api";

export interface Conversation {
  id: number;
  user_one_id: number;
  user_two_id: number;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: number;
  conversation_id: number;
  sender_id: number;
  message: string;
  is_read: number;
  created_at: string;
  updated_at: string;
  sender?: {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    status: string;
    role_id: number;
    region_id: number;
    city: string;
    street: string;
    image: string | null;
    address: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
  };
}

export interface StartConversationData {
  reciver_id: number;
}

export interface SendMessageData {
  conversation_id: string | number;
  message: string;
}

// Start a new conversation
export const startConversation = async (data: StartConversationData, token: string): Promise<Conversation> => {
  try {
    const response = await fetch(`${API_BASE_URL}/conversation/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error starting conversation: ${response.status}`);
    }

    const conversationData = await response.json();
    return conversationData;
  } catch (error) {
    console.error("Failed to start conversation:", error);
    throw error;
  }
};

// Send a message
export const sendMessage = async (data: SendMessageData, token: string): Promise<Message> => {
  try {
    const response = await fetch(`${API_BASE_URL}/messages/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error sending message: ${response.status}`);
    }

    const messageData = await response.json();
    return messageData;
  } catch (error) {
    console.error("Failed to send message:", error);
    throw error;
  }
};

// Get all conversations for the authenticated user
export const fetchConversations = async (token: string): Promise<Conversation[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/conversations`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error fetching conversations: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch conversations:", error);
    throw error;
  }
};

// Get messages for a specific conversation
export const fetchConversationMessages = async (conversationId: number, token: string): Promise<Message[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/conversation/messages/${conversationId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error fetching conversation messages: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch conversation messages:", error);
    throw error;
  }
};

// Mark conversation as read
export const markConversationAsRead = async (conversationId: number, token: string): Promise<{ updated: number }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/conversation/read/${conversationId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error marking conversation as read: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to mark conversation as read:", error);
    throw error;
  }
};