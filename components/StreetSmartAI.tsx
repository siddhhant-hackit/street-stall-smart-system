
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { X, Send, Sparkles, Utensils, Info, Zap } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface Props {
  restaurantName: string;
  isOpen: boolean;
  onClose: () => void;
}

const StreetSmartAI: React.FC<Props> = ({ restaurantName, isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Namaste! I'm your Street Smart Assistant for ${restaurantName}. How can I optimize your stall today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, { role: 'user', text: userText }].map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: `You are the 'Street Smart AI Assistant' for ${restaurantName}, a modern eatery using Street Stall CRM. You help owners with menu management, guest intelligence, and digital signal (QR) deployment. Use futuristic terminology mixed with warm Indian hospitality. Keep it snappy and strategic.`,
          temperature: 0.7,
        }
      });

      const aiText = response.text || "Transmission error. Neural link unstable. Please repeat.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Signal lost. The kitchen router might be down. Check connectivity." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-6 md:p-10 pointer-events-none">
      <div className="bg-white w-full max-w-md h-[700px] max-h-[85vh] rounded-[3.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-4 border-orange-600 flex flex-col pointer-events-auto overflow-hidden animate-in slide-in-from-bottom-12 duration-500 relative">
        {/* Animated Accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-orange-600 animate-pulse"></div>
        
        {/* Header */}
        <div className="bg-gray-900 p-8 flex items-center justify-between text-white relative">
          <div className="flex items-center gap-4">
            <div className="bg-orange-600 p-3 rounded-2xl shadow-lg shadow-orange-900/50">
              <Zap size={22} className="animate-pulse" />
            </div>
            <div>
              <h3 className="font-black uppercase tracking-tight text-lg">AI Assistant</h3>
              <p className="text-[10px] text-orange-400 uppercase tracking-[0.2em] font-black">Link: {restaurantName.toLowerCase()}-sync</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Messaging Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#fffdfa] no-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-5 rounded-[2rem] text-sm leading-relaxed font-medium shadow-sm border ${
                m.role === 'user' 
                  ? 'bg-orange-600 text-white rounded-tr-none border-orange-500 shadow-orange-100' 
                  : 'bg-white text-gray-800 border-orange-100 rounded-tl-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-orange-50 p-5 rounded-[2rem] rounded-tl-none shadow-inner border border-orange-100 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-900 opacity-60">Syncing...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggestion Nodes */}
        <div className="px-8 py-3 bg-white border-t border-gray-50 overflow-x-auto whitespace-nowrap flex gap-3 no-scrollbar">
           {[
             "Optimize Menu Flow",
             "Analyze Signal Performance",
             "Loyalty Protocol Status",
             "Market Flux Trends"
           ].map(tip => (
             <button 
              key={tip}
              onClick={() => { setInput(tip); }}
              className="text-[10px] font-black text-gray-400 bg-gray-50 px-5 py-2.5 rounded-full hover:bg-orange-600 hover:text-white transition-all border border-gray-100 uppercase tracking-widest"
             >
               {tip}
             </button>
           ))}
        </div>

        {/* Input Interface */}
        <div className="p-6 bg-white border-t-2 border-orange-50">
          <div className="relative">
            <input 
              type="text"
              placeholder="Inject command..."
              className="w-full pl-8 pr-16 py-5 bg-orange-50/30 rounded-[2rem] border-2 border-orange-100 focus:outline-none focus:border-orange-500 text-sm font-bold transition-all placeholder:text-gray-300"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center hover:bg-orange-600 transition-all disabled:opacity-30 disabled:grayscale shadow-lg"
            >
              <Send size={20} />
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
             <Info size={12} className="text-orange-400" />
             <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
               Experimental Neural Assistant • v2.5.0
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreetSmartAI;
