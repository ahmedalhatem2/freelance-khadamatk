
import React from 'react';
import { User } from '@/types/chat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Phone, Video, MoreVertical } from 'lucide-react';

interface ChatHeaderProps {
  activeUser: User | null;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ activeUser }) => {
  if (!activeUser) {
    return null;
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="flex items-center justify-between border-b p-3">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={activeUser.image || undefined} alt={`${activeUser.first_name} ${activeUser.last_name}`} />
          <AvatarFallback>
            {getInitials(activeUser.first_name, activeUser.last_name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-medium">
            {activeUser.first_name} {activeUser.last_name}
          </h2>
          <p className="text-xs text-muted-foreground">
            {activeUser.status === 'online' ? 'متصل الآن' : 'غير متصل'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button size="icon" variant="ghost">
          <Phone className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost">
          <Video className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
