
import React, { useState } from 'react';
import { Customer } from '../types';
import { getAIGeneratedCampaign } from '../services/geminiService';
import { Sparkles, Send, Copy, RefreshCw, Mail, MessageSquare } from 'lucide-react';

interface Props {
  customers: Customer[];
}

const MarketingCenter: React.FC<Props> = ({ customers }) => {
  const [topic, setTopic] = useState('Diwali Special Offer');
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]?.id || '');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    const customer = customers.find(c => c.id === selectedCustomer);
    if (customer) {
      const result = await getAIGeneratedCampaign(topic, customer.name, customer.spicePreference);
      setGeneratedContent(result || '');
    }
    setIsLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Configuration Column */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-50">
          <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center">
            <Sparkles className="mr-2 text-orange-500" size={20} />
            Campaign Config
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Campaign Topic</label>
              <select 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option>Diwali Special Offer</option>
                <option>Weekend Brunch</option>
                <option>New Menu Launch</option>
                <option>Loyalty Reward</option>
                <option>Special Biryani Festival</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Target Persona</label>
              <select 
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.spicePreference})</option>
                ))}
              </select>
            </div>
            <button 
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-orange-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-700 transition-all disabled:opacity-50"
            >
              {isLoading ? <RefreshCw className="animate-spin" size={20} /> : <Sparkles size={20} />}
              Generate Draft
            </button>
          </div>
        </div>

        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
          <h4 className="font-bold text-orange-800 mb-2">Tips for success</h4>
          <ul className="text-sm text-orange-700 space-y-2 list-disc list-inside">
            <li>Personalized messages get 20% more clicks</li>
            <li>Use cultural references for festive seasons</li>
            <li>Highlight spice preferences in the subject line</li>
          </ul>
        </div>
      </div>

      {/* Preview Column */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-50 min-h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-serif font-bold text-gray-800">Content Preview</h3>
            <div className="flex gap-2">
              <button className="p-2 text-gray-400 hover:text-orange-600"><Copy size={20} /></button>
              <button className="p-2 text-gray-400 hover:text-orange-600"><Mail size={20} /></button>
            </div>
          </div>

          <div className="flex-1 bg-orange-50/30 rounded-xl p-6 border border-dashed border-orange-200 text-gray-700 whitespace-pre-wrap font-medium leading-relaxed">
            {generatedContent || "Configure your campaign on the left and click 'Generate Draft' to let AI craft the perfect invitation."}
          </div>

          {generatedContent && (
            <div className="mt-6 flex gap-4">
              <button className="flex-1 py-3 px-4 bg-orange-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-700 shadow-md">
                <Send size={18} /> Send as Email
              </button>
              <button className="flex-1 py-3 px-4 bg-white border border-orange-200 text-orange-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-50 transition-colors">
                <MessageSquare size={18} /> Send SMS
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketingCenter;
