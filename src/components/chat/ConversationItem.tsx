import React from 'react';
import { cn } from '@/lib/utils';
import { Conversation, User } from '@/types/chat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
  currentUser: User | null;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isActive,
  onClick,
  currentUser,
}) => {
  // Determine the other user in the conversation
  const getOtherUser = () => {
    if (!currentUser) return null;
    
    // If other_user is already provided
    if (conversation.other_user) {
      return conversation.other_user;
    }
    
    // Otherwise determine based on IDs
    const isUserOne = conversation.user_one_id === currentUser.id;
    const otherUserId = isUserOne ? conversation.user_two_id : conversation.user_one_id;
    
    // Return a basic user - in a real app, you'd want to fetch user details
    return { 
      id: otherUserId,
      first_name: `User`,
      last_name: `${otherUserId}`,
      image: null
    };
  };
  
  const otherUser = getOtherUser();
  const { last_message, unread_count = 0, updated_at } = conversation;
  
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (!otherUser) return null;

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center p-3 gap-3 cursor-pointer transition-colors',
        isActive ? 'bg-muted' : 'hover:bg-muted/50'
      )}
    >
      <Avatar className="h-12 w-12 flex-shrink-0">
        <AvatarImage src={otherUser.image || undefined} alt={`${otherUser.first_name} ${otherUser.last_name}`} />
        <AvatarFallback>
          {getInitials(otherUser.first_name, otherUser.last_name)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <h4 className="font-medium truncate">
            {otherUser.first_name} {otherUser.last_name}
          </h4>
          <span className="text-xs text-muted-foreground whitespace-nowrap mr-1">
            {formatDistanceToNow(new Date(updated_at), { addSuffix: true })}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground truncate">
            {last_message ? last_message.massage : 'بدء محادثة جديدة'}
          </p>
          
          {unread_count > 0 && (
            <Badge variant="secondary" className="rounded-full">
              {unread_count}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
