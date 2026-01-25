
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  Calendar, 
  LayoutDashboard, 
  Megaphone, 
  Sparkles, 
  LogOut, 
  Award,
  Utensils,
  Smartphone,
  ClipboardList,
  QrCode,
  ListTodo,
  Settings as SettingsIcon,
  HelpCircle
} from 'lucide-react';
import { ViewState, Customer, Reservation, Order, MenuItem } from './types';
import { INITIAL_CUSTOMERS, INITIAL_RESERVATIONS, STREET_STALL_MENU } from './constants';
import Dashboard from './components/Dashboard';
import CustomerManagement from './components/CustomerManagement';
import ReservationManagement from './components/ReservationManagement';
import MarketingCenter from './components/MarketingCenter';
import AIInsightsPanel from './components/AIInsightsPanel';
import LiveOrders from './components/LiveOrders';
import QRMenu from './components/QRMenu';
import MenuManager from './components/MenuManager';
import QRGenerator from './components/QRGenerator';
import StreetSmartAI from './components/StreetSmartAI';
import Settings from './components/Settings';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>('dashboard');
  const [restaurantName, setRestaurantName] = useState('Street Stall');
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [liveOrders, setLiveOrders] = useState<Order[]>([]);
  const [menu, setMenu] = useState<MenuItem[]>(STREET_STALL_MENU);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Dynamic Background Pulse Logic
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const atmosphere = useMemo(() => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 10) return {
      name: 'MORNING_SAFFRON',
      bg: '#fff9f2',
      accent1: 'rgba(255, 165, 0, 0.08)',
      accent2: 'rgba(255, 99, 71, 0.05)',
      label: 'Saffron Dawn'
    };
    if (hour >= 10 && hour < 16) return {
      name: 'MIDDAY_SOLAR',
      bg: '#f8fbff',
      accent1: 'rgba(56, 189, 248, 0.06)',
      accent2: 'rgba(234, 88, 12, 0.04)',
      label: 'Solar Peak'
    };
    if (hour >= 16 && hour < 20) return {
      name: 'EVENING_AMBER',
      bg: '#fff7ed',
      accent1: 'rgba(251, 146, 60, 0.08)',
      accent2: 'rgba(244, 63, 94, 0.06)',
      label: 'Amber Dusk'
    };
    return {
      name: 'NIGHT_NEON',
      bg: '#fcfcfc', // Keeping it light for readability, but shifting accents
      accent1: 'rgba(124, 58, 237, 0.06)',
      accent2: 'rgba(234, 88, 12, 0.08)',
      label: 'Neon Night'
    };
  }, [currentTime]);

  // Simulation: Auto-increment prep progress for active orders
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveOrders(currentOrders => 
        currentOrders.map(order => {
          if (order.status === 'Preparing') {
            const newProgress = Math.min((order.prepProgress || 0) + 1, 99);
            return { ...order, prepProgress: newProgress };
          }
          return order;
        })
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNewOrder = (order: Order) => {
    setLiveOrders(prev => [order, ...prev]);
  };

  const handleUpdateOrders = (updatedOrders: Order[]) => {
    setLiveOrders(updatedOrders);
  };

  const NavItem: React.FC<{ view: ViewState; icon: React.ReactNode; label: string; customColor?: string }> = ({ view, icon, label, customColor }) => (
    <button
      onClick={() => setActiveView(view)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
        activeView === view 
          ? 'bg-orange-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.4)] translate-x-1' 
          : `${customColor || 'text-gray-500'} hover:bg-orange-50 hover:text-orange-700`
      }`}
    >
      <div className={`${activeView === view ? 'text-white' : 'text-gray-400 group-hover:text-orange-600'} transition-colors`}>
        {icon}
      </div>
      <span className="font-bold tracking-tight text-sm">{label}</span>
    </button>
  );

  if (activeView === 'qr-menu') {
    return (
      <QRMenu 
        restaurantName={restaurantName} 
        menu={menu} 
        onPlaceOrder={handleNewOrder} 
        onClose={() => setActiveView('dashboard')} 
        liveOrders={liveOrders}
      />
    );
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard restaurantName={restaurantName} customers={customers} reservations={reservations} onNavigate={setActiveView} />;
      case 'customers':
        return <CustomerManagement customers={customers} onUpdate={setCustomers} />;
      case 'reservations':
        return <ReservationManagement reservations={reservations} onUpdate={setReservations} customers={customers} />;
      case 'marketing':
        return <MarketingCenter customers={customers} />;
      case 'insights':
        return <AIInsightsPanel customers={customers} />;
      case 'live-orders':
        return <LiveOrders orders={liveOrders} onUpdate={handleUpdateOrders} menu={menu} customers={customers} />;
      case 'menu-manager':
        return <MenuManager menu={menu} onUpdate={setMenu} onNavigate={setActiveView} />;
      case 'qr-generator':
        return <QRGenerator restaurantName={restaurantName} onOpenPreview={() => setActiveView('qr-menu')} />;
      case 'settings':
        return <Settings restaurantName={restaurantName} setRestaurantName={setRestaurantName} />;
      default:
        return <Dashboard restaurantName={restaurantName} customers={customers} reservations={reservations} onNavigate={setActiveView} />;
    }
  };

  return (
    <div 
      className="flex h-screen transition-colors duration-1000 ease-in-out text-gray-900 selection:bg-orange-100 selection:text-orange-900"
      style={{ backgroundColor: atmosphere.bg }}
    >
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-orange-100 flex flex-col h-full sticky top-0 shadow-xl shadow-orange-900/5 z-20">
        <div className="p-8 border-b border-orange-50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-orange-50 rounded-full blur-2xl opacity-50 group-hover:bg-orange-100 transition-colors"></div>
          <div className="flex items-center space-x-3 relative z-10">
            <div className="bg-orange-600 p-2.5 rounded-2xl text-white shadow-lg shadow-orange-200">
              <Utensils size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black font-serif text-gray-900 tracking-tight leading-none">
                {restaurantName.split(' ')[0]}<span className="text-orange-600">{restaurantName.split(' ')[1] || ''}</span>
              </h1>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-[10px] text-orange-400 font-black tracking-widest uppercase">Street Smart</p>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto no-scrollbar">
          <p className="px-4 py-2 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Core Hub</p>
          <NavItem view="dashboard" icon={<LayoutDashboard size={20} />} label="Intelligence" />
          <NavItem view="customers" icon={<Users size={20} />} label="Guest Book" />
          <NavItem view="reservations" icon={<Calendar size={20} />} label="Bookings" />
          <NavItem view="menu-manager" icon={<ListTodo size={20} />} label="Menu Matrix" />
          
          <p className="px-4 py-2 mt-6 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Live Stall</p>
          <NavItem view="live-orders" icon={<ClipboardList size={20} />} label="Comms Center" />
          <NavItem view="qr-generator" icon={<QrCode size={20} />} label="Signal (QR)" />
          
          <p className="px-4 py-2 mt-6 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Ops</p>
          <NavItem view="marketing" icon={<Megaphone size={20} />} label="Transmissions" />
          <NavItem view="insights" icon={<Sparkles size={20} />} label="Neural Sync" />
          <NavItem view="settings" icon={<SettingsIcon size={20} />} label="System Config" />
        </nav>

        <div className="p-6 border-t border-orange-50 space-y-3">
          <button 
            onClick={() => setIsAIChatOpen(true)}
            className="flex items-center gap-3 text-orange-600 bg-orange-50 hover:bg-orange-100 transition-all w-full px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider shadow-sm"
          >
            <div className="relative">
              <HelpCircle size={18} />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-orange-50 animate-bounce"></div>
            </div>
            <span>Help Interface</span>
          </button>
          <button className="flex items-center space-x-3 text-gray-400 hover:text-red-500 transition-colors w-full px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider">
            <LogOut size={18} />
            <span>Power Off</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto relative">
        {/* Futuristic Background Accents - Dynamic Colors */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.2] overflow-hidden">
          <div 
            className="absolute top-[10%] right-[15%] w-[600px] h-[600px] rounded-full blur-[140px] transition-colors duration-1000"
            style={{ backgroundColor: atmosphere.accent1 }}
          ></div>
          <div 
            className="absolute bottom-[15%] left-[10%] w-[500px] h-[500px] rounded-full blur-[140px] transition-colors duration-1000"
            style={{ backgroundColor: atmosphere.accent2 }}
          ></div>
        </div>

        <header className="bg-white/70 backdrop-blur-xl sticky top-0 z-10 px-10 py-6 border-b border-orange-100/50 flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight leading-none">
              {activeView.replace('-', ' ')}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
              <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Atmosphere: {atmosphere.label}</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex flex-col items-end">
               <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Operator Status</span>
               <span className="text-xs font-bold text-gray-500">Online & Encrypted</span>
            </div>
            <div className="h-10 w-[1px] bg-orange-100"></div>
            <div className="bg-orange-600/5 text-orange-700 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-orange-100/50 shadow-sm">
              <Award size={16} /> Elite Protocol
            </div>
            <div className="relative group cursor-pointer">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=StreetStall" 
                alt="Profile" 
                className="w-12 h-12 rounded-[1.25rem] ring-4 ring-orange-50 group-hover:ring-orange-100 transition-all bg-orange-100 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-white"></div>
            </div>
          </div>
        </header>

        <div className="p-10 relative z-0">
          {renderContent()}
        </div>
      </main>

      {/* Persistent AI Assistant */}
      <StreetSmartAI restaurantName={restaurantName} isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
    </div>
  );
};

export default App;
