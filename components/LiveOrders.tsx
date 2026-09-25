import React, { useState } from 'react';
import { Order, MenuItem, Customer, KitchenStation, OrderType } from '../types';
import { 
  Clock, 
  CheckCircle, 
  ChefHat, 
  IndianRupee, 
  Star, 
  Flame, 
  Award, 
  Coffee, 
  Filter,
  Printer,
  Receipt,
  MessageSquare,
  X,
  AlertCircle
} from 'lucide-react';

interface Props {
  orders: Order[];
  onUpdate: (orders: Order[]) => void;
  menu: MenuItem[];
  customers: Customer[];
}

const LiveOrders: React.FC<Props> = ({ orders, onUpdate, menu, customers }) => {
  const [selectedStation, setSelectedStation] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [viewingBillOrder, setViewingBillOrder] = useState<Order | null>(null);

  const stations: KitchenStation[] = [
    'Tandoor Oven',
    'Curry & Gravy',
    'Biryani & Rice',
    'Chaat & Starters',
    'Beverages & Desserts'
  ];

  const updateOrderStatus = (id: string, status: Order['status']) => {
    onUpdate(orders.map(o => {
      if (o.id === id) {
        let updates: Partial<Order> = { status };
        if (status === 'Preparing') {
          updates.prepProgress = 25;
        } else if (status === 'Ready') {
          updates.prepProgress = 95;
        } else if (status === 'Completed') {
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

  const filteredOrders = orders.filter(o => {
    const matchesType = selectedType === 'all' || o.orderType === selectedType;
    return matchesType;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* KDS Header & Filter Strip */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider mr-2 flex items-center gap-1.5">
            <ChefHat size={16} className="text-amber-600" />
            Kitchen Stations:
          </span>
          <button
            onClick={() => setSelectedStation('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              selectedStation === 'all'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            All Stations
          </button>
          {stations.map(st => (
            <button
              key={st}
              onClick={() => setSelectedStation(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedStation === st
                  ? 'bg-amber-600 text-white'
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 bg-stone-50 focus:outline-none"
          >
            <option value="all">All Order Types</option>
            <option value="Dine-In">Dine-In</option>
            <option value="Takeaway">Takeaway</option>
            <option value="QR Table Order">QR Table Orders</option>
          </select>
        </div>
      </div>

      {/* Orders Grid */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white p-16 rounded-2xl border border-dashed border-stone-200 text-center text-stone-400 flex flex-col items-center justify-center space-y-3">
          <ChefHat size={40} className="text-amber-600/40" />
          <h3 className="text-base font-bold text-stone-800">Kitchen Display is Clear</h3>
          <p className="text-xs text-stone-500 max-w-sm">
            All pending orders have been completed and served. New customer dine-in and QR orders will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map(order => {
            const guest = getGuestContext(order.customerId);
            
            return (
              <div 
                key={order.id} 
                className={`bg-white rounded-2xl border flex flex-col justify-between overflow-hidden shadow-sm transition-all ${
                  order.status === 'Pending' 
                    ? 'border-amber-400 ring-2 ring-amber-100' 
                    : order.status === 'Preparing' 
                    ? 'border-blue-300' 
                    : 'border-emerald-200 opacity-90'
                }`}
              >
                {/* Order Header */}
                <div className="p-4 border-b border-stone-100 bg-stone-50/70 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-stone-900 text-base">
                        #{order.orderNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-stone-200 text-stone-700">
                        {order.orderType}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-amber-900 mt-0.5">
                      {order.tableNumber || 'Takeaway'}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      order.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                      order.status === 'Preparing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Ready' ? 'bg-purple-100 text-purple-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {order.status}
                    </span>
                    <div className="text-[11px] font-mono text-stone-500 mt-1 flex items-center justify-end gap-1">
                      <Clock size={11} /> {order.timestamp}
                    </div>
                  </div>
                </div>

                {/* VIP / Patron Context Badge */}
                {guest && (
                  <div className="px-4 py-2 bg-amber-50/70 border-b border-amber-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-amber-900 font-semibold">
                      <Award size={13} className="text-amber-600" />
                      <span>{guest.name}</span>
                      <span className="text-stone-400">·</span>
                      <span className="text-amber-800 font-normal">{guest.tier}</span>
                    </div>
                    <span className="text-[11px] font-medium text-amber-700">
                      Spice: {guest.spicePreference}
                    </span>
                  </div>
                )}

                {/* Items List */}
                <div className="p-4 space-y-3 flex-1">
                  {order.items.map((item, idx) => {
                    const menuInfo = menu.find(m => m.id === item.menuItemId);
                    return (
                      <div key={idx} className="p-2.5 rounded-xl border border-stone-100 bg-stone-50/40 text-xs">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded bg-stone-900 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                              {item.quantity}
                            </span>
                            <div>
                              <div className="font-bold text-stone-900 leading-snug">{item.name}</div>
                              {menuInfo?.station && (
                                <div className="text-[10px] text-stone-500">
                                  Station: {menuInfo.station}
                                </div>
                              )}
                            </div>
                          </div>
                          <span className="font-mono font-semibold text-stone-700 tabular-nums">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>

                        {/* Item customization: Spice & Jain tags */}
                        <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11px]">
                          {item.spicePreference && (
                            <span className="text-amber-800 bg-amber-100/60 px-1.5 py-0.5 rounded font-medium">
                              🌶️ {item.spicePreference}
                            </span>
                          )}
                          {item.isJain && (
                            <span className="text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded font-medium">
                              🟢 Strict Jain Prep
                            </span>
                          )}
                          {item.cookingNote && (
                            <span className="text-stone-600 italic">
                              "{item.cookingNote}"
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {order.specialInstructions && (
                    <div className="p-2.5 bg-rose-50/80 rounded-xl border border-rose-100 text-xs text-rose-800">
                      <strong>Cooking Note:</strong> {order.specialInstructions}
                    </div>
                  )}
                </div>

                {/* Progress bar */}
                {order.status === 'Preparing' && (
                  <div className="px-4 py-1.5 bg-blue-50/50 border-t border-blue-100">
                    <div className="flex justify-between items-center text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-1">
                      <span>In Kitchen Oven & Wok</span>
                      <span className="font-mono">{order.prepProgress || 50}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-blue-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 transition-all duration-500" 
                        style={{ width: `${order.prepProgress || 50}%` }} 
                      />
                    </div>
                  </div>
                )}

                {/* Footer Actions */}
                <div className="p-4 bg-stone-50/50 border-t border-stone-100 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-500">Bill Total (Inc. GST)</span>
                    <span className="font-bold font-mono text-base text-stone-900 tabular-nums">
                      ₹{order.totalPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setViewingBillOrder(order)}
                      className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 rounded-xl border border-stone-200 transition-colors"
                      title="View & Print GST Invoice / KOT"
                    >
                      <Receipt size={16} />
                    </button>

                    {order.status === 'Pending' && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'Preparing')}
                        className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
                      >
                        Accept & Fire Ticket
                      </button>
                    )}

                    {order.status === 'Preparing' && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'Ready')}
                        className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
                      >
                        Mark Ready for Table
                      </button>
                    )}

                    {order.status === 'Ready' && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'Completed')}
                        className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
                      >
                        Delivered & Close
                      </button>
                    )}

                    {order.status === 'Completed' && (
                      <div className="flex-1 py-1.5 text-center text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-center gap-1.5">
                        <CheckCircle size={14} /> Completed & Served
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Printable / WhatsApp Bill Modal */}
      {viewingBillOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-start border-b border-stone-200 pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">Tax Invoice & Bill</h3>
                <p className="text-xs text-stone-500 font-mono">Invoice #{viewingBillOrder.orderNumber} · GSTIN: 27AABCM8291Q1ZP</p>
              </div>
              <button 
                onClick={() => setViewingBillOrder(null)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Guest: {viewingBillOrder.customerName || 'Dine-In Patron'}</span>
                <span>{viewingBillOrder.tableNumber}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Payment: {viewingBillOrder.paymentMethod}</span>
                <span>Status: {viewingBillOrder.paymentStatus}</span>
              </div>

              {/* Items */}
              <div className="border-y border-stone-200 py-3 space-y-2">
                {viewingBillOrder.items.map((it, i) => (
                  <div key={i} className="flex justify-between text-stone-800">
                    <span>{it.quantity}x {it.name}</span>
                    <span className="font-mono font-semibold tabular-nums">₹{it.price * it.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">₹{viewingBillOrder.subtotal}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>5% Restaurant GST (CGST 2.5% + SGST 2.5%)</span>
                  <span className="font-mono tabular-nums">₹{viewingBillOrder.gst}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Grand Total</span>
                  <span className="font-mono tabular-nums text-amber-800">₹{viewingBillOrder.totalPrice}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 flex gap-2">
              <button
                onClick={() => {
                  const billText = `*MasalaCraft Restaurant Invoice*\nOrder #${viewingBillOrder.orderNumber} · ${viewingBillOrder.tableNumber}\nItems:\n${viewingBillOrder.items.map(it => `${it.quantity}x ${it.name} - ₹${it.price * it.quantity}`).join('\n')}\nSubtotal: ₹${viewingBillOrder.subtotal}\nGST (5%): ₹${viewingBillOrder.gst}\n*Total: ₹${viewingBillOrder.totalPrice}*\nThank you for dining with us!`;
                  navigator.clipboard.writeText(billText);
                  alert('Bill copied in WhatsApp format!');
                }}
                className="flex-1 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageSquare size={14} className="text-emerald-600" />
                Copy WhatsApp Bill
              </button>
              <button
                onClick={() => setViewingBillOrder(null)}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveOrders;
