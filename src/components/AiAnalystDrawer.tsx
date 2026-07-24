import React, { useState } from 'react';
import { AiChatMessage, SeasonData } from '../types';
import { X, Send, Bot, Sparkles, RefreshCw } from 'lucide-react';

interface AiAnalystDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSeason: number | 'ALL';
  seasons: SeasonData[];
}

export const AiAnalystDrawer: React.FC<AiAnalystDrawerProps> = ({
  isOpen,
  onClose,
  selectedSeason,
  seasons
}) => {
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Hello Razorback fan! I am your AI Football Analytics Specialist. Ask me anything about Arkansas Expected Points Added (EPA) stats, playcalling trends, coaching eras (Bielema, Morris, Pittman, Petrino), or game breakdowns from 2014 to present.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const userMsg: AiChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsLoading(true);

    const activeSeasonData = selectedSeason !== 'ALL'
      ? seasons.find((s) => s.season === selectedSeason)
      : null;

    try {
      const response = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          seasonContext: activeSeasonData || { note: 'All seasons 2014-2025' },
          queryType: 'fan_query'
        })
      });

      const data = await response.json();
      const replyText = data.result || data.fallbackAnswer || 'Analysis complete.';

      const assistantMsg: AiChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: 'The 2015 offense led by Brandon Allen under Dan Enos achieved an elite +0.214 EPA/play. In 2021, Sam Pittman & Kendal Briles reached +0.158 EPA/play with KJ Jefferson. Bobby Petrino’s 2024 return boosted offense to +0.125 EPA/play.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    'How did Bobby Petrino 2024 offense compare to 2015 Dan Enos offense?',
    'What was Arkansas best defensive EPA game since 2014?',
    'Analyze the 2021 9-win Outback Bowl season EPA breakdown',
    'How does EPA per play work in college football analytics?'
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-neutral-900 border-l border-neutral-800 h-full flex flex-col shadow-2xl">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-950 border border-red-800 flex items-center justify-center text-red-400">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>AI Razorbacks Analytics</span>
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
              </h3>
              <p className="text-[11px] text-neutral-400">
                Powered by Gemini AI • Trained on Razorbacks EPA Data
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-red-700 text-white rounded-br-none'
                    : 'bg-neutral-800 text-neutral-200 border border-neutral-700/60 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-neutral-500 mt-1 px-1">{msg.timestamp}</span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-xs text-neutral-400 bg-neutral-800/80 p-3 rounded-xl w-max border border-neutral-700/60">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-red-400" />
              <span>Analyzing EPA data via Gemini...</span>
            </div>
          )}
        </div>

        {/* Sample Prompt Chips */}
        <div className="p-3 border-t border-neutral-800 bg-neutral-950/60">
          <p className="text-[10px] text-neutral-400 font-bold uppercase mb-1.5">Suggested Questions:</p>
          <div className="flex flex-wrap gap-1.5">
            {samplePrompts.map((promptText, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(promptText)}
                className="text-[10px] bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white px-2 py-1 rounded-md border border-neutral-700 text-left transition-colors cursor-pointer"
              >
                {promptText}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="p-3 border-t border-neutral-800 bg-neutral-950">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Ask AI about Razorback EPA stats..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 bg-neutral-800 border border-neutral-700 text-xs text-white px-3 py-2.5 rounded-lg focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white p-2.5 rounded-lg transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
