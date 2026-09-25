import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  LayoutDashboard, 
  Megaphone, 
  Sparkles, 
  Utensils, 
  ClipboardList, 
  QrCode, 
  ListTodo, 
  Settings as SettingsIcon,
  ChefHat,
  MessageSquare,
  Smartphone,
  Flame,
  Plus
} from 'lucide-react';
import { ViewState, Customer, Reservation, Order, MenuItem } from './types';
import { INITIAL_CUSTOMERS, INITIAL_RESERVATIONS, INITIAL_ORDERS, ALL_MENU_ITEMS } from './constants';
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
  const [restaurantName, setRestaurantName] = useState('MasalaCraft');
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [liveOrders, setLiveOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [menu, setMenu] = useState<MenuItem[]>(ALL_MENU_ITEMS);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // Auto-increment prep progress for active orders in kitchen
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveOrders(currentOrders => 
        currentOrders.map(order => {
          if (order.status === 'Preparing') {
            const nextProgress = Math.min((order.prepProgress || 0) + 2, 95);
            return { ...order, prepProgress: nextProgress };
          }
          return order;
        })
      );
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNewOrder = (order: Order) => {
    setLiveOrders(prev => [order, ...prev]);
  };

  const handleUpdateOrders = (updatedOrders: Order[]) => {
    setLiveOrders(updatedOrders);
  };

  const NavItem: React.FC<{ 
    view: ViewState; 
    icon: React.ReactNode; 
    label: string; 
    badgeCount?: number 
  }> = ({ view, icon, label, badgeCount }) => {
    const isActive = activeView === view;
    return (
      <button
        onClick={() => setActiveView(view)}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all text-xs font-semibold ${
          isActive 
            ? 'bg-amber-600 text-white shadow-sm' 
            : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className={isActive ? 'text-white' : 'text-stone-400'}>
            {icon}
          </div>
          <span>{label}</span>
        </div>
        {badgeCount !== undefined && badgeCount > 0 && (
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
            isActive ? 'bg-amber-700 text-amber-100' : 'bg-amber-100 text-amber-800'
          }`}>
            {badgeCount}
          </span>
        )}
      </button>
    );
  };

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
        return (
          <Dashboard 
            restaurantName={restaurantName} 
            customers={customers} 
            reservations={reservations} 
            orders={liveOrders}
            menu={menu}
            onNavigate={setActiveView} 
          />
        );
      case 'customers':
        return <CustomerManagement customers={customers} onUpdate={setCustomers} />;
      case 'reservations':
        return <ReservationManagement reservations={reservations} onUpdate={setReservations} customers={customers} />;
      case 'marketing':
        return <MarketingCenter customers={customers} />;
      case 'insights':
        return <AIInsightsPanel customers={customers} orders={liveOrders} restaurantName={restaurantName} />;
      case 'live-orders':
        return <LiveOrders orders={liveOrders} onUpdate={handleUpdateOrders} menu={menu} customers={customers} />;
      case 'menu-manager':
        return <MenuManager menu={menu} onUpdate={setMenu} onNavigate={setActiveView} />;
      case 'qr-generator':
        return <QRGenerator restaurantName={restaurantName} onOpenPreview={() => setActiveView('qr-menu')} />;
      case 'settings':
        return <Settings restaurantName={restaurantName} setRestaurantName={setRestaurantName} />;
      default:
        return (
          <Dashboard 
            restaurantName={restaurantName} 
            customers={customers} 
            reservations={reservations} 
            orders={liveOrders}
            menu={menu}
            onNavigate={setActiveView} 
          />
        );
    }
  };

  const pendingOrderCount = liveOrders.filter(o => o.status === 'Pending' || o.status === 'Preparing').length;
  const pendingReservationCount = reservations.filter(r => r.status === 'Pending').length;

  return (
    <div className="flex h-screen bg-[#faf7f2] text-stone-900 selection:bg-amber-200">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-stone-200 flex flex-col h-full sticky top-0 shrink-0 z-20">
        {/* Brand Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-amber-600 p-2 rounded-xl text-white shadow-sm">
              <Utensils size={18} />
            </div>
            <div>
              <span className="text-base font-serif font-bold text-stone-900 leading-tight block">
                {restaurantName}
              </span>
              <span className="text-[10px] text-amber-700 font-semibold tracking-wider uppercase">
                Restaurant CRM & KDS
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto no-scrollbar">
          <div className="px-3 py-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
            Overview
          </div>
          <NavItem view="dashboard" icon={<LayoutDashboard size={16} />} label="Executive Hub" />
          <NavItem 
            view="live-orders" 
            icon={<ClipboardList size={16} />} 
            label="Live Kitchen (KDS)" 
            badgeCount={pendingOrderCount} 
          />
          <NavItem 
            view="reservations" 
            icon={<Calendar size={16} />} 
            label="Table Bookings" 
            badgeCount={pendingReservationCount} 
          />

          <div className="px-3 pt-5 py-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
            Hospitality & Menu
          </div>
          <NavItem view="customers" icon={<Users size={16} />} label="Guest Directory" />
          <NavItem view="menu-manager" icon={<ListTodo size={16} />} label="Menu Matrix & 86" />
          <NavItem view="qr-generator" icon={<QrCode size={16} />} label="Table QR Standees" />

          <div className="px-3 pt-5 py-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
            Marketing & AI
          </div>
          <NavItem view="marketing" icon={<Megaphone size={16} />} label="WhatsApp Utsav" />
          <NavItem view="insights" icon={<Sparkles size={16} />} label="Saffron AI Insights" />
          <NavItem view="settings" icon={<SettingsIcon size={16} />} label="Legal & Billing Setup" />
        </nav>

        {/* Sidebar Footer: Quick Actions */}
        <div className="p-4 border-t border-stone-100 space-y-2 bg-stone-50/60">
          <button 
            onClick={() => setActiveView('qr-menu')}
            className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Smartphone size={14} className="text-amber-700" />
            Dine-In QR Menu Test
          </button>
          <button 
            onClick={() => setIsAIChatOpen(true)}
            className="w-full py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <ChefHat size={14} className="text-amber-400" />
            AI Operations Concierge
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Bar Contract (3 Zones) */}
        <header className="h-14 bg-white border-b border-stone-200 px-6 flex items-center justify-between shrink-0 z-10">
          {/* Zone 1: Single text element Brand wordmark */}
          <div className="font-serif font-bold text-base text-stone-900 tracking-tight">
            {restaurantName} <span className="text-xs font-sans font-normal text-stone-500">· Operations Portal</span>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-stone-600">
            <button 
              onClick={() => setActiveView('dashboard')}
              className={`hover:text-stone-900 transition-colors ${activeView === 'dashboard' ? 'text-amber-800 font-bold' : ''}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveView('live-orders')}
              className={`hover:text-stone-900 transition-colors ${activeView === 'live-orders' ? 'text-amber-800 font-bold' : ''}`}
            >
              Kitchen Orders ({liveOrders.filter(o => o.status !== 'Completed').length})
            </button>
            <button 
              onClick={() => setActiveView('reservations')}
              className={`hover:text-stone-900 transition-colors ${activeView === 'reservations' ? 'text-amber-800 font-bold' : ''}`}
            >
              Reservations ({reservations.length})
            </button>
            <button 
              onClick={() => setActiveView('marketing')}
              className={`hover:text-stone-900 transition-colors ${activeView === 'marketing' ? 'text-amber-800 font-bold' : ''}`}
            >
              WhatsApp Campaigns
            </button>
          </nav>

          {/* Zone 3: Primary Action buttons */}
          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => setActiveView('reservations')}
              className="px-3.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Plus size={14} /> New Booking
            </button>
            <button 
              onClick={() => setActiveView('qr-menu')}
              className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Smartphone size={14} /> Guest QR Menu
            </button>
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Floating AI Operations Concierge Modal */}
      <StreetSmartAI 
        restaurantName={restaurantName} 
        isOpen={isAIChatOpen} 
        onClose={() => setIsAIChatOpen(false)} 
      />
    </div>
  );
};

export default App;
