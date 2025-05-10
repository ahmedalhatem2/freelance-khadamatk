
import React, { useEffect, useRef } from 'react';
import { Message } from '@/types/chat';
import MessageItem from './MessageItem';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <p className="text-muted-foreground">جاري تحميل الرسائل...</p>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <p className="text-muted-foreground">ابدأ المحادثة بإرسال رسالة</p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="flex flex-col">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default MessageList;
