import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Send, X, BookOpen, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  category?: string | null;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text:
        "<h>Hello! I'm here to support you 🤗</h>" +
        "<p>How are you feeling today?</p>",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [, setLocation] = useLocation();

  // Scroll reference to jump to START of latest message
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll whenever messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [messages]);

  const quickReplies = ["Feeling stressed", "Need someone to talk to", "Sleep issues", "Anxiety"];

  const handleSend = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();

      const botMessage: Message = {
        id: updatedMessages.length + 1,
        text: data.reply, 
        sender: "bot",
        timestamp: new Date(),
        category: data.category || null,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
    }

    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-8 left-8 z-50 group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-emerald-400 to-teal-400 rounded-full blur-lg opacity-60 group-hover:opacity-80 animate-pulse-slow" />
        <Button
          size="lg"
          className="relative h-20 w-20 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 bg-gradient-to-r from-primary to-emerald-600"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-9 w-9" />
        </Button>
      </div>
    );
  }

  return (
    <Card className="fixed bottom-8 left-8 w-[420px] h-[650px] flex flex-col shadow-2xl z-50 border-2">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-gradient-to-r from-primary/5">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarFallback className="bg-gradient-to-br from-primary to-emerald-600 text-white font-semibold">AI</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">MindEase AI Assistant</CardTitle>
            <Badge variant="secondary" className="text-xs mt-1">Online • Ready to help</Badge>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto space-y-4 py-4">
        {messages.map((m, index) => (
          <div
            key={m.id}
            ref={index === messages.length - 1 ? scrollRef : null} // anchor on last message
            className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm ${
                m.sender === "user"
                  ? "bg-gradient-to-br from-primary to-emerald-600 text-white rounded-tr-sm"
                  : "bg-muted rounded-tl-sm"
              }`}
            >
              <div
                className="text-sm space-y-2 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: m.text }}
              ></div>
              
              {/* Recommendations div for bot messages with category */}
              {m.sender === "bot" && m.category && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="mt-3 pt-3 border-t border-border/50"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-xs font-semibold text-foreground">Recommended Resources</span>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs bg-primary/5 hover:bg-primary/10 border-primary/30"
                      onClick={() => {
                        setLocation(`/resources?category=${encodeURIComponent(m.category!)}`);
                        setIsOpen(false);
                      }}
                    >
                      Explore {m.category} Resources
                      <ArrowRight className="h-3 w-3 ml-2" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-300"></span>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <div className="px-6 pb-3 border-t">
        <div className="flex flex-wrap gap-2">
          {quickReplies.map((reply) => (
            <Badge
              key={reply}
              variant="outline"
              className="cursor-pointer hover:scale-105 border-primary/30"
              onClick={() => handleSend(reply)}
            >
              {reply}
            </Badge>
          ))}
        </div>
      </div>

      <CardFooter className="px-6 pb-6">
        <div className="flex gap-2 w-full">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 rounded-full"
          />
          <Button
            size="icon"
            onClick={() => handleSend()}
            className="rounded-full bg-gradient-to-r from-primary to-emerald-600"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
