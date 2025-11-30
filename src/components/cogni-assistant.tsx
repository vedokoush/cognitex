'use client';

import React, { useState } from 'react';
import { Bot, Send, Sparkles, Loader2, X } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { provideMotivationalSupport } from '@/ai/flows/provide-motivational-support';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};

export default function CogniAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Xin chào! Tôi là Cogni. Tôi có thể giúp bạn học hoặc cảm thấy tốt hơn hôm nay như thế nào? Bạn có thể nói những điều như 'Tôi đang cảm thấy căng thẳng' hoặc 'cho tôi một câu trích dẫn'.",
      sender: 'ai',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // We can use the user's input as the 'mood' or a cue.
      // The other parameters can be generalized for this context.
      const result = await provideMotivationalSupport({
        mood: input,
        recentActivity: 'Tương tác với Trợ lý Cogni',
        learningGoal: 'Hỗ trợ chung',
      });
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: result.message,
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Không thể nhận hỗ trợ động lực:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Tôi đang gặp một chút sự cố khi kết nối ngay bây giờ. Vui lòng thử lại trong giây lát.",
        sender: 'ai',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50"
        >
          <Sparkles className="h-8 w-8" />
          <span className="sr-only">Mở Trợ lý Cogni</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="w-80 md:w-96 rounded-xl shadow-2xl p-0 border-none mr-4 mb-2"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex flex-col h-[28rem]">
          <header className="flex items-center justify-between p-4 bg-primary text-primary-foreground rounded-t-xl">
            <div className="flex items-center gap-3">
              <Bot className="h-6 w-6" />
              <h3 className="font-semibold">Trợ lý Cogni</h3>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
            </Button>
          </header>

          <ScrollArea className="flex-1 p-4 bg-background">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex items-start gap-3',
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.sender === 'ai' && (
                    <Avatar className="h-8 w-8">
                       <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Bot className="h-5 w-5" />
                        </div>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-[80%] rounded-lg px-3 py-2 text-sm',
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    {message.text}
                  </div>
                   {message.sender === 'user' && (
                     <Avatar className="h-8 w-8">
                        <AvatarFallback>B</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-start gap-3 justify-start">
                    <Avatar className="h-8 w-8">
                       <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Bot className="h-5 w-5" />
                        </div>
                    </Avatar>
                    <div className="bg-muted rounded-lg px-3 py-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <footer className="p-4 border-t bg-background rounded-b-xl">
            <div className="relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Hỏi tôi bất cứ điều gì..."
                className="pr-12"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </footer>
        </div>
      </PopoverContent>
    </Popover>
  );
}
