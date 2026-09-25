"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function JarvisChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! 👋 Welcome to FSP. I'm Jarvis, your AI guide. Ask me about FSP programs, the Core Program, community, or how to join!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    "What is FSP?",
    "FSP Core Program",
    "Who can join?",
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async (overrideText?: string) => {
    const textToSend = (overrideText ?? input).trim();
    if (!textToSend || loading) return;

    const updatedMessages = [...messages, { role: "user" as const, content: textToSend }];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setSuggestions([]);

    try {
      const res = await fetch("/api/jarvis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: updatedMessages.slice(0, -1),
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
        setSuggestions(data.suggestions || []);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "I'm having trouble retrieving a response right now. Please try again." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm having trouble connecting right now. Please check your network and try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestionClick = (text: string) => {
    sendMessage(text);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      data-lenis-prevent
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="fixed bottom-6 sm:bottom-8 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px] h-[min(440px,calc(100dvh-4.5rem))] max-h-[calc(100dvh-4.5rem)] rounded-2xl bg-white shadow-2xl border border-line overflow-hidden flex flex-col overscroll-contain"
    >
      {/* Header */}
      <div className="bg-navy px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-orange flex items-center justify-center font-bold text-white text-xs shadow">
            F
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-white font-semibold text-sm leading-none">Jarvis</p>
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-on-dark-muted text-[11px] leading-tight mt-0.5">FSP AI Assistant</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-on-dark-muted hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-orange"
          aria-label="Close chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages area */}
      <div
        data-lenis-prevent
        className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 bg-paper overscroll-contain"
      >
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("flex items-end gap-2 text-sm", msg.role === "user" ? "justify-end" : "justify-start")}
          >
            {msg.role === "assistant" && (
              <div className="h-6 w-6 rounded-full bg-navy flex items-center justify-center shrink-0 mb-0.5 shadow-sm">
                <span className="text-white text-[10px] font-bold">F</span>
              </div>
            )}
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[0.875rem] leading-relaxed whitespace-pre-line shadow-xs",
                msg.role === "user"
                  ? "bg-navy text-white rounded-br-xs"
                  : "bg-white border border-line text-ink rounded-bl-xs"
              )}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-2 text-sm">
            <div className="h-6 w-6 rounded-full bg-navy flex items-center justify-center shrink-0 mb-0.5">
              <span className="text-white text-[10px] font-bold">F</span>
            </div>
            <div className="bg-white border border-line rounded-2xl rounded-bl-xs px-3.5 py-2.5 shadow-xs">
              <div className="flex items-center gap-1.5 py-0.5">
                <span className="h-2 w-2 bg-orange rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 bg-orange/70 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 bg-orange/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts */}
      <AnimatePresence>
        {suggestions.length > 0 && !loading && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-line px-3 py-2 bg-white"
          >
            <p className="text-[10px] uppercase font-semibold text-muted tracking-wider mb-1.5 px-1">Suggested questions</p>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(s)}
                  className="text-xs text-navy border border-navy/20 rounded-full px-2.5 py-1 hover:bg-navy hover:text-white transition-all focus:outline-none focus:ring-1 focus:ring-orange cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input area */}
      <div className="border-t border-line p-3 bg-white shrink-0">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Jarvis about FSP..."
            className="flex-1 border border-line rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent transition-all"
            disabled={loading}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="bg-navy text-white rounded-xl p-2.5 hover:bg-ink disabled:opacity-40 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-orange shrink-0 cursor-pointer"
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
