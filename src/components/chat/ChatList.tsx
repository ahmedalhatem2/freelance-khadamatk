
import React from 'react';
import { Conversation, User } from '@/types/chat';
import ConversationItem from './ConversationItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ChatListProps {
  conversations: Conversation[];
  activeConversation: User | null;
  onSelectConversation: (user: User) => void;
  isLoading: boolean;
}

const ChatList: React.FC<ChatListProps> = ({
  conversations,
  activeConversation,
  onSelectConversation,
  isLoading,
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredConversations = React.useMemo(() => {
    if (!searchQuery) return conversations;
    
    return conversations.filter((convo) => {
      const fullName = `${convo.user.first_name} ${convo.user.last_name}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
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
                activeConversation?.id === conversation.user.id
              }
              onClick={() => onSelectConversation(conversation.user)}
            />
          ))
        )}
      </ScrollArea>
    </div>
  );
};

export default ChatList;
