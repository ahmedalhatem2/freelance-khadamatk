
import { API_BASE_URL } from "@/config/api";
import { Conversation, Message, SendMessagePayload } from "@/types/chat";

// Fetch user conversations
export const fetchConversations = async (token: string): Promise<Conversation[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/GetConversation`, {
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
export const startConversation = async (userId: number, token: string): Promise<Conversation> => {
  try {
    const response = await fetch(`${API_BASE_URL}/StartConversation`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId }),
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
export const fetchMessages = async (userId: number, toUserId: number, token: string): Promise<Message[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/GetMessages?user_id=${userId}&to=${toUserId}`, {
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
    console.error(`Failed to fetch messages between ${userId} and ${toUserId}:`, error);
    throw error;
  }
};

// Send a message
export const sendMessage = async (message: SendMessagePayload, token: string): Promise<Message> => {
  try {
    const response = await fetch(`${API_BASE_URL}/SendMessages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
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
