
import React from 'react';
import { Order, MenuItem, Customer } from '../types';
import { Clock, CheckCircle, ChefHat, IndianRupee, Star, Flame, Award, Coffee, Zap } from 'lucide-react';

interface Props {
  orders: Order[];
  onUpdate: (orders: Order[]) => void;
  menu: MenuItem[];
  customers: Customer[];
}

const LiveOrders: React.FC<Props> = ({ orders, onUpdate, menu, customers }) => {
  const updateOrderStatus = (id: string, status: Order['status']) => {
    onUpdate(orders.map(o => {
      if (o.id === id) {
        let updates: Partial<Order> = { status };
        
        // If starting prep, calculate total prep time based on longest item
        if (status === 'Preparing') {
          const maxPrepTime = o.items.reduce((max, item) => {
            const menuInfo = menu.find(m => m.id === item.menuItemId);
            return Math.max(max, menuInfo?.prepTimeMinutes || 10);
          }, 0);
          updates.estimatedReadyAt = Date.now() + (maxPrepTime * 60 * 1000);
          updates.prepProgress = 0;
        }
        
        if (status === 'Completed') {
          updates.prepProgress = 100;
        }

        return { ...o, ...updates };
      }
      return o;
    }));
  };

  const getGuestContext = (customerId?: string) => {
    if (!customerId) return null;
    return customers.find(c => c.id === customerId);
  };

  return (
    <div className="space-y-6">
      {orders.length === 0 ? (
        <div className="bg-white p-20 rounded-3xl text-center text-gray-400 border-2 border-dashed border-orange-100 flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-4 text-orange-600">
            <ChefHat size={40} />
          </div>
          <p className="text-xl font-bold text-gray-800">Ready for service!</p>
          <p className="text-sm max-w-xs mx-auto">New orders will appear here with "Street Smart" guest details.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map(order => {
            const guest = getGuestContext(order.customerId);
            
            return (
              <div key={order.id} className={`bg-white rounded-[2rem] shadow-sm border-2 overflow-hidden transition-all flex flex-col ${
                order.status === 'Pending' ? 'border-orange-500 ring-4 ring-orange-50 shadow-orange-100' :
                order.status === 'Preparing' ? 'border-blue-400' : 'border-green-100 opacity-80'
              }`}>
                {/* Header with Guest Recognition */}
                <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-start bg-gray-50/50">
                  <div>
                    <h4 className="font-black text-gray-800 text-lg uppercase tracking-tight">Order #{order.id.slice(-4)}</h4>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                      <Clock size={12} /> {order.timestamp}
                    </div>
                  </div>
                  {guest && (
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter">
                        <Award size={10} /> Loyal: {guest.visitCount} visits
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 mt-1">{guest.name}</span>
                    </div>
                  )}
                </div>

                {/* Smart Badge for Owner */}
                {guest && (
                  <div className="px-6 py-2 bg-orange-600/5 flex items-center gap-2 border-b border-orange-100">
                    <Star size={14} className="text-orange-500 fill-orange-500" />
                    <span className="text-[10px] font-bold text-orange-800 uppercase">
                      Street Smart Tip: {guest.spicePreference === 'Indian Spicy' ? 'Prefers extra spice!' : 'Loves mild flavors.'}
                      {guest.visitCount > 5 && " | Offer a loyalty Chai?"}
                    </span>
                  </div>
                )}

                <div className="p-6 space-y-3 flex-1">
                  {order.items.map(item => {
                    const menuInfo = menu.find(m => m.id === item.menuItemId);
                    return (
                      <div key={item.menuItemId} className="flex justify-between items-center bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center font-black text-sm">
                              {item.quantity}
                           </div>
                           <div>
                            <span className="font-bold text-gray-800">{menuInfo?.name || 'Deleted Item'}</span>
                            <div className="flex items-center gap-2 mt-0.5">
                              {menuInfo?.name === guest?.favoriteDish && (
                                <div className="text-[8px] text-pink-600 font-black uppercase tracking-widest">Guest Favorite!</div>
                              )}
                              <span className="text-[8px] text-gray-400 font-bold">Est: {menuInfo?.prepTimeMinutes}m</span>
                            </div>
                           </div>
                        </div>
                        <span className="text-sm font-bold text-gray-500 flex items-center"><IndianRupee size={12}/>{menuInfo ? menuInfo.price * item.quantity : 0}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Progress Bar for Preparing orders */}
                {order.status === 'Preparing' && (
                  <div className="px-6 py-2 bg-blue-50/50">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1"><Zap size={10} /> Neural Prep Active</span>
                      <span className="text-[8px] font-black text-blue-600">{order.prepProgress}%</span>
                    </div>
                    <div className="w-full h-1 bg-blue-100 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500" style={{ width: `${order.prepProgress}%` }} />
                    </div>
                  </div>
                )}

                {/* Footer Actions */}
                <div className="p-4 bg-white border-t border-gray-50 space-y-3">
                  <div className="flex justify-between items-center px-2">
                    <span className="font-black text-gray-400 uppercase text-[10px] tracking-widest">Total to collect</span>
                    <span className="font-black text-xl text-orange-600 flex items-center"><IndianRupee size={18}/>{order.totalPrice}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {order.status === 'Pending' && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'Preparing')}
                        className="flex-1 py-3 bg-orange-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-700 transition-all shadow-md shadow-orange-100"
                      >
                        Start Cooking
                      </button>
                    )}
                    {order.status === 'Preparing' && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'Completed')}
                        className="flex-1 py-3 bg-green-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-green-700 transition-all shadow-md"
                      >
                        Ready to Serve
                      </button>
                    )}
                    {order.status === 'Completed' && (
                      <div className="flex-1 flex items-center justify-center gap-2 text-green-600 font-black uppercase tracking-widest text-[10px] py-3">
                        <CheckCircle size={16} /> Order Completed
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LiveOrders;
