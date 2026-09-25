import React, { useState } from 'react';
import { Customer } from '../types';
import { getAIGeneratedCampaign } from '../services/geminiService';
import { 
  Sparkles, 
  Send, 
  Copy, 
  RefreshCw, 
  MessageSquare, 
  CheckCircle2, 
  Users, 
  Flame, 
  Tag, 
  Gift, 
  TrendingUp,
  Share2
} from 'lucide-react';

interface Props {
  customers: Customer[];
}

const MarketingCenter: React.FC<Props> = ({ customers }) => {
  const [topic, setTopic] = useState('Diwali Grand Festive Thali');
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || '');
  const [targetSegment, setTargetSegment] = useState<'all' | 'vip' | 'jain' | 'inactive'>('all');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const festivalPresets = [
    { title: 'Diwali Grand Festive Thali', desc: 'Complimentary Gulab Jamun & Mithai Box' },
    { title: 'Eid-ul-Fitr Royal Biryani Dastarkhwan', desc: 'Pre-order 1kg Dum Biryani Potli' },
    { title: 'Holi Rangoli Feast & Thandai', desc: 'Special Kesar Thandai & Gujiya Platter' },
    { title: 'Navratri Sattvic & Fasting Vrat Thali', desc: '100% Sendha Salt & Pure Jain Utensils' },
    { title: 'Monsoon Adrak Chai & Crispy Pakora', desc: 'Evening Rain Specials & Samosa Chaat' },
    { title: 'Sunday Maharaja Family Lunch', desc: '15% Off on Tables of 6 or More' },
    { title: 'VIP Re-engagement (We Miss You)', desc: 'Free Butter Garlic Naan on Next Visit' }
  ];

  const handleGenerate = async () => {
    setIsLoading(true);
    setCopied(false);
    const customer = customers.find(c => c.id === selectedCustomerId) || customers[0];
    if (customer) {
      const result = await getAIGeneratedCampaign(
        topic, 
        customer.name, 
        customer.spicePreference, 
        customer.dietaryTags,
        'MasalaCraft'
      );
      setGeneratedContent(result || '');
    }
    setIsLoading(false);
  };

  const handleCopy = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeCustomer = customers.find(c => c.id === selectedCustomerId) || customers[0];

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-stone-900 to-amber-950 p-6 lg:p-8 rounded-2xl text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
            <Sparkles size={14} /> WhatsApp & Festival Marketing Engine
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-100">
            Reach Guests on WhatsApp for Festivals & Family Occasions
          </h2>
          <p className="text-xs text-stone-300 mt-1 max-w-xl">
            Indian diners convert 4x faster on personalized WhatsApp invitations than traditional email. Generate authentic festival campaigns tailored to individual spice and Jain preferences.
          </p>
        </div>
        <div className="flex gap-4 border-t md:border-t-0 md:border-l border-stone-800 pt-3 md:pt-0 md:pl-6 text-xs text-stone-300">
          <div>
            <div className="text-xl font-bold font-mono text-amber-400">84.6%</div>
            <div className="text-[11px] text-stone-400">WhatsApp Open Rate</div>
          </div>
          <div>
            <div className="text-xl font-bold font-mono text-emerald-400">₹42,800</div>
            <div className="text-[11px] text-stone-400">Monthly Campaign Lift</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Preset Selector & Target Setup */}
        <div className="space-y-5">
          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Tag size={16} className="text-amber-600" />
              1. Choose Festival or Occasion
            </h3>

            <div className="space-y-2">
              {festivalPresets.map(preset => (
                <button
                  key={preset.title}
                  onClick={() => setTopic(preset.title)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                    topic === preset.title
                      ? 'border-amber-600 bg-amber-50/60 font-semibold text-stone-900 shadow-sm'
                      : 'border-stone-100 bg-stone-50/50 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <div className="font-bold text-stone-900">{preset.title}</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">{preset.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Users size={16} className="text-amber-600" />
              2. Target Guest Persona
            </h3>

            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Select Patron to Personalize</label>
              <select
                value={selectedCustomerId}
                onChange={(e) => setSelectedCustomerId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-800 bg-stone-50 focus:outline-none focus:border-amber-500"
              >
                {customers.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.tier} · {c.spicePreference} {c.dietaryTags.length > 0 ? `· ${c.dietaryTags.join('/')}` : ''})
                  </option>
                ))}
              </select>
            </div>

            {activeCustomer && (
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-xs space-y-1 text-stone-600">
                <div className="font-bold text-stone-900">{activeCustomer.name} Profile:</div>
                <div>• Spice Preference: <strong>{activeCustomer.spicePreference}</strong></div>
                <div>• Dietary Tags: <strong>{activeCustomer.dietaryTags.join(', ') || 'Standard'}</strong></div>
                <div>• Favorite Dish: <strong>{activeCustomer.favoriteDish}</strong></div>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="animate-spin" size={15} />
                  Writing Festival Invitation...
                </>
              ) : (
                <>
                  <Sparkles size={15} />
                  Generate AI WhatsApp Invitation
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Live WhatsApp Screen Simulation */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col justify-between min-h-[480px]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold font-serif text-base shadow-sm">
                    MC
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm">MasalaCraft Hospitality WhatsApp</h3>
                    <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Verified Official Account
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    disabled={!generatedContent}
                    className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 flex items-center gap-1 disabled:opacity-40"
                  >
                    {copied ? <CheckCircle2 size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    {copied ? 'Copied!' : 'Copy Text'}
                  </button>
                </div>
              </div>

              {/* Chat Simulation Area */}
              <div className="my-6 p-6 rounded-2xl bg-[#efeae2] border border-stone-200/80 space-y-4 shadow-inner min-h-[280px] flex flex-col justify-center">
                {generatedContent ? (
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-md max-w-lg border border-stone-100 text-xs text-stone-800 space-y-2 leading-relaxed">
                    <div className="whitespace-pre-wrap font-sans">
                      {generatedContent}
                    </div>
                    <div className="text-right text-[10px] text-stone-400 font-mono">
                      Just now · Delivered ✓✓
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-stone-500 text-xs space-y-2">
                    <MessageSquare size={32} className="mx-auto text-stone-400" />
                    <p className="font-semibold text-stone-700">No invitation generated yet</p>
                    <p className="text-stone-400">Select an occasion and click "Generate AI WhatsApp Invitation" above.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            {generatedContent && (
              <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-stone-500">
                  Ready to send to <strong>{activeCustomer?.name}</strong> ({activeCustomer?.phone})
                </span>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${activeCustomer?.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(generatedContent)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Share2 size={14} /> Open in WhatsApp Web
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingCenter;
