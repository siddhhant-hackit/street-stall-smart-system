import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { X, Send, Sparkles, Utensils, Info, MessageSquare, ChefHat, Flame } from 'lucide-react';

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
    { 
      role: 'model', 
      text: `Namaste! I am your AI Operations Concierge for ${restaurantName}. I can assist you with Indian menu pricing, festival campaign planning, Jain & dietary kitchen protocols, and table occupancy strategies. How may I assist your dinner service today?` 
    }
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
        model: 'gemini-flash-latest',
        contents: [...messages, { role: 'user', text: userText }].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: `You are the executive restaurant consultant & culinary strategist for '${restaurantName}', a premier Indian restaurant offering fine dining, banquets, and digital QR table ordering.
You specialize in:
- Authentic North Indian, Mughlai, South Indian, and street chaat hospitality.
- Food cost management, menu engineering, and Thali pricing in Indian Rupees (₹).
- Strict dietary guidelines (Jain Sattvic cooking without onion/garlic, Halal standards, and allergy management).
- Festive promotions (Diwali, Eid, Holi, Navratri, Durga Puja, New Year, Sunday Brunches).
- Kitchen flow between Tandoor, Curry gravies, and Biryani dum stations.

Keep your responses practical, concise, polite (using Indian hospitality etiquette like Namaste and Pranam), and structured in clean bullet points.`,
          temperature: 0.7,
        }
      });

      const aiText = response.text || "I apologize, my culinary knowledge system could not process that request. Please ask again.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Service temporarily unavailable. Please check your connectivity or try again shortly." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-8 pointer-events-none">
      <div className="bg-white w-full max-w-md h-[640px] max-h-[85vh] rounded-3xl shadow-2xl border border-stone-200 flex flex-col pointer-events-auto overflow-hidden animate-in slide-in-from-bottom-8 duration-300 relative">
        {/* Header */}
        <div className="bg-stone-900 p-5 flex items-center justify-between text-white border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="bg-amber-600 p-2 rounded-xl shadow-md">
              <ChefHat size={20} className="text-stone-950" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base tracking-tight">AI Operations Concierge</h3>
              <p className="text-[11px] text-amber-400 font-medium">Culinary & Hospitality Consultant</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-stone-800 rounded-lg text-stone-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messaging Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-stone-50/50 text-xs">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed font-sans shadow-xs ${
                m.role === 'user' 
                  ? 'bg-amber-600 text-white rounded-tr-none' 
                  : 'bg-white text-stone-800 border border-stone-200/80 rounded-tl-none whitespace-pre-wrap'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-stone-200 text-stone-500 text-xs flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
                <span>Consulting culinary knowledge base...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-white border-t border-stone-100 overflow-x-auto whitespace-nowrap flex gap-2 no-scrollbar">
          {[
            "Pricing our Diwali Thali",
            "Jain cooking kitchen guidelines",
            "Speed up Biryani station queue",
            "Weekend upsell pairings"
          ].map(tip => (
            <button 
              key={tip}
              onClick={() => { setInput(tip); }}
              className="text-[11px] font-medium text-stone-600 bg-stone-50 hover:bg-amber-50 hover:text-amber-800 px-3 py-1.5 rounded-lg border border-stone-200 transition-colors"
            >
              {tip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-stone-200">
          <div className="relative flex items-center">
            <input 
              type="text"
              placeholder="Ask operations question (e.g. Jain menu, thali pricing)..."
              className="w-full pl-4 pr-12 py-3 bg-stone-50 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 text-xs text-stone-800"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 w-8 h-8 bg-amber-600 hover:bg-amber-700 text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-30 shadow-xs"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreetSmartAI;
