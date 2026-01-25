
import React from 'react';
import { Save, Terminal, Info, Layout, QrCode } from 'lucide-react';

interface Props {
  restaurantName: string;
  setRestaurantName: (name: string) => void;
}

const Settings: React.FC<Props> = ({ restaurantName, setRestaurantName }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-500">
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-orange-50 space-y-10">
        <div className="flex items-center gap-4 border-b border-orange-50 pb-8">
           <div className="p-4 bg-orange-600 text-white rounded-[1.5rem] shadow-lg shadow-orange-200">
              <Terminal size={32} />
           </div>
           <div>
              <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">System Core Config</h3>
              <p className="text-sm text-gray-500 font-medium">Calibrate your stall's digital signature and protocols.</p>
           </div>
        </div>

        <div className="space-y-8">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Node Identity</h4>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-black text-gray-800 uppercase tracking-tight ml-1">Restaurant Name</label>
              <div className="relative">
                <input 
                  type="text"
                  className="w-full px-6 py-4 bg-orange-50/30 border-2 border-orange-100 focus:border-orange-500 focus:ring-0 outline-none rounded-2xl font-bold transition-all"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  placeholder="e.g. Saffron Street"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-white border border-orange-100 rounded-lg text-[8px] font-black uppercase tracking-tighter text-orange-600">
                  Global ID
                </div>
              </div>
              <p className="text-[10px] text-gray-400 font-bold mt-2 ml-1">This will update your dashboard, signal poster, and neural customer interface.</p>
            </div>
          </section>

          <section className="pt-8 border-t border-orange-50">
             <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">UI Protocols</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="p-6 rounded-[2rem] border-2 border-orange-500 bg-orange-50/30 flex items-center gap-4 cursor-pointer hover:scale-[1.02] transition-transform">
                  <div className="p-3 bg-white rounded-xl shadow-sm"><Layout size={20} className="text-orange-600" /></div>
                  <div>
                    <span className="block text-xs font-black uppercase text-orange-950">Sci-Fi Hybrid</span>
                    <span className="text-[10px] text-orange-700 font-bold opacity-60">Active Profile</span>
                  </div>
               </div>
               <div className="p-6 rounded-[2rem] border-2 border-transparent bg-gray-50 flex items-center gap-4 opacity-40 cursor-not-allowed">
                  <div className="p-3 bg-white rounded-xl shadow-sm"><Info size={20} className="text-gray-400" /></div>
                  <div>
                    <span className="block text-xs font-black uppercase text-gray-900">Classic Warm</span>
                    <span className="text-[10px] text-gray-500 font-bold opacity-60">Coming Soon</span>
                  </div>
               </div>
            </div>
          </section>

          <div className="pt-10">
             <button className="w-full py-5 bg-orange-600 text-white rounded-[2rem] font-black text-lg shadow-xl shadow-orange-200 hover:bg-orange-700 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
               <Save size={24} /> Commit Changes
             </button>
          </div>
        </div>
      </div>

      <div className="bg-orange-900 p-8 rounded-[3rem] text-orange-100 flex items-center gap-6 shadow-2xl">
         <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 animate-pulse">
            <QrCode size={32} />
         </div>
         <div>
            <h4 className="text-lg font-black uppercase tracking-tight leading-none mb-1">Street Smart Tip</h4>
            <p className="text-sm opacity-70 font-medium">The 'Sci-Fi Hybrid' interface uses neural cues to increase order frequency by 14%. Keep it active during peak stall hours.</p>
         </div>
      </div>
    </div>
  );
};

export default Settings;
