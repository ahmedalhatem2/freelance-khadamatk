import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Search, 
  Send,
  MessageCircle,
  Users,
  CheckCheck,
  Check,
  Phone,
  MoreVertical
} from 'lucide-react';
import { useAuth } from '@/context/AuthProvider';
import { 
  fetchConversations, 
  fetchConversationMessages, 
  sendMessage, 
  markConversationAsRead,
  Conversation,
  Message
} from '@/api/conversations';
import { fetchUsers, User } from '@/api/users';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { cn } from '@/lib/utils';

const Conversations = () => {
  const { user, token } = useAuth();
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch conversations
  const { data: conversations = [], isLoading: loadingConversations } = useQuery({
    queryKey: ['conversations'],
    queryFn: () => fetchConversations(token!),
    enabled: !!token,
    refetchInterval: 5000, // Poll every 5 seconds for new conversations
  });

  // Fetch messages for selected conversation
  const { data: messages = [], isLoading: loadingMessages } = useQuery({
    queryKey: ['conversation-messages', selectedConversation?.id],
    queryFn: () => fetchConversationMessages(selectedConversation!.id, token!),
    enabled: !!selectedConversation && !!token,
    refetchInterval: 2000, // Poll every 2 seconds for new messages
  });

  // Fetch all users for conversation partners info
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(token!),
    enabled: !!token,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: (messageData: { conversation_id: number; message: string }) =>
      sendMessage(messageData, token!),
    onSuccess: () => {
      setNewMessage('');
      queryClient.invalidateQueries({ queryKey: ['conversation-messages', selectedConversation?.id] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "خطأ في إرسال الرسالة",
        description: "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.",
      });
    },
  });

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: (conversationId: number) =>
      markConversationAsRead(conversationId, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });

  // Get conversation partner
  const getConversationPartner = (conversation: Conversation): User | null => {
    const partnerId = conversation.user_one_id === user?.id 
      ? conversation.user_two_id 
      : conversation.user_one_id;
    
    return users.find(u => u.id === partnerId) || null;
  };

  // Handle conversation selection
  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    // Mark as read when opening
    markAsReadMutation.mutate(conversation.id);
  };

  // Handle send message
  const handleSendMessage = () => {
    if (!selectedConversation || !newMessage.trim()) return;
    
    sendMessageMutation.mutate({
      conversation_id: selectedConversation.id,
      message: newMessage.trim(),
    });
  };

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Filter conversations based on search
  const filteredConversations = conversations.filter(conversation => {
    const partner = getConversationPartner(conversation);
    if (!partner) return false;
    
    const fullName = `${partner.first_name} ${partner.last_name}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('ar', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    } else {
      return date.toLocaleDateString('ar', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto mt-24 px-4 flex-grow">
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-8">المحادثات</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
            {/* Conversations List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  المحادثات
                  <Badge variant="secondary" className="mr-auto">
                    {conversations.length}
                  </Badge>
                </CardTitle>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="البحث في المحادثات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="h-[500px] overflow-y-auto">
                  {loadingConversations ? (
                    <div className="space-y-3 p-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Skeleton className="w-12 h-12 rounded-full" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : filteredConversations.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>لا توجد محادثات</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {filteredConversations.map((conversation) => {
                        const partner = getConversationPartner(conversation);
                        if (!partner) return null;
                        
                        return (
                          <button
                            key={conversation.id}
                            onClick={() => handleConversationSelect(conversation)}
                            className={cn(
                              "w-full p-4 text-right hover:bg-muted/50 transition-colors border-b",
                              selectedConversation?.id === conversation.id && "bg-muted"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={partner.image} />
                                <AvatarFallback>
                                  {partner.first_name.charAt(0)}{partner.last_name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">
                                  {partner.first_name} {partner.last_name}
                                </p>
                                <p className="text-sm text-muted-foreground truncate">
                                  {partner.email}
                                </p>
                              </div>
                              
                              <div className="text-xs text-muted-foreground">
                                {formatMessageTime(conversation.updated_at)}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Messages Area */}
            <Card className="lg:col-span-2">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {(() => {
                          const partner = getConversationPartner(selectedConversation);
                          return partner ? (
                            <>
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={partner.image} />
                                <AvatarFallback>
                                  {partner.first_name.charAt(0)}{partner.last_name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              
                              <div>
                                <h3 className="font-semibold">
                                  {partner.first_name} {partner.last_name}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Phone className="w-3 h-3" />
                                  {partner.phone}
                                </div>
                              </div>
                            </>
                          ) : null;
                        })()}
                      </div>
                      
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  {/* Messages */}
                  <CardContent className="p-0">
                    <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                      {loadingMessages ? (
                        <div className="space-y-4">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className={cn(
                              "flex",
                              i % 2 === 0 ? "justify-end" : "justify-start"
                            )}>
                              <Skeleton className="h-12 w-3/4 max-w-sm rounded-lg" />
                            </div>
                          ))}
                        </div>
                      ) : messages.length === 0 ? (
                        <div className="text-center text-muted-foreground py-12">
                          <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>لا توجد رسائل بعد</p>
                          <p className="text-sm">ابدأ بإرسال رسالة</p>
                        </div>
                      ) : (
                        messages.map((message) => {
                          const isMyMessage = message.sender_id === user?.id;
                          
                          return (
                            <div
                              key={message.id}
                              className={cn(
                                "flex",
                                isMyMessage ? "justify-end" : "justify-start"
                              )}
                            >
                              <div
                                className={cn(
                                  "max-w-sm rounded-lg px-4 py-2 space-y-1",
                                  isMyMessage
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted"
                                )}
                              >
                                <p className="text-sm">{message.message}</p>
                                <div className={cn(
                                  "flex items-center gap-1 text-xs opacity-70",
                                  isMyMessage ? "justify-end" : "justify-start"
                                )}>
                                  <span>{formatMessageTime(message.created_at)}</span>
                                  {isMyMessage && (
                                    message.is_read ? (
                                      <CheckCheck className="w-3 h-3" />
                                    ) : (
                                      <Check className="w-3 h-3" />
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="border-t p-4">
                      <div className="flex gap-2">
                        <Textarea
                          placeholder="اكتب رسالتك..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          className="min-h-[60px] resize-none"
                          maxLength={1000}
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim() || sendMessageMutation.isPending}
                          size="icon"
                          className="self-end"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="h-[550px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">اختر محادثة للبدء</h3>
                    <p>اختر محادثة من القائمة لبدء المراسلة</p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Conversations;