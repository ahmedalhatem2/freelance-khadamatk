
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Message } from '@/types/chat';
import { useAuth } from '@/context/AuthProvider';
import { format } from 'date-fns';

interface MessageItemProps {
  message: Message;
}

const MessageItem = forwardRef<HTMLDivElement, MessageItemProps>(
  ({ message }, ref) => {
    const { user } = useAuth();
    const isOwnMessage = user?.id === message.from;

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col mb-4 max-w-[80%]",
          isOwnMessage ? "self-end items-end" : "self-start items-start"
        )}
      >
        <div
          className={cn(
            "px-4 py-2 rounded-lg break-words",
            isOwnMessage 
              ? "bg-primary text-primary-foreground rounded-br-none" 
              : "bg-muted text-foreground rounded-bl-none"
          )}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-1">
          {format(new Date(message.created_at), 'HH:mm')}
        </span>
      </div>
    );
  }
);

MessageItem.displayName = "MessageItem";

export default MessageItem;
