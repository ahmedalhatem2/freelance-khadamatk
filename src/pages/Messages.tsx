import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';
import { useChat } from '@/hooks/useChat';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import ChatList from '@/components/chat/ChatList';
import ChatHeader from '@/components/chat/ChatHeader';
import MessageList from '@/components/chat/MessageList';
import MessageInput from '@/components/chat/MessageInput';
import { Conversation } from '@/types/chat';

const Messages = () => {
  const { user } = useAuth();
  const location = useLocation();
  const {
    conversations,
    activeConversation,
    messages,
    isLoading,
    isWebSocketConnected,
    setActiveConversation,
    sendMessage,
    initConversation,
  } = useChat();

  // Get providerId, serviceTitle, and note from location state (if navigating from service request)
  const { providerId, serviceTitle, note } = location.state || {};

  useEffect(() => {
    // If we have providerId from navigation (e.g., from service request dialog),
    // initialize a conversation with that provider
    if (providerId && user) {
      const initializeConversation = async () => {
        // Find if conversation with this provider already exists
        const existingConvo = conversations.find(
          (conv) => 
            (conv.user_one_id === user.id && conv.user_two_id === providerId) || 
            (conv.user_one_id === providerId && conv.user_two_id === user.id)
        );

        if (existingConvo) {
          // If exists, set it as active
          setActiveConversation(existingConvo);
          
          // If we have a note/service title, send it as a message
          if (serviceTitle || note) {
            const message = `طلب خدمة: ${serviceTitle || ''}\n${note || ''}`.trim();
            sendMessage(existingConvo.id, message);
          }
        } else {
          // If not, initiate a new conversation
          try {
            const newConvoData = await initConversation(providerId);
            if (newConvoData && serviceTitle) {
              const message = `طلب خدمة: ${serviceTitle || ''}\n${note || ''}`.trim();
              sendMessage(newConvoData.id, message);
            }
          } catch (error) {
            console.error("Failed to init conversation:", error);
          }
        }
      };

      initializeConversation();
    }
  }, [providerId, user, conversations, setActiveConversation, sendMessage, initConversation]);

  const handleSendMessage = (content: string) => {
    if (activeConversation) {
      sendMessage(activeConversation.id, content);
    }
  };

  // Helper to get other user from conversation
  const getOtherUser = (conversation: Conversation) => {
    if (!user) return null;
    
    // If the conversation has other_user property, use it
    if (conversation.other_user) return conversation.other_user;
    
    // Otherwise determine based on IDs
    const isUserOne = conversation.user_one_id === user.id;
    const otherUserId = isUserOne ? conversation.user_two_id : conversation.user_one_id;
    
    return { id: otherUserId } as any; // Temporary solution until API provides full user details
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto mt-24 px-4 flex-grow">
        <div className="py-10 h-[calc(100vh-12rem)]">
          <div className="rounded-lg border shadow-sm overflow-hidden h-full">
            <div className="flex h-full">
              {/* Mobile chat list as a sheet */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="m-2">
                      <Menu className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[280px] sm:w-[400px] p-0">
                    <div className="h-full">
                      <ChatList
                        conversations={conversations}
                        activeConversation={activeConversation}
                        onSelectConversation={setActiveConversation}
                        isLoading={isLoading}
                        currentUser={user}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Desktop chat list */}
              <div className="hidden md:block w-[280px] lg:w-[320px] border-l">
                <ChatList
                  conversations={conversations}
                  activeConversation={activeConversation}
                  onSelectConversation={setActiveConversation}
                  isLoading={isLoading}
                  currentUser={user}
                />
              </div>

              {/* Chat content */}
              <div className="flex-1 flex flex-col">
                {activeConversation && (
                  <ChatHeader otherUser={getOtherUser(activeConversation)} />
                )}

                {!activeConversation ? (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-muted-foreground">اختر محادثة للبدء</p>
                  </div>
                ) : (
                  <>
                    <MessageList messages={messages} isLoading={isLoading} />
                    <MessageInput onSendMessage={handleSendMessage} />
                    
                    {!isWebSocketConnected && (
                      <div className="text-xs text-center p-1 bg-yellow-100 text-yellow-800">
                        أنت حاليًا في الوضع غير المتصل. ستتم مزامنة الرسائل عند استعادة الاتصال.
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Messages;
