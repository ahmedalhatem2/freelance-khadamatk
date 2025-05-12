
import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/context/AuthProvider";
import { 
  fetchConversations, 
  fetchMessages, 
  sendMessage as apiSendMessage, 
  startConversation as apiStartConversation,
  markConversationAsRead
} from "@/api/chat";
import { Conversation, Message, ChatState, User } from "@/types/chat";

export const useChat = () => {
  const { user, token } = useAuth();
  const [state, setState] = useState<ChatState>({
    conversations: [],
    activeConversation: null,
    messages: [],
    isLoading: false,
    error: null,
    isWebSocketConnected: false
  });
  
  const wsRef = useRef<WebSocket | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get conversations
  const getConversations = useCallback(async () => {
    if (!token) return;
    
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const data = await fetchConversations(token);
      setState(prev => ({ 
        ...prev, 
        conversations: data,
        isLoading: false 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : "Failed to fetch conversations",
        isLoading: false
      }));
    }
  }, [token]);

  // Start a new conversation
  const initConversation = useCallback(async (receiverId: number) => {
    if (!token || !user) return;
    
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const data = await apiStartConversation({ reciver_id: receiverId }, token);
      
      setState(prev => ({
        ...prev,
        conversations: [data, ...prev.conversations],
        isLoading: false
      }));
      
      return data;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to start conversation",
        isLoading: false
      }));
    }
  }, [token, user]);

  // Get messages for a conversation
  const getMessages = useCallback(async (conversationId: number) => {
    if (!token) return;
    
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const data = await fetchMessages(conversationId, token);
      
      // Mark messages as read
      if (data.length > 0) {
        markConversationAsRead(conversationId, token);
      }
      
      setState(prev => ({
        ...prev,
        messages: data,
        isLoading: false
      }));
      
      return data;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to fetch messages",
        isLoading: false
      }));
    }
  }, [token]);

  // Send a message
  const sendMessage = useCallback(async (conversationId: number, content: string) => {
    if (!token || !user) return;
    
    const payload = {
      conversation_id: conversationId,
      message: content
    };
    
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const data = await apiSendMessage(payload, token);
      
      // Add the message to the current messages
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, data],
        isLoading: false
      }));
      
      // Update conversations list to reflect new message
      getConversations();
      
      return data;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to send message",
        isLoading: false
      }));
    }
  }, [token, user, getConversations]);

  // Set active conversation
  const setActiveConversation = useCallback((conversation: Conversation) => {
    setState(prev => ({
      ...prev,
      activeConversation: conversation
    }));
    
    // Fetch messages for this conversation
    getMessages(conversation.id);
    
    // Mark conversation as read
    if (token) {
      markConversationAsRead(conversation.id, token)
        .then(() => {
          // Update unread count in conversations list
          getConversations();
        })
        .catch(error => console.error("Error marking conversation as read:", error));
    }
  }, [getMessages, token, getConversations]);

  // Connect WebSocket
  const connectWebSocket = useCallback(() => {
    if (!user) return;
    
    const ws = new WebSocket(`ws://localhost:8000/ws`);
    
    ws.onopen = () => {
      console.log('WebSocket connected');
      setState(prev => ({ ...prev, isWebSocketConnected: true }));
      
      // Stop polling if WebSocket is connected
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };
    
    ws.onmessage = (event) => {
      try {
        const message: Message = JSON.parse(event.data);
        
        // If the message is for the active conversation, add it to the messages
        if (state.activeConversation && 
           (message.conversation_id === state.activeConversation.id)) {
          setState(prev => ({
            ...prev,
            messages: [...prev.messages, message]
          }));
          
          // Mark the message as read since we're currently viewing this conversation
          if (token) {
            markConversationAsRead(message.conversation_id, token);
          }
        }
        
        // Update the conversation list to show the new message
        getConversations();
      } catch (error) {
        console.error('Error handling WebSocket message:', error);
      }
    };
    
    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setState(prev => ({ ...prev, isWebSocketConnected: false }));
      
      // Start polling for messages as a fallback
      startPolling();
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setState(prev => ({ ...prev, isWebSocketConnected: false }));
      
      // Start polling for messages as a fallback
      startPolling();
    };
    
    wsRef.current = ws;
  }, [user, state.activeConversation, getConversations, token]);

  // Fallback: poll for new messages if WebSocket disconnects
  const startPolling = useCallback(() => {
    if (pollingIntervalRef.current) return;
    
    const pollingInterval = setInterval(() => {
      if (state.activeConversation) {
        getMessages(state.activeConversation.id);
      }
      getConversations();
    }, 10000); // Poll every 10 seconds
    
    pollingIntervalRef.current = pollingInterval;
  }, [state.activeConversation, getMessages, getConversations]);

  // Initialize
  useEffect(() => {
    if (token) {
      getConversations();
      connectWebSocket();
    }
    
    return () => {
      // Clean up WebSocket on unmount
      if (wsRef.current) {
        wsRef.current.close();
      }
      
      // Clear polling interval
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [token, connectWebSocket, getConversations]);

  return {
    ...state,
    getConversations,
    initConversation,
    getMessages,
    sendMessage,
    setActiveConversation,
  };
};
