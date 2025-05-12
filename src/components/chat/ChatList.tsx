import React from 'react';
import { Conversation, User } from '@/types/chat';
import ConversationItem from './ConversationItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ChatListProps {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
  isLoading: boolean;
  currentUser: User | null;
}

const ChatList: React.FC<ChatListProps> = ({
  conversations,
  activeConversation,
  onSelectConversation,
  isLoading,
  currentUser,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredConversations = React.useMemo(() => {
    if (!searchQuery) return conversations;
    
    return conversations.filter((convo) => {
      // If other_user exists, use it for search
      if (convo.other_user) {
        const fullName = `${convo.other_user.first_name} ${convo.other_user.last_name}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
      }
      
      // Otherwise just include the conversation
      return true;
    });
  }, [conversations, searchQuery]);

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="بحث عن محادثات..."
            className="pl-9 bg-muted/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <p className="text-muted-foreground">جاري تحميل المحادثات...</p>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex justify-center items-center h-24">
            <p className="text-muted-foreground">لا توجد محادثات</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={
                activeConversation?.id === conversation.id
              }
              onClick={() => onSelectConversation(conversation)}
              currentUser={currentUser}
            />
          ))
        )}
      </ScrollArea>
    </div>
  );
};

export default ChatList;
