import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  X,
  TrendingUp,
  IndianRupee,
  Edit3,
  Globe,
  Package,
  Users,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { mockBusinessAdvisor } from '@/services/aiServices';
import { AIMessage } from '@/types';

const QUICK_ACTIONS = [
  { label: '💰 How much should I charge?', query: 'How much should I charge for my craft products?' },
  { label: '✍️ Improve my description', query: 'How can I improve my product descriptions to attract buyers?' },
  { label: '📈 How can I sell more?', query: 'How can I sell more Phulkari products?' },
  { label: '🌐 Translate my listing', query: 'Can you help translate my Punjabi and Hindi listings to English?' },
  { label: '📦 What should I sell next?', query: 'What handicraft products should I make next for upcoming festivals?' },
  { label: '🤝 Find buyers', query: 'Are there any corporate or boutique buyers looking for my craft?' },
];

export const AIAssistantDrawer: React.FC = () => {
  const { isAiDrawerOpen, setIsAiDrawerOpen, language } = useApp();
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text:
        language === 'hi'
          ? 'नमस्ते गुरप्रीत! मैं आपका डिजिटल व्यापार सहायक हूँ। मुझसे सही मूल्य तय करने, उत्पाद विवरण सुधारने, थोक खरीदार खोजने या ONDC लिस्टिंग के बारे में कुछ भी पूछें।'
          : 'Namaste Gurpreet! I am your AI digital business assistant. Ask me anything about pricing your craft, improving listings, finding bulk buyers, or growing your sales.',
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isAiDrawerOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: AIMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const reply = await mockBusinessAdvisor(query);
      const aiMsg: AIMessage = {
        id: `a_${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: 'Now',
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl border-l border-stone-200">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-stone-200 bg-stone-900 p-5 text-white">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500 text-stone-950 shadow-md">
              <Bot size={22} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-base tracking-tight text-white">
                  KarigarSetu AI
                </h3>
                <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
              </div>
              <p className="text-xs text-amber-200/80">
                Your digital business helper
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAiDrawerOpen(false)}
            className="rounded-full p-2 text-stone-400 hover:bg-stone-800 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-stone-900 text-white rounded-tr-xs'
                    : 'bg-white border border-stone-200 text-stone-800 rounded-tl-xs'
                }`}
              >
                {msg.sender === 'assistant' && (
                  <div className="mb-1 flex items-center gap-1 text-[11px] font-bold text-amber-600">
                    <Sparkles size={12} /> KarigarSetu AI
                  </div>
                )}
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <div
                  className={`mt-1.5 text-[10px] ${
                    msg.sender === 'user' ? 'text-stone-400 text-right' : 'text-stone-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-tl-xs border border-stone-200 bg-white p-4 text-sm text-stone-500 shadow-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-bounce" />
                  <span
                    className="h-2 w-2 rounded-full bg-amber-500 animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                  <span
                    className="h-2 w-2 rounded-full bg-amber-500 animate-bounce"
                    style={{ animationDelay: '0.4s' }}
                  />
                  <span className="text-xs text-stone-400 ml-1">Analyzing craft data...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action Suggestions */}
        <div className="border-t border-stone-200 bg-white p-3">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-stone-400">
            Suggested Business Queries
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {QUICK_ACTIONS.map((action, i) => (
              <button
                key={i}
                onClick={() => handleSend(action.query)}
                className="shrink-0 rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:border-amber-400 hover:bg-amber-50/60 hover:text-stone-900 transition"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="border-t border-stone-200 bg-white p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'अपना सवाल यहाँ लिखें या बोलें...'
                  : 'Ask about pricing, descriptions, buyers...'
              }
              className="flex-1 rounded-full border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="grid h-10 w-10 place-items-center rounded-full bg-amber-500 text-stone-950 font-bold hover:bg-amber-400 disabled:opacity-40 transition shadow"
            >
              <Send size={16} />
            </button>
          </form>
          <p className="mt-2 text-center text-[11px] text-stone-400">
            Powered by KarigarSetu Handicraft Intelligence Engine
          </p>
        </div>
      </div>
    </div>
  );
};
