
import React, { useState, useEffect } from 'react';
import { Customer } from '../types';
import { analyzeCustomerTrends } from '../services/geminiService';
import { BrainCircuit, Lightbulb, RefreshCcw, TrendingUp } from 'lucide-react';

interface Props {
  customers: Customer[];
}

const AIInsightsPanel: React.FC<Props> = ({ customers }) => {
  const [insights, setInsights] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const performAnalysis = async () => {
    setIsAnalyzing(true);
    const result = await analyzeCustomerTrends(customers);
    setInsights(result || '');
    setIsAnalyzing(false);
  };

  useEffect(() => {
    performAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 p-8 rounded-3xl text-white shadow-xl shadow-orange-100 relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-2">Saffron AI Lab</h2>
            <p className="opacity-90 max-w-lg">Advanced analytics powered by Gemini. We analyze your guest patterns, spice trends, and spending habits to give you the upper hand.</p>
          </div>
          <BrainCircuit size={80} className="opacity-20 hidden md:block" />
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <TrendingUp size={200} />
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-50">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Lightbulb className="text-yellow-500" />
            Strategic Recommendations
          </h3>
          <button 
            onClick={performAnalysis}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-orange-600 border border-orange-100 rounded-xl hover:bg-orange-50 transition-all"
            disabled={isAnalyzing}
          >
            <RefreshCcw size={16} className={isAnalyzing ? 'animate-spin' : ''} />
            Refresh Analysis
          </button>
        </div>

        {isAnalyzing ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400 space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-orange-100 border-t-orange-600 rounded-full animate-spin"></div>
              <BrainCircuit className="absolute inset-0 m-auto text-orange-600" size={24} />
            </div>
            <p className="font-medium animate-pulse">Consulting the Saffron AI...</p>
          </div>
        ) : (
          <div className="prose prose-orange max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap font-medium bg-orange-50/20 p-6 rounded-2xl border border-orange-50">
              {insights || "Click refresh to start analyzing your current customer data."}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-orange-50 flex gap-4 items-start">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl">
            <TrendingUp size={24} />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-1">Growth Opportunity</h4>
            <p className="text-sm text-gray-500">Guests with 'Indian Spicy' preference tend to spend 15% more on appetizers. Consider a spicy tandoori special.</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-orange-50 flex gap-4 items-start">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <TrendingUp size={24} />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-1">Churn Prevention</h4>
            <p className="text-sm text-gray-500">4 regular guests haven't visited in over 30 days. Gemini recommends a 'We miss you' campaign with a Free Naan coupon.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsPanel;
