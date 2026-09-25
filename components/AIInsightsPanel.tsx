import React, { useState, useEffect } from 'react';
import { Customer, Order } from '../types';
import { analyzeCustomerTrends, suggestUpsellCombo } from '../services/geminiService';
import { 
  Sparkles, 
  RefreshCw, 
  TrendingUp, 
  Flame, 
  Award, 
  ShieldCheck, 
  ChefHat, 
  Utensils, 
  Lightbulb,
  ArrowRight
} from 'lucide-react';

interface Props {
  customers: Customer[];
  orders?: Order[];
  restaurantName?: string;
}

const AIInsightsPanel: React.FC<Props> = ({ 
  customers, 
  orders = [], 
  restaurantName = 'MasalaCraft' 
}) => {
  const [insights, setInsights] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Pairing tool state
  const [selectedPairingDish, setSelectedPairingDish] = useState('Royal Hyderabadi Dum Biryani');
  const [pairingSpice, setPairingSpice] = useState('Medium');
  const [pairingRecommendation, setPairingRecommendation] = useState<string>('');
  const [isPairingLoading, setIsPairingLoading] = useState(false);

  const performAnalysis = async () => {
    setIsAnalyzing(true);
    const result = await analyzeCustomerTrends(customers, orders, restaurantName);
    setInsights(result || '');
    setIsAnalyzing(false);
  };

  const handlePairingSearch = async () => {
    setIsPairingLoading(true);
    const result = await suggestUpsellCombo(selectedPairingDish, pairingSpice);
    setPairingRecommendation(result || '');
    setIsPairingLoading(false);
  };

  useEffect(() => {
    performAnalysis();
    handlePairingSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 p-6 lg:p-8 rounded-2xl text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
            <Sparkles size={14} /> AI Culinary & Operations Intelligence
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-100">
            Saffron AI Consultant for {restaurantName}
          </h2>
          <p className="text-xs text-stone-300 mt-1 max-w-xl">
            Real-time operational analysis evaluating patron spice distributions, high-spend loyalty profiles, Jain catering opportunities, and station turnaround speeds.
          </p>
        </div>
        <button
          onClick={performAnalysis}
          disabled={isAnalyzing}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center gap-2 self-start md:self-auto shrink-0 disabled:opacity-50"
        >
          <RefreshCw size={14} className={isAnalyzing ? 'animate-spin' : ''} />
          {isAnalyzing ? 'Analyzing Gastronomy...' : 'Re-run AI Analysis'}
        </button>
      </div>

      {/* Main Analysis Card */}
      <div className="bg-white p-6 lg:p-8 rounded-2xl border border-stone-200/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Lightbulb size={20} className="text-amber-600" />
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Executive Strategic Recommendations
            </h3>
          </div>
          <span className="text-xs text-stone-400">Model: Gemini 2.5/Flash Latest</span>
        </div>

        {isAnalyzing ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3 text-stone-400">
            <RefreshCw size={32} className="animate-spin text-amber-600" />
            <p className="text-xs font-semibold text-stone-700">Synthesizing patron dining telemetry and spice matrix...</p>
          </div>
        ) : (
          <div className="prose prose-stone max-w-none text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-wrap font-sans bg-stone-50/70 p-6 rounded-xl border border-stone-200">
            {insights || 'Click "Re-run AI Analysis" to generate actionable insights.'}
          </div>
        )}
      </div>

      {/* Interactive Waitstaff Dish Pairing Tool */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm space-y-5">
        <div>
          <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
            <Utensils size={18} className="text-amber-600" />
            Waitstaff Smart Upsell & Pairing Assistant
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Empower table servers to suggest high-margin beverage and bread pairings matching the diner's exact dish and spice level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Diner's Main Dish</label>
            <select
              value={selectedPairingDish}
              onChange={(e) => setSelectedPairingDish(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-800 bg-stone-50 focus:outline-none"
            >
              <option value="Royal Hyderabadi Dum Biryani">Royal Hyderabadi Dum Biryani</option>
              <option value="Old Delhi Butter Chicken">Old Delhi Butter Chicken</option>
              <option value="Dal Makhani Bukhara">Dal Makhani Bukhara</option>
              <option value="Tandoori Paneer Tikka">Tandoori Paneer Tikka</option>
              <option value="Mumbai Samosa Chaat">Mumbai Samosa Chaat</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Diner's Spice Level</label>
            <select
              value={pairingSpice}
              onChange={(e) => setPairingSpice(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-800 bg-stone-50 focus:outline-none"
            >
              <option value="Mild">Mild</option>
              <option value="Medium">Medium</option>
              <option value="Teekha">Teekha (Hot)</option>
              <option value="Desi Spicy">Desi Spicy</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handlePairingSearch}
              disabled={isPairingLoading}
              className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              {isPairingLoading ? <RefreshCw className="animate-spin" size={14} /> : <Sparkles size={14} />}
              Generate Table Upsell Suggestion
            </button>
          </div>
        </div>

        {pairingRecommendation && (
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 text-xs text-stone-800 whitespace-pre-wrap font-medium leading-relaxed">
            <strong className="text-amber-950 block mb-1">Recommended Table Pairings:</strong>
            {pairingRecommendation}
          </div>
        )}
      </div>

      {/* Static Key Domain Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
            <Flame size={16} className="text-amber-600" />
            High-Spice Retention
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Patrons preferring <strong>Teekha</strong> and <strong>Desi Spicy</strong> re-order within 12 days on average, yielding 28% higher LTV than mild diners.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
            <ShieldCheck size={16} className="text-emerald-600" />
            Jain & Pure Veg Lift
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Promoting dedicated Jain cooking pans and Sattvic gravies brings larger family dining parties (avg. 6.8 guests vs. 3.2 walk-ins).
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-800">
            <ChefHat size={16} className="text-blue-600" />
            Tandoor & Dum Pre-baking
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Pre-portioning aged Hyderabadi basmati handis at 19:15 cuts Saturday night kitchen wait times by 8.4 minutes per table.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsPanel;
