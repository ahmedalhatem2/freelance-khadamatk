
import React from 'react';
import { cn } from '@/lib/utils';
import { Conversation } from '@/types/chat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isActive,
  onClick,
}) => {
  const { user, last_message, unread_count, updated_at } = conversation;
  
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center p-3 gap-3 cursor-pointer transition-colors',
        isActive ? 'bg-muted' : 'hover:bg-muted/50'
      )}
    >
      <Avatar className="h-12 w-12 flex-shrink-0">
        <AvatarImage src={user.image || undefined} alt={`${user.first_name} ${user.last_name}`} />
        <AvatarFallback>
          {getInitials(user.first_name, user.last_name)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <h4 className="font-medium truncate">
            {user.first_name} {user.last_name}
          </h4>
          <span className="text-xs text-muted-foreground whitespace-nowrap mr-1">
            {formatDistanceToNow(new Date(updated_at), { addSuffix: true })}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground truncate">
            {last_message ? last_message.content : 'بدء محادثة جديدة'}
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
