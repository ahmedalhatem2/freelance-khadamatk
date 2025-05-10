
import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/context/AuthProvider";
import { fetchConversations, fetchMessages, sendMessage as apiSendMessage, startConversation } from "@/api/chat";
import { Conversation, Message, User, ChatState } from "@/types/chat";

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
  const initConversation = useCallback(async (userId: number) => {
    if (!token || !user) return;
    
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const data = await startConversation(userId, token);
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
  const getMessages = useCallback(async (toUserId: number) => {
    if (!token || !user) return;
    
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const data = await fetchMessages(user.id, toUserId, token);
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
  }, [token, user]);

  // Send a message
  const sendMessage = useCallback(async (toUserId: number, content: string) => {
    if (!token || !user) return;
    
    const payload = {
      from: user.id,
      to: toUserId,
      content
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
      
      return data;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to send message",
        isLoading: false
      }));
    }
  }, [token, user]);

  // Set active conversation
  const setActiveConversation = useCallback((conversationUser: User) => {
    setState(prev => ({
      ...prev,
      activeConversation: conversationUser
    }));
    
    if (user && conversationUser) {
      getMessages(conversationUser.id);
    }
  }, [user, getMessages]);

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
           (message.from === state.activeConversation.id || message.to === state.activeConversation.id)) {
          setState(prev => ({
            ...prev,
            messages: [...prev.messages, message]
          }));
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
  }, [user, state.activeConversation, getConversations]);

  // Fallback: poll for new messages if WebSocket disconnects
  const startPolling = useCallback(() => {
    if (pollingIntervalRef.current) return;
    
    const pollingInterval = setInterval(() => {
      if (state.activeConversation && user) {
        getMessages(state.activeConversation.id);
      }
      getConversations();
    }, 10000); // Poll every 10 seconds
    
    pollingIntervalRef.current = pollingInterval;
  }, [state.activeConversation, user, getMessages, getConversations]);

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
