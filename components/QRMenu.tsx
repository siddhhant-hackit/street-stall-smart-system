
import React, { useState, useEffect } from 'react';
import { MenuItem, PaymentMethod, Order } from '../types';
import { ShoppingBasket, Plus, Minus, CreditCard, Banknote, Store, ChevronLeft, CheckCircle2, IndianRupee, Star, Flame, Award, Zap, RefreshCw, Clock, Coffee } from 'lucide-react';

interface Props {
  restaurantName: string;
  menu: MenuItem[];
  onPlaceOrder: (order: Order) => void;
  onClose: () => void;
  liveOrders: Order[]; // Passed from parent to track active order
}

const QRMenu: React.FC<Props> = ({ restaurantName, menu, onPlaceOrder, onClose, liveOrders }) => {
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Online');
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);

  // Find the current guest's active order in the global state
  const currentOrder = liveOrders.find(o => o.id === activeOrderId);

  // Simulation: Recognize guest
  const isRecognizedGuest = true; 
  const guestName = "Aarav";

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = menu.find(m => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const updateCart = (id: string, delta: number) => {
    setCart(prev => {
      const newQty = (prev[id] || 0) + delta;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQty };
    });
  };

  const handleCheckout = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    const order: Order = {
      id: newId,
      customerId: '1', 
      items: Object.entries(cart).map(([id, qty]) => ({ menuItemId: id, quantity: qty })),
      totalPrice,
      paymentMethod,
      timestamp: new Date().toLocaleTimeString(),
      status: 'Pending'
    };
    onPlaceOrder(order);
    setActiveOrderId(newId);
  };

  // Tracking View Component
  const OrderTracker = ({ order }: { order: Order }) => {
    const [timeLeft, setTimeLeft] = useState<string>('Calculated by AI...');

    useEffect(() => {
      if (!order.estimatedReadyAt) return;
      const interval = setInterval(() => {
        const diff = order.estimatedReadyAt! - Date.now();
        if (diff <= 0) {
          setTimeLeft('Ready momentarily!');
        } else {
          const mins = Math.floor(diff / 60000);
          const secs = Math.floor((diff % 60000) / 1000);
          setTimeLeft(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
        }
      }, 1000);
      return () => clearInterval(interval);
    }, [order.estimatedReadyAt]);

    const getStatusStep = () => {
      if (order.status === 'Pending') return 1;
      if (order.status === 'Preparing') return 2;
      if (order.status === 'Completed') return 3;
      return 1;
    };

    return (
      <div className="fixed inset-0 bg-[#fffcf8] z-[100] flex flex-col overflow-y-auto">
        <header className="bg-white/90 backdrop-blur-xl px-8 py-6 border-b border-orange-100 sticky top-0 z-10 shadow-lg flex justify-between items-center">
          <h2 className="text-xl font-black uppercase tracking-tight text-gray-900">Live Tracker</h2>
          <div className="flex items-center gap-2 bg-orange-600 px-3 py-1 rounded-full text-[8px] font-black text-white uppercase tracking-[0.2em] shadow-md animate-pulse">
            <Zap size={10} className="fill-current" /> Neural Feed
          </div>
        </header>

        <div className="p-8 space-y-8 flex-1">
          {/* Hero Tracker Card */}
          <div className="bg-neutral-900 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10 space-y-6">
               <div className="flex justify-center">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                      <circle 
                        cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" 
                        strokeDasharray={440} 
                        strokeDashoffset={440 - (440 * (order.prepProgress || 0)) / 100}
                        strokeLinecap="round" 
                        className="text-orange-500 transition-all duration-1000 ease-linear" 
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                       {order.status === 'Completed' ? (
                         <CheckCircle2 size={48} className="text-green-500 animate-bounce" />
                       ) : (
                         <>
                           <span className="text-3xl font-black tabular-nums">{order.prepProgress || 0}%</span>
                           <span className="text-[8px] font-black uppercase tracking-widest text-orange-400">Fused</span>
                         </>
                       )}
                    </div>
                  </div>
               </div>

               <div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">
                    {order.status === 'Pending' && 'Queued for Prep'}
                    {order.status === 'Preparing' && 'In Neural Lab'}
                    {order.status === 'Completed' && 'Protocol Complete'}
                  </h3>
                  <p className="text-xs text-orange-100/60 font-medium mt-1">
                    {order.status === 'Pending' && 'Waiting for chef to accept transmission.'}
                    {order.status === 'Preparing' && 'Hand-crafting your street selections.'}
                    {order.status === 'Completed' && 'Your order is hot and ready at the stall!'}
                  </p>
               </div>

               {order.status !== 'Completed' && (
                 <div className="bg-white/5 backdrop-blur-md rounded-3xl p-4 flex items-center justify-between border border-white/10">
                    <div className="flex items-center gap-3">
                       <Clock size={20} className="text-orange-500" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">Est. Arrival</span>
                    </div>
                    <span className="text-2xl font-black text-white tabular-nums">{timeLeft}</span>
                 </div>
               )}
            </div>
          </div>

          {/* Steps */}
          <div className="px-4">
             <div className="flex justify-between relative">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-orange-100 -translate-y-1/2 z-0"></div>
                {[
                  { step: 1, label: 'Linked', icon: <Zap size={14}/> },
                  { step: 2, label: 'Firing', icon: <Flame size={14}/> },
                  { step: 3, label: 'Ready', icon: <Coffee size={14}/> }
                ].map(s => (
                  <div key={s.step} className="relative z-10 flex flex-col items-center gap-2">
                     <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                       getStatusStep() >= s.step ? 'bg-orange-600 text-white shadow-lg' : 'bg-white text-gray-300 border border-orange-100'
                     }`}>
                        {s.icon}
                     </div>
                     <span className={`text-[9px] font-black uppercase tracking-widest ${getStatusStep() >= s.step ? 'text-orange-950' : 'text-gray-300'}`}>{s.label}</span>
                  </div>
                ))}
             </div>
          </div>

          {/* Items Recap */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-orange-100 shadow-sm space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 border-b border-orange-50 pb-4">Order Transmission Details</h4>
            <div className="space-y-4">
               {order.items.map(oi => {
                 const m = menu.find(item => item.id === oi.menuItemId);
                 return (
                   <div key={oi.menuItemId} className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center font-black text-orange-600 border border-orange-100">
                           {oi.quantity}
                         </div>
                         <div>
                            <span className="block font-black text-gray-800 text-sm leading-none">{m?.name}</span>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Prep: {m?.prepTimeMinutes}m</span>
                         </div>
                      </div>
                      <span className="text-xs font-black text-orange-600 flex items-center tabular-nums">
                        <IndianRupee size={12} /> {(m?.price || 0) * oi.quantity}
                      </span>
                   </div>
                 );
               })}
            </div>
            <div className="pt-4 border-t border-orange-50 flex justify-between items-center">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Network Total</span>
               <span className="text-xl font-black text-gray-900 flex items-center tabular-nums"><IndianRupee size={18}/>{order.totalPrice}</span>
            </div>
          </div>
        </div>

        <div className="p-8">
           <button 
            onClick={onClose}
            className="w-full py-5 bg-gray-900 text-white rounded-[2rem] font-black text-lg shadow-xl shadow-orange-900/10 active:scale-95 transition-all"
           >
            Back to Hub
           </button>
        </div>
      </div>
    );
  };

  if (activeOrderId && currentOrder) {
    return <OrderTracker order={currentOrder} />;
  }

  const categories = Array.from(new Set(menu.map(m => m.category)));
  const isSingleItem = menu.length === 1;

  return (
    <div className="fixed inset-0 bg-[#fffcf8] z-[100] flex flex-col overflow-hidden">
      {/* Sci-Fi Dynamic Header */}
      <header className="bg-white/90 backdrop-blur-xl px-8 py-6 border-b border-orange-100 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center justify-between">
          <button onClick={onClose} className="p-3 -ml-3 text-orange-600 hover:bg-orange-50 rounded-2xl transition-colors"><ChevronLeft size={28} /></button>
          <div className="text-center">
            {isRecognizedGuest ? (
              <div className="animate-in fade-in slide-in-from-top-2">
                <div className="inline-flex items-center gap-1.5 bg-orange-600 px-3 py-1 rounded-full text-[8px] font-black text-white uppercase tracking-[0.3em] mb-1 shadow-md">
                   <Zap size={10} className="fill-current" /> Sync Active
                </div>
                <h1 className="text-2xl font-serif font-bold text-gray-900 leading-tight">Namaste, {guestName}!</h1>
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-serif font-bold text-gray-900 leading-tight">{restaurantName}</h1>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Street Smart Node</p>
              </div>
            )}
          </div>
          <div className="relative p-3">
            <ShoppingBasket size={28} className="text-orange-600" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                {totalItems}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Grid Pattern Background */}
      <div className="flex-1 overflow-y-auto p-8 space-y-10 pb-40 relative">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ea580c 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        {/* Pulse Banner */}
        {!isSingleItem && (
          <div className="bg-neutral-900 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-r from-orange-600/30 to-transparent"></div>
             <div className="relative z-10">
               <div className="flex items-center gap-2 mb-4">
                 <Zap size={16} className="text-orange-500 fill-current animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Street Signal Strength: High</span>
               </div>
               <h3 className="text-3xl font-black leading-tight mb-3 tracking-tight">Today's Hyper-Hits</h3>
               <p className="text-xs font-bold text-orange-100 opacity-60 leading-relaxed max-w-xs">Data predicts high satisfaction for Vada Pav and Lassi pairings. Join the trend?</p>
             </div>
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <Flame size={120} />
             </div>
          </div>
        )}

        {menu.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 font-bold uppercase tracking-widest text-xs space-y-3 w-full">
            <RefreshCw className="animate-spin text-orange-600" />
            <p>Syncing Menu with Core...</p>
          </div>
        ) : (
          categories.map(category => {
            const filteredItems = menu.filter(m => m.category === category);
            return (
              <section key={category}>
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight flex-shrink-0">
                    {category}
                  </h3>
                  <div className="h-[1px] bg-orange-100 w-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredItems.map(item => (
                    <div key={item.id} className="bg-white rounded-[3rem] shadow-sm border border-orange-50/50 overflow-hidden relative group transition-all hover:shadow-xl hover:-translate-y-1">
                      {/* Interactive Badges */}
                      {(item.name === 'Vada Pav' || item.name === 'Chole Bhature') && (
                        <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                          <div className="bg-orange-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl border border-white/20">
                            <Zap size={10} className="fill-current" /> High Energy
                          </div>
                          {isRecognizedGuest && item.name === 'Vada Pav' && (
                            <div className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl animate-pulse">
                              <Star size={10} className="fill-current text-orange-500" /> Personal Target
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="relative overflow-hidden h-60">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md px-5 py-2 rounded-2xl text-orange-600 font-black text-xl shadow-xl flex items-center gap-1.5 border border-orange-50">
                          <IndianRupee size={16} />{item.price}
                        </div>
                      </div>
                      <div className="p-8 space-y-6">
                        <div>
                          <h4 className="font-black text-gray-900 text-2xl leading-none tracking-tight">{item.name}</h4>
                          <p className="text-sm text-gray-500 leading-relaxed mt-3 font-medium opacity-80">{item.description}</p>
                        </div>
                        <div className="flex justify-center items-center pt-2">
                          <div className="flex items-center gap-6 bg-orange-50/50 rounded-[1.5rem] p-2 w-full justify-between px-6 border border-orange-100 shadow-inner">
                            <button 
                              onClick={() => updateCart(item.id, -1)}
                              className="w-12 h-12 rounded-2xl bg-white border-2 border-orange-100 flex items-center justify-center text-orange-600 shadow-sm active:bg-gray-100 transition-all hover:border-orange-300"
                            >
                              <Minus size={20} />
                            </button>
                            <span className="text-2xl font-black text-orange-950 w-8 text-center tabular-nums">{cart[item.id] || 0}</span>
                            <button 
                              onClick={() => updateCart(item.id, 1)}
                              className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-200 active:scale-90 hover:bg-orange-700 transition-all"
                            >
                              <Plus size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })
        )}
      </div>

      {/* Signal Transmission Section (Checkout) */}
      {totalItems > 0 && (
        <div className="bg-white border-t-2 border-orange-600 p-8 shadow-2xl space-y-6 rounded-t-[4rem] animate-in slide-in-from-bottom-full duration-700 z-20">
          <div className="flex justify-between items-center px-4">
            <div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1 block">Neural Total</span>
              <div className="text-4xl font-black text-gray-900 flex items-center tracking-tighter"><IndianRupee size={28} className="text-orange-600" />{totalPrice}</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-1 block">Payload</span>
              <div className="text-xl font-black text-gray-700">{totalItems} Quantum Units</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { id: 'Online', label: 'Signal/UPI', icon: <Zap size={20} /> },
              { id: 'Money', label: 'Physical', icon: <Banknote size={20} /> },
              { id: 'Offline', label: 'Counter', icon: <Store size={20} /> }
            ].map(method => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                className={`flex flex-col items-center justify-center gap-2 p-5 rounded-[2rem] border-2 transition-all group ${
                  paymentMethod === method.id 
                    ? 'border-orange-600 bg-orange-50 text-orange-700 shadow-inner' 
                    : 'border-orange-50 text-gray-400 hover:bg-orange-50/50'
                }`}
              >
                <div className={`${paymentMethod === method.id ? 'text-orange-600' : 'text-gray-300 group-hover:text-orange-300'} transition-colors`}>
                  {method.icon}
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest">{method.label}</span>
              </button>
            ))}
          </div>

          <button 
            onClick={handleCheckout}
            className="w-full py-6 bg-orange-600 text-white rounded-[2.5rem] font-black text-xl shadow-2xl shadow-orange-900/20 flex items-center justify-center gap-4 transition-all active:scale-95 hover:bg-orange-700 border-b-4 border-orange-800"
          >
            Transmit Order Node
          </button>
        </div>
      )}
    </div>
  );
};

export default QRMenu;
