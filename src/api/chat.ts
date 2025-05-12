
import { API_BASE_URL } from "@/config/api";
import { Conversation, Message, SendMessagePayload, StartConversationPayload } from "@/types/chat";

// Fetch user conversations
export const fetchConversations = async (token: string): Promise<Conversation[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/conversations`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching conversations: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch conversations:", error);
    throw error;
  }
};

// Start a new conversation
export const startConversation = async (payload: StartConversationPayload, token: string): Promise<Conversation> => {
  try {
    const response = await fetch(`${API_BASE_URL}/conversation/start`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw new Error(`Error starting conversation: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to start conversation:", error);
    throw error;
  }
};

// Fetch messages for a conversation
export const fetchMessages = async (conversationId: number, token: string): Promise<Message[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/conversation/messages/${conversationId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching messages: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch messages for conversation ${conversationId}:`, error);
    throw error;
  }
};

// Send a message
export const sendMessage = async (payload: SendMessagePayload, token: string): Promise<Message> => {
  try {
    const response = await fetch(`${API_BASE_URL}/messages/send`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw new Error(`Error sending message: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to send message:", error);
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
      throw new Error(`Error marking conversation as read: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to mark conversation as read:", error);
    throw error;
  }
};
