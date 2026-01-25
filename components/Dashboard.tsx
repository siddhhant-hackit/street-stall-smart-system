
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { Customer, Reservation } from '../types';
import { Users, Calendar, IndianRupee, Star, TrendingUp, Utensils, QrCode, Smartphone, Flame, Zap, Award, ShieldCheck } from 'lucide-react';

interface Props {
  restaurantName: string;
  customers: Customer[];
  reservations: Reservation[];
  onNavigate?: (view: any) => void;
}

const Dashboard: React.FC<Props> = ({ restaurantName, customers, reservations, onNavigate }) => {
  const totalSpend = customers.reduce((acc, curr) => acc + curr.totalSpend, 0);
  const avgLoyalty = Math.round(customers.reduce((acc, curr) => acc + curr.loyaltyPoints, 0) / (customers.length || 1));
  const pendingRes = reservations.filter(r => r.status === 'Pending').length;

  const revenueData = [
    { name: 'Mon', revenue: 45000 },
    { name: 'Tue', revenue: 52000 },
    { name: 'Wed', revenue: 48000 },
    { name: 'Thu', revenue: 61000 },
    { name: 'Fri', revenue: 95000 },
    { name: 'Sat', revenue: 120000 },
    { name: 'Sun', revenue: 110000 },
  ];

  const StatCard = ({ title, value, icon, trend }: any) => (
    <div className="bg-white p-7 rounded-[2rem] shadow-sm border border-orange-50/50 transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.15em] mb-2">{title}</p>
          <h3 className="text-3xl font-black text-gray-900 tracking-tight">{value}</h3>
          {trend && (
            <div className="flex items-center mt-3 text-emerald-600 text-[10px] font-black uppercase tracking-wider">
              <TrendingUp size={12} className="mr-1.5" />
              {trend}
            </div>
          )}
        </div>
        <div className={`p-4 rounded-2xl bg-orange-50 text-orange-600 shadow-inner group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-10 pb-20">
      {/* Street Smart Sci-Fi Hero */}
      <div className="relative bg-neutral-900 p-12 rounded-[3.5rem] text-white shadow-2xl shadow-orange-900/20 overflow-hidden group border border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent pointer-events-none"></div>
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="absolute -top-20 -right-20 p-20 opacity-[0.03] scale-150 rotate-12 transition-transform duration-1000 group-hover:rotate-45">
           <Zap size={320} />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-orange-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.25em] shadow-[0_0_20px_rgba(234,88,12,0.4)] animate-pulse">
              <Zap size={14} className="fill-current" /> Live Neural Pulse
            </div>
            <h2 className="text-5xl font-serif font-bold leading-[1.1] tracking-tight">
              {restaurantName} <br/> <span className="text-orange-500 italic">Synchronized.</span>
            </h2>
            <p className="text-orange-100/70 max-w-sm text-lg font-medium leading-relaxed">
              Street Smart protocols detected high demand for spicy variants. <br/>
              <span className="text-white font-bold underline decoration-orange-500 underline-offset-4">8 units moving/min.</span>
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => onNavigate?.('qr-generator')}
              className="bg-white text-gray-900 px-10 py-5 rounded-[2rem] font-black text-lg shadow-2xl hover:bg-orange-50 transition-all flex items-center justify-center gap-3 whitespace-nowrap active:scale-95 group"
            >
              <QrCode size={24} className="group-hover:rotate-12 transition-transform" /> Generate Signal
            </button>
            <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-400">
               <ShieldCheck size={14} /> Data Stream Secure
            </div>
          </div>
        </div>
      </div>

      {/* Real-time metrics grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Active Links" value={customers.length} icon={<Users size={22} />} trend="+12% retention" />
        <StatCard title="Neural Takings" value={`₹${(totalSpend / 30).toFixed(0)}`} icon={<IndianRupee size={22} />} trend="Peak sync active" />
        <StatCard title="Order Queue" value="4" icon={<Utensils size={22} />} trend="Avg 4.2m prep" />
        <StatCard title="Satisfaction" value="4.8" icon={<Star size={22} />} trend="Top 1% local" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Intelligence Chart */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-orange-50/50 relative">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-black text-gray-900 flex items-center gap-3 uppercase tracking-tight">
                <TrendingUp size={24} className="text-orange-500" />
                Network Flux
              </h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Weekly Transaction Volume</p>
            </div>
            <div className="flex gap-2">
               <div className="px-4 py-1.5 bg-orange-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-100">Live Telemetry</div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: '900'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: '900'}} />
                <Tooltip 
                  cursor={{ stroke: '#ea580c', strokeWidth: 2 }}
                  contentStyle={{borderRadius: '24px', border: 'none', padding: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)'}}
                />
                <Area type="monotone" dataKey="revenue" stroke="#ea580c" strokeWidth={5} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-orange-50/50 space-y-8 flex flex-col">
           <div className="flex items-center justify-between">
             <h3 className="text-xl font-black text-gray-900 flex items-center gap-3 uppercase tracking-tight">
              <Flame size={24} className="text-orange-600 animate-pulse" />
              Pulse
            </h3>
            <span className="w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
           </div>
          
          <div className="space-y-5 flex-1 overflow-y-auto no-scrollbar">
            <div className="group p-6 bg-orange-50/50 rounded-[2rem] border border-orange-100/50 flex items-center gap-5 hover:bg-orange-100 transition-colors cursor-pointer">
               <div className="w-14 h-14 bg-white rounded-2xl flex-shrink-0 flex items-center justify-center text-orange-600 shadow-sm border border-orange-100 group-hover:scale-110 transition-transform">
                  <Flame size={28} />
               </div>
               <div>
                  <h4 className="font-black text-orange-950 text-sm uppercase tracking-tight">Thermal Surge</h4>
                  <p className="text-[11px] text-orange-800 font-bold opacity-60 leading-tight mt-1">Samosas peaking. Increase heat levels on station A.</p>
               </div>
            </div>

            <div className="group p-6 bg-emerald-50/50 rounded-[2rem] border border-emerald-100/50 flex items-center gap-5 hover:bg-emerald-100 transition-colors cursor-pointer">
               <div className="w-14 h-14 bg-white rounded-2xl flex-shrink-0 flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100 group-hover:scale-110 transition-transform">
                  <Smartphone size={28} />
               </div>
               <div>
                  <h4 className="font-black text-emerald-950 text-sm uppercase tracking-tight">Link Detected</h4>
                  <p className="text-[11px] text-emerald-800 font-bold opacity-60 leading-tight mt-1">Aarav (Elite Class) just checked in. Prep "Special Extra".</p>
               </div>
            </div>

            <div className="group p-6 bg-blue-50/50 rounded-[2rem] border border-blue-100/50 flex items-center gap-5 hover:bg-blue-100 transition-colors cursor-pointer">
               <div className="w-14 h-14 bg-white rounded-2xl flex-shrink-0 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100 group-hover:scale-110 transition-transform">
                  <Zap size={28} />
               </div>
               <div>
                  <h4 className="font-black text-blue-950 text-sm uppercase tracking-tight">Market Flux</h4>
                  <p className="text-[11px] text-blue-800 font-bold opacity-60 leading-tight mt-1">Weekend rush protocol engaged. Menu auto-pivoted.</p>
               </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-orange-50">
             <button 
              onClick={() => onNavigate?.('insights')}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
             >
               View All Signals
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
