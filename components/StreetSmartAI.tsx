import React, { useState, useRef, useEffect } from 'react';
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

const generateLocalAssistantReply = (restaurantName: string, userText: string) => {
  const text = userText.toLowerCase();

  if (text.includes('pricing') || text.includes('price') || text.includes('menu price')) {
    return `For ${restaurantName}, a strong pricing approach is:
- Keep premium dishes with clear value framing
- Bundle biryani, thali, and dessert offers together
- Use 2-tier pricing for family dining vs. quick meals
- Highlight margin-friendly add-ons like naan, drinks, and desserts`;
  }

  if (text.includes('jain') || text.includes('veg') || text.includes('vegetarian')) {
    return `For Jain / vegetarian guests, focus on:
- Separate prep tools and clean utensils
- Pure veg gravies with no onion or garlic
- Family platter combinations and sattvic thali options
- Clear labeling to reduce guest hesitation`;
  }

  if (text.includes('biryani') || text.includes('queue') || text.includes('kitchen')) {
    return `To improve kitchen flow for biryani and tandoor service:
- Pre-batch rice and marination in the afternoon
- Split high-demand dishes into separate prep windows
- Prioritize orders by table size and time sensitivity
- Keep a dedicated hold tray for dine-in vs. takeout orders`;
  }

  if (text.includes('campaign') || text.includes('festival') || text.includes('marketing')) {
    return `A strong local campaign should include:
- Festival-specific family bundles
- Personalized WhatsApp invites based on prior visits
- High-margin add-on suggestions for dessert and drinks
- A clear CTA: reserve a table or pre-order a special platter`;
  }

  return `Here is a practical operational suggestion for ${restaurantName}:
- Review the top 5 best-selling dishes this week
- Promote a combo offer to increase average check size
- Prioritize guest satisfaction with fast table turnover and clean service
- Use a simple WhatsApp follow-up after bookings and dine-in visits`;
};

const StreetSmartAI: React.FC<Props> = ({ restaurantName, isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: `Namaste! I am your operations concierge for ${restaurantName}. I can help with pricing, kitchen flow, Jain menu planning, festive promotions, and guest service strategy.`
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
      await new Promise(resolve => setTimeout(resolve, 350));
      const reply = generateLocalAssistantReply(restaurantName, userText);
      setMessages(prev => [...prev, { role: 'model', text: reply }]);
    } catch (error) {
      console.error('Operations Assistant Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'The operations assistant is temporarily unavailable. Please try a different question.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-8 pointer-events-none">
      <div className="bg-white w-full max-w-md h-[640px] max-h-[85vh] rounded-3xl shadow-2xl border border-stone-200 flex flex-col pointer-events-auto overflow-hidden animate-in slide-in-from-bottom-4">
        <div className="bg-stone-900 p-5 flex items-center justify-between text-white border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="bg-amber-600 p-2 rounded-xl shadow-md">
              <ChefHat size={20} className="text-stone-950" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base tracking-tight">Operations Concierge</h3>
              <p className="text-[11px] text-amber-400 font-medium">Restaurant Strategy Assistant</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-stone-800 rounded-lg text-stone-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

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
                <span>Reviewing guest operations...</span>
              </div>
            </div>
          )}
        </div>

        <div className="px-4 py-2 bg-white border-t border-stone-100 overflow-x-auto whitespace-nowrap flex gap-2 no-scrollbar">
          {[
            'Pricing our Diwali thali',
            'Jain kitchen guidelines',
            'Speed up biryani station',
            'Weekend upsell strategy'
          ].map(tip => (
            <button
              key={tip}
              onClick={() => setInput(tip)}
              className="text-[11px] font-medium text-stone-600 bg-stone-50 hover:bg-amber-50 hover:text-amber-800 px-3 py-1.5 rounded-lg border border-stone-200 transition-colors"
            >
              {tip}
            </button>
          ))}
        </div>

        <div className="p-4 bg-white border-t border-stone-200">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Ask restaurant operations question..."
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
