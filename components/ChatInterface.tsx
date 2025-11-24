import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-[600px] lg:h-full bg-cyber-dark border border-cyber-border rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.3)]">
      {/* Header */}
      <div className="bg-gray-900 p-4 border-b border-cyber-border flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse"></div>
          <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest">AI Tutor Link</h3>
        </div>
        <span className="text-[10px] text-gray-600 font-mono">v2.5.FLASH</span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm custom-scrollbar">
        {messages.length === 0 && (
          <div className="text-center text-gray-600 mt-10 italic">
            <p>Connect to the neural tutor...</p>
            <p className="text-xs mt-2">Ask specifically about parameters, functions, or logic!</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] p-3 rounded-lg border ${
                msg.role === 'user' 
                  ? 'bg-gray-800 border-gray-700 text-gray-200 rounded-br-none' 
                  : 'bg-[rgba(0,255,65,0.05)] border-cyber-green/30 text-gray-300 rounded-bl-none'
              }`}
            >
              {msg.role === 'model' && <span className="block text-[10px] text-cyber-green mb-1 uppercase">System</span>}
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex justify-start">
             <div className="bg-[rgba(0,255,65,0.05)] border border-cyber-green/30 p-3 rounded-lg rounded-bl-none">
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-cyber-green rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-cyber-green rounded-full animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 bg-cyber-green rounded-full animate-bounce delay-150"></span>
                </span>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-3 bg-gray-900 border-t border-cyber-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Query the tutor..."
            disabled={isLoading}
            className="flex-1 bg-black border border-gray-700 text-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-cyber-green transition-colors placeholder-gray-700"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-cyber-dark border border-cyber-green text-cyber-green px-4 py-2 rounded text-sm font-bold hover:bg-cyber-green hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            SEND
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;