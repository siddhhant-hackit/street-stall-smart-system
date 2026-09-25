import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Customer, Reservation, Order, MenuItem, ViewState } from '../types';
import { 
  Users, 
  Calendar, 
  IndianRupee, 
  Star, 
  TrendingUp, 
  Utensils, 
  QrCode, 
  Flame, 
  Clock, 
  Plus, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  ShoppingBag,
  BellRing
} from 'lucide-react';

interface Props {
  restaurantName: string;
  customers: Customer[];
  reservations: Reservation[];
  orders: Order[];
  menu: MenuItem[];
  onNavigate: (view: ViewState) => void;
}

const Dashboard: React.FC<Props> = ({ 
  restaurantName, 
  customers, 
  reservations, 
  orders, 
  menu, 
  onNavigate 
}) => {
  const totalSpend = customers.reduce((acc, curr) => acc + curr.totalSpend, 0);
  const totalVisits = customers.reduce((acc, curr) => acc + curr.visitCount, 0);
  const avgOrderValue = totalVisits > 0 ? Math.round(totalSpend / totalVisits) : 850;
  
  const pendingReservations = reservations.filter(r => r.status === 'Pending').length;
  const activePreparingOrders = orders.filter(o => o.status === 'Preparing').length;
  const activePendingOrders = orders.filter(o => o.status === 'Pending').length;

  const weeklySalesData = [
    { day: 'Mon', revenue: 58000, covers: 112 },
    { day: 'Tue', revenue: 64000, covers: 128 },
    { day: 'Wed', revenue: 61000, covers: 119 },
    { day: 'Thu', revenue: 78000, covers: 145 },
    { day: 'Fri', revenue: 112000, covers: 210 },
    { day: 'Sat', revenue: 148000, covers: 280 },
    { day: 'Sun', revenue: 139000, covers: 265 },
  ];

  const stationLoad = [
    { station: 'Tandoor Oven', count: 7, load: 'High', color: 'text-amber-700 bg-amber-50' },
    { station: 'Curry & Gravy', count: 11, load: 'Peak', color: 'text-red-700 bg-red-50' },
    { station: 'Biryani & Rice', count: 5, load: 'Moderate', color: 'text-orange-700 bg-orange-50' },
    { station: 'Chaat & Starters', count: 4, load: 'Normal', color: 'text-emerald-700 bg-emerald-50' },
    { station: 'Beverages & Desserts', count: 6, load: 'Moderate', color: 'text-blue-700 bg-blue-50' },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner / Executive Overview */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white rounded-3xl p-8 lg:p-10 shadow-xl border border-stone-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-amber-400 to-transparent"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Restaurant Operations · Dinner Service
            </div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-stone-100 tracking-tight">
              Namaste, <span className="text-amber-400">{restaurantName}</span>
            </h1>
            <p className="text-stone-300 text-sm lg:text-base leading-relaxed">
              Kitchen is currently running at optimal pace. High demand observed for <strong className="text-amber-200">Royal Hyderabadi Biryani</strong> and <strong className="text-amber-200">Bukhara Dal Makhani</strong> with 18 covers seated across AC Dining and Courtyard.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => onNavigate('live-orders')}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold text-sm transition-all shadow-lg shadow-amber-950/30 flex items-center gap-2"
            >
              <Utensils size={18} />
              Open Live KDS ({activePreparingOrders + activePendingOrders})
            </button>
            <button 
              onClick={() => onNavigate('reservations')}
              className="px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-100 font-semibold text-sm border border-stone-700 transition-all flex items-center gap-2"
            >
              <Calendar size={18} />
              Table Bookings ({reservations.length})
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm transition-hover hover:border-amber-300">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium uppercase tracking-wider">
            <span>Today's Takings</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
              <IndianRupee size={16} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold font-mono text-stone-900 tabular-nums">
              ₹{(totalSpend / 30).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </div>
            <div className="mt-1 flex items-center text-xs text-emerald-600 font-medium">
              <TrendingUp size={13} className="mr-1" /> +14.2% vs last Thursday
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm transition-hover hover:border-amber-300">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium uppercase tracking-wider">
            <span>Registered Patrons</span>
            <div className="p-2 rounded-lg bg-orange-50 text-orange-700">
              <Users size={16} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold font-mono text-stone-900 tabular-nums">
              {customers.length} Guests
            </div>
            <div className="mt-1 text-xs text-stone-500">
              {customers.filter(c => c.tier === 'Maharaja VIP').length} Maharaja VIP · {customers.filter(c => c.tier === 'Gold').length} Gold
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm transition-hover hover:border-amber-300">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium uppercase tracking-wider">
            <span>Average Order Value</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <ShoppingBag size={16} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold font-mono text-stone-900 tabular-nums">
              ₹{avgOrderValue.toLocaleString('en-IN')}
            </div>
            <div className="mt-1 text-xs text-stone-500">
              ₹380 avg per cover on dine-in
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm transition-hover hover:border-amber-300">
          <div className="flex items-center justify-between text-stone-500 text-xs font-medium uppercase tracking-wider">
            <span>Table Reservations</span>
            <div className="p-2 rounded-lg bg-rose-50 text-rose-700">
              <Calendar size={16} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl lg:text-3xl font-bold font-mono text-stone-900 tabular-nums">
              {reservations.length} Booked
            </div>
            <div className="mt-1 text-xs text-amber-700 font-medium">
              {pendingReservations > 0 ? `${pendingReservations} pending confirmation` : 'All tables confirmed'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Revenue Trend & Kitchen Stations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Performance Chart */}
        <div className="lg:col-span-2 bg-white p-6 lg:p-7 rounded-2xl border border-stone-200/80 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <TrendingUp size={20} className="text-amber-600" />
                Weekly Sales & Table Volume
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">Track revenue and dinner seatings across the week</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-600">
              <span className="inline-block w-3 h-3 rounded bg-amber-600"></span>
              Gross Revenue (₹)
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklySalesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d97706" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#78716c', fontSize: 12, fontWeight: 500 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#78716c', fontSize: 12 }} 
                  tickFormatter={(val) => `₹${val / 1000}k`}
                />
                <Tooltip 
                  formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Revenue']}
                  contentStyle={{ 
                    backgroundColor: '#1c1917', 
                    borderColor: '#292524', 
                    borderRadius: '12px',
                    color: '#fafaf9',
                    fontSize: '12px'
                  }}
                  itemStyle={{ color: '#fbbf24' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#d97706" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#revenueGrad)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Kitchen Station Load */}
        <div className="bg-white p-6 lg:p-7 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <Flame size={20} className="text-amber-600" />
                Kitchen Station Load
              </h2>
              <span className="text-xs font-semibold text-stone-500 uppercase">Real-Time</span>
            </div>
            <p className="text-xs text-stone-500 mb-5 leading-relaxed">
              Active ticket routing across Tandoor, Curry gravies, Biryani dum, and Chaat stations.
            </p>

            <div className="space-y-3">
              {stationLoad.map(item => (
                <div key={item.station} className="p-3.5 rounded-xl border border-stone-100 flex items-center justify-between hover:bg-stone-50/50 transition-colors">
                  <div className="space-y-0.5">
                    <span className="text-sm font-semibold text-stone-800">{item.station}</span>
                    <div className="text-xs text-stone-500">{item.count} items in preparation queue</div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${item.color}`}>
                    {item.load}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 flex gap-2">
            <button 
              onClick={() => onNavigate('live-orders')}
              className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              Open Kitchen Display (KDS)
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Today's Reservations & Menu Top Sellers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Table Reservations */}
        <div className="bg-white p-6 lg:p-7 rounded-2xl border border-stone-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <Calendar size={18} className="text-amber-600" />
                Dinner Bookings Tonight
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">Arrivals, VIP party assignments, and dietary notes</p>
            </div>
            <button 
              onClick={() => onNavigate('reservations')}
              className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
            >
              View All ({reservations.length})
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {reservations.slice(0, 3).map(res => (
              <div key={res.id} className="p-4 rounded-xl border border-stone-100 hover:border-amber-200 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-stone-900">{res.customerName}</span>
                    <span className="text-xs text-stone-500 font-medium">· {res.guests} Guests</span>
                    <span className="text-xs text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-medium">{res.occasion}</span>
                  </div>
                  <div className="text-xs text-stone-500 flex items-center gap-2">
                    <Clock size={12} className="text-stone-400" />
                    <span>{res.time}</span>
                    <span>·</span>
                    <span className="font-semibold text-stone-700">{res.tableNumber}</span>
                    <span>({res.tableArea})</span>
                  </div>
                  {res.notes && (
                    <p className="text-xs text-stone-600 italic bg-stone-50 p-1.5 rounded border border-stone-100 line-clamp-1">
                      "{res.notes}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                    res.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700' :
                    res.status === 'Seated' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {res.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured / High Margin Dishes */}
        <div className="bg-white p-6 lg:p-7 rounded-2xl border border-stone-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <Sparkles size={18} className="text-amber-600" />
                Featured Menu Classics
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">High margin and fast-moving dishes across stations</p>
            </div>
            <button 
              onClick={() => onNavigate('menu-manager')}
              className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
            >
              Manage Menu ({menu.length})
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {menu.filter(m => m.isBestSeller).slice(0, 4).map(item => (
              <div key={item.id} className="p-3 rounded-xl border border-stone-100 flex items-center justify-between gap-3 hover:bg-stone-50/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 leading-tight">{item.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                      <span>{item.category}</span>
                      <span>·</span>
                      <span className={item.isVeg ? 'text-emerald-700 font-semibold' : 'text-rose-700 font-semibold'}>
                        {item.isVeg ? 'Veg' : 'Non-Veg'}
                      </span>
                      <span>·</span>
                      <span>{item.prepTimeMinutes}m prep</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-bold font-mono text-stone-900 tabular-nums">
                    ₹{item.price}
                  </span>
                  <div className="text-[11px] text-amber-700 font-medium">Bestseller</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
