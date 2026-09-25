import React, { useState, useEffect } from 'react';
import { MenuItem, PaymentMethod, Order, OrderItem, SpiceLevel } from '../types';
import { 
  ShoppingBasket, 
  Plus, 
  Minus, 
  ChevronLeft, 
  CheckCircle2, 
  IndianRupee, 
  Flame, 
  Clock, 
  Coffee, 
  Utensils, 
  Search,
  Check,
  ShieldCheck,
  X
} from 'lucide-react';

interface CartItemData {
  quantity: number;
  spice: SpiceLevel;
  isJain: boolean;
  note: string;
}

interface Props {
  restaurantName: string;
  menu: MenuItem[];
  onPlaceOrder: (order: Order) => void;
  onClose: () => void;
  liveOrders: Order[];
}

const QRMenu: React.FC<Props> = ({ 
  restaurantName, 
  menu, 
  onPlaceOrder, 
  onClose, 
  liveOrders 
}) => {
  const [cart, setCart] = useState<Record<string, CartItemData>>({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI / QR');
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [selectedDietary, setSelectedDietary] = useState<'all' | 'veg' | 'jain' | 'nonveg'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [guestName, setGuestName] = useState('Guest at Table T-04');
  const [tableNumber, setTableNumber] = useState('Table T-04');
  const [guestPhone, setGuestPhone] = useState('');
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [customSpice, setCustomSpice] = useState<SpiceLevel>('Medium');
  const [customJain, setCustomJain] = useState(false);
  const [customNote, setCustomNote] = useState('');

  const currentOrder = liveOrders.find(o => o.id === activeOrderId);

  const cartValues = Object.values(cart) as CartItemData[];
  const cartEntries = Object.entries(cart) as [string, CartItemData][];

  const totalItems: number = cartValues.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal: number = cartEntries.reduce((sum, [id, data]) => {
    const item = menu.find(m => m.id === id);
    return sum + (item ? item.price * data.quantity : 0);
  }, 0);
  const gst = Math.round(subtotal * 0.05); // 5% standard GST
  const grandTotal = subtotal + gst;

  const categories = Array.from(new Set(menu.map(m => m.category)));

  const handleOpenCustomize = (item: MenuItem) => {
    setCustomizingItem(item);
    setCustomSpice(item.spiceLevel);
    setCustomJain(false);
    setCustomNote('');
  };

  const handleAddCustomizedToCart = () => {
    if (!customizingItem) return;
    const existing = cart[customizingItem.id] || { quantity: 0, spice: 'Medium', isJain: false, note: '' };
    setCart(prev => ({
      ...prev,
      [customizingItem.id]: {
        quantity: existing.quantity + 1,
        spice: customSpice,
        isJain: customJain,
        note: customNote
      }
    }));
    setCustomizingItem(null);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => {
      const existing = prev[id];
      if (!existing) return prev;
      const newQty = existing.quantity + delta;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: { ...existing, quantity: newQty } };
    });
  };

  const handleCheckout = () => {
    if (totalItems === 0) return;

    const newId = `ord_${Date.now()}`;
    const orderItems: OrderItem[] = (Object.entries(cart) as [string, CartItemData][]).map(([id, data]) => {
      const m = menu.find(item => item.id === id)!;
      return {
        menuItemId: id,
        name: m.name,
        price: m.price,
        quantity: data.quantity,
        spicePreference: data.spice,
        isJain: data.isJain,
        cookingNote: data.note
      };
    });

    const newOrder: Order = {
      id: newId,
      orderNumber: Math.floor(100 + Math.random() * 900),
      customerName: guestName,
      customerPhone: guestPhone || '+91 98201 44521',
      tableNumber,
      orderType: 'QR Table Order',
      items: orderItems,
      subtotal,
      gst,
      totalPrice: grandTotal,
      paymentMethod,
      paymentStatus: 'Paid',
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      status: 'Pending',
      estimatedReadyAt: Date.now() + 15 * 60 * 1000,
      prepProgress: 10
    };

    onPlaceOrder(newOrder);
    setActiveOrderId(newId);
    setCart({});
  };

  // Order Tracker Component
  if (activeOrderId && currentOrder) {
    return (
      <div className="fixed inset-0 bg-[#faf7f2] z-50 flex flex-col overflow-y-auto">
        <header className="bg-white px-6 py-4 border-b border-stone-200 sticky top-0 z-10 flex justify-between items-center shadow-xs">
          <div>
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">Live Kitchen Tracker</span>
            <h2 className="text-base font-bold text-stone-900 leading-tight">Order #{currentOrder.orderNumber}</h2>
          </div>
          <button 
            onClick={() => setActiveOrderId(null)}
            className="text-xs font-semibold text-amber-700 hover:text-amber-800"
          >
            Order More Items
          </button>
        </header>

        <div className="p-6 max-w-lg mx-auto w-full space-y-6 flex-1">
          {/* Tracker Card */}
          <div className="bg-stone-900 text-white p-7 rounded-3xl shadow-xl text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-amber-400">
                {currentOrder.status === 'Completed' ? (
                  <CheckCircle2 size={40} className="text-emerald-400" />
                ) : (
                  <Flame size={40} className="animate-pulse" />
                )}
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                {currentOrder.tableNumber}
              </span>
              <h3 className="text-2xl font-serif font-bold text-stone-100 mt-1">
                {currentOrder.status === 'Pending' && 'Order Received at Kitchen'}
                {currentOrder.status === 'Preparing' && 'In Tandoor & Curry Station'}
                {currentOrder.status === 'Ready' && 'Ready to Serve at Table'}
                {currentOrder.status === 'Completed' && 'Served & Completed'}
              </h3>
              <p className="text-xs text-stone-300 mt-1">
                {currentOrder.status === 'Pending' && 'Chef is reviewing your cooking instructions and queueing tickets.'}
                {currentOrder.status === 'Preparing' && 'Tandoor naans are being fired and gravies simmering to your requested spice level.'}
                {currentOrder.status === 'Ready' && 'Your food is plated hot and our steward is bringing it to your table!'}
                {currentOrder.status === 'Completed' && 'We hope you enjoyed the authentic flavours of India!'}
              </p>
            </div>

            {/* Step Indicators */}
            <div className="pt-2 flex justify-between text-xs text-stone-400 border-t border-stone-800">
              <span className={currentOrder.status !== 'Cancelled' ? 'text-amber-400 font-semibold' : ''}>1. Received</span>
              <span className={currentOrder.status === 'Preparing' || currentOrder.status === 'Ready' || currentOrder.status === 'Completed' ? 'text-amber-400 font-semibold' : ''}>2. In Wok & Clay Oven</span>
              <span className={currentOrder.status === 'Ready' || currentOrder.status === 'Completed' ? 'text-emerald-400 font-semibold' : ''}>3. Served at Table</span>
            </div>
          </div>

          {/* Itemized Order Recap */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 border-b border-stone-100 pb-2">
              Ticket Details
            </h4>
            <div className="space-y-2 text-xs">
              {currentOrder.items.map((item, i) => (
                <div key={i} className="flex justify-between items-start text-stone-800">
                  <div>
                    <span className="font-semibold">{item.quantity}x {item.name}</span>
                    <div className="text-[11px] text-stone-500">
                      {item.spicePreference && `Spice: ${item.spicePreference}`}
                      {item.isJain && ` · Strict Jain`}
                    </div>
                  </div>
                  <span className="font-mono font-semibold tabular-nums">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-100 flex justify-between items-center text-xs font-bold text-stone-900">
              <span>Total Bill (Inc. 5% GST)</span>
              <span className="font-mono text-base text-amber-800 tabular-nums">₹{currentOrder.totalPrice}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-xl text-xs font-semibold transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const filteredMenuItems = menu.filter(m => {
    if (!m.inStock) return false;
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    const matchesDietary = 
      selectedDietary === 'all' ||
      (selectedDietary === 'veg' && m.isVeg) ||
      (selectedDietary === 'jain' && m.isJainAvailable) ||
      (selectedDietary === 'nonveg' && !m.isVeg);
    return matchesCategory && matchesDietary;
  });

  return (
    <div className="fixed inset-0 bg-[#faf7f2] z-50 flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <header className="bg-white px-5 py-3.5 border-b border-stone-200 sticky top-0 z-20 flex items-center justify-between shadow-xs">
        <button 
          onClick={onClose}
          className="p-2 -ml-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-50"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="text-center">
          <h1 className="text-lg font-serif font-bold text-stone-900 leading-tight">
            {restaurantName}
          </h1>
          <div className="text-[11px] text-stone-500 font-medium">
            {tableNumber} · Digital Dining
          </div>
        </div>

        <div className="relative p-2 text-amber-700">
          <ShoppingBasket size={22} />
          {totalItems > 0 && (
            <span className="absolute top-1 right-1 bg-amber-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
              {totalItems}
            </span>
          )}
        </div>
      </header>

      {/* Dietary Filters & Categories */}
      <div className="bg-white border-b border-stone-200 px-5 py-2.5 space-y-2 shrink-0">
        {/* Dietary Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedDietary('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors shrink-0 ${
              selectedDietary === 'all'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            All Dishes
          </button>
          <button
            onClick={() => setSelectedDietary('veg')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors shrink-0 flex items-center gap-1 ${
              selectedDietary === 'veg'
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <span>●</span> Pure Veg
          </button>
          <button
            onClick={() => setSelectedDietary('jain')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors shrink-0 flex items-center gap-1 ${
              selectedDietary === 'jain'
                ? 'bg-amber-700 text-white'
                : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            <span>🟢</span> Jain Friendly
          </button>
          <button
            onClick={() => setSelectedDietary('nonveg')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors shrink-0 flex items-center gap-1 ${
              selectedDietary === 'nonveg'
                ? 'bg-rose-700 text-white'
                : 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
            }`}
          >
            <span>▲</span> Non-Veg
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs text-stone-500">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`shrink-0 pb-1 font-semibold ${selectedCategory === 'all' ? 'text-amber-800 border-b-2 border-amber-800' : 'hover:text-stone-800'}`}
          >
            All
          </button>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`shrink-0 pb-1 font-semibold ${selectedCategory === c ? 'text-amber-800 border-b-2 border-amber-800' : 'hover:text-stone-800'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Main Menu Dish List */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 max-w-2xl mx-auto w-full pb-36">
        {filteredMenuItems.map(item => {
          const cartItem = cart[item.id];
          return (
            <div 
              key={item.id} 
              className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs flex gap-4 transition-all hover:border-amber-200"
            >
              {/* Dish Thumbnail */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200 relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-1.5 left-1.5">
                  <span className={`w-3.5 h-3.5 border flex items-center justify-center rounded-xs bg-white ${
                    item.isVeg ? 'border-emerald-600' : 'border-rose-600'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'}`}></span>
                  </span>
                </div>
              </div>

              {/* Dish Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-stone-900 text-sm leading-snug">{item.name}</h3>
                  </div>
                  {item.hindiName && (
                    <p className="text-[11px] text-stone-400 font-medium">{item.hindiName}</p>
                  )}
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-0.5">
                    <span className="flex items-center gap-0.5 text-amber-800 font-medium">
                      <Flame size={11} className="text-amber-600" /> {item.spiceLevel}
                    </span>
                    <span>·</span>
                    <span>{item.prepTimeMinutes} mins</span>
                    {item.isJainAvailable && (
                      <>
                        <span>·</span>
                        <span className="text-emerald-700 font-semibold">Jain available</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Price and Add Control */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-bold font-mono text-base text-stone-900 tabular-nums">
                    ₹{item.price}
                  </span>

                  {cartItem ? (
                    <div className="flex items-center gap-2 bg-stone-100 rounded-lg p-1 border border-stone-200">
                      <button 
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="w-7 h-7 rounded bg-white text-stone-800 flex items-center justify-center shadow-xs hover:bg-stone-50"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-bold font-mono text-xs w-5 text-center tabular-nums">
                        {cartItem.quantity}
                      </span>
                      <button 
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="w-7 h-7 rounded bg-amber-600 text-white flex items-center justify-center shadow-xs hover:bg-amber-700"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleOpenCustomize(item)}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-1"
                    >
                      <Plus size={14} /> Add to Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Customization Modal */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-sm w-full p-5 space-y-4">
            <div className="flex justify-between items-start border-b border-stone-100 pb-2">
              <div>
                <h3 className="font-serif font-bold text-base text-stone-900">{customizingItem.name}</h3>
                <span className="text-xs text-stone-500 font-mono">₹{customizingItem.price}</span>
              </div>
              <button onClick={() => setCustomizingItem(null)} className="text-stone-400 hover:text-stone-600">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Select Desired Spice Level</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Mild', 'Medium', 'Teekha', 'Desi Spicy'] as SpiceLevel[]).map(lvl => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setCustomSpice(lvl)}
                      className={`p-2 rounded-lg border text-left font-medium transition-colors ${
                        customSpice === lvl ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold' : 'border-stone-200 bg-white text-stone-700'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {customizingItem.isJainAvailable && (
                <label className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={customJain}
                    onChange={(e) => setCustomJain(e.target.checked)}
                    className="rounded text-emerald-600"
                  />
                  <span className="font-semibold">Prepare 100% Jain (No Onion/Garlic)</span>
                </label>
              )}

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Cooking Note to Chef</label>
                <input 
                  type="text"
                  placeholder="e.g. Less oil, extra crispy roti, no coriander"
                  className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs focus:outline-none focus:border-amber-500"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={handleAddCustomizedToCart}
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold transition-all shadow-sm"
            >
              Add to Basket (₹{customizingItem.price})
            </button>
          </div>
        </div>
      )}

      {/* Sticky Bottom Cart & Checkout Strip */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 inset-x-0 bg-white border-t border-stone-200 p-4 shadow-xl z-30">
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="w-full sm:w-auto flex justify-between sm:flex-col text-xs">
              <span className="text-stone-500">{totalItems} dishes in order · Table T-04</span>
              <div className="font-bold text-base font-mono text-stone-900 tabular-nums">
                ₹{grandTotal} <span className="text-[11px] text-stone-400 font-normal">(inc. 5% GST)</span>
              </div>
            </div>

            <div className="w-full sm:w-auto flex items-center gap-2">
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                className="px-3 py-2 rounded-xl border border-stone-200 text-xs font-semibold bg-stone-50 text-stone-800"
              >
                <option value="UPI / QR">Pay via UPI (GPay/PhonePe)</option>
                <option value="Cash">Cash at Table</option>
                <option value="Card">Credit / Debit Card</option>
              </select>

              <button
                onClick={handleCheckout}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                Send Order to Kitchen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRMenu;
