
import React, { useState } from 'react';
import { Customer, SpiceLevel, HistoricalOrder } from '../types';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  Flame, 
  X, 
  User, 
  Heart, 
  AlertCircle,
  ShieldAlert,
  Zap,
  ChevronDown,
  ChevronUp,
  IndianRupee,
  Terminal,
  Activity
} from 'lucide-react';

interface Props {
  customers: Customer[];
  onUpdate: (customers: Customer[]) => void;
}

const CustomerManagement: React.FC<Props> = ({ customers, onUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedCustomerId, setExpandedCustomerId] = useState<string | null>(null);
  
  // New Guest Form State
  const [newGuest, setNewGuest] = useState({
    name: '',
    email: '',
    phone: '',
    spicePreference: 'Medium' as SpiceLevel,
    dietaryRestrictions: '',
    favoriteDish: '',
  });

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  const getSpiceBadge = (level: SpiceLevel) => {
    switch (level) {
      case 'Mild': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Medium': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Hot': return 'bg-red-100 text-red-700 border-red-200';
      case 'Indian Spicy': return 'bg-orange-600 text-white border-orange-700 shadow-lg shadow-orange-100';
    }
  };

  const getStatusStyle = (status: HistoricalOrder['status']) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-50 border-green-100';
      case 'Cancelled': return 'text-red-600 bg-red-50 border-red-100';
      case 'Refunded': return 'text-blue-600 bg-blue-50 border-blue-100';
    }
  };

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    const guestToAdd: Customer = {
      id: Date.now().toString(),
      name: newGuest.name,
      email: newGuest.email,
      phone: newGuest.phone,
      spicePreference: newGuest.spicePreference,
      dietaryRestrictions: newGuest.dietaryRestrictions.split(',').map(s => s.trim()).filter(s => s),
      loyaltyPoints: 0,
      lastOrder: 'None',
      totalSpend: 0,
      visitCount: 0,
      favoriteDish: newGuest.favoriteDish || 'None',
      orderHistory: []
    };

    onUpdate([...customers, guestToAdd]);
    setShowAddModal(false);
    setNewGuest({
      name: '',
      email: '',
      phone: '',
      spicePreference: 'Medium',
      dietaryRestrictions: '',
      favoriteDish: '',
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedCustomerId(expandedCustomerId === id ? null : id);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Scan for Guest ID or search..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-orange-50 focus:border-orange-500 focus:outline-none bg-white shadow-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex items-center gap-2 px-6 py-4 rounded-2xl border-2 border-orange-50 hover:bg-orange-50 transition-colors bg-white font-black text-xs uppercase tracking-widest text-gray-500">
            <Filter size={18} /> Filters
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-orange-600 text-white font-black text-xs uppercase tracking-widest hover:bg-orange-700 transition-all shadow-xl shadow-orange-100 active:scale-95"
          >
            <Plus size={18} /> Add New Link
          </button>
        </div>
      </div>

      {/* Guest Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-orange-50 overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ea580c 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-orange-50/20 text-[10px] font-black text-orange-900/50 uppercase tracking-[0.2em]">
                <th className="px-8 py-6 border-b border-orange-50 w-10"></th>
                <th className="px-8 py-6 border-b border-orange-50">Neural Information</th>
                <th className="px-8 py-6 border-b border-orange-50">Flavor Profile</th>
                <th className="px-8 py-6 border-b border-orange-50">Transmission History</th>
                <th className="px-8 py-6 border-b border-orange-50">Loyalty Sync</th>
                <th className="px-8 py-6 border-b border-orange-50 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50">
              {filtered.map(c => (
                <React.Fragment key={c.id}>
                  <tr 
                    onClick={() => toggleExpand(c.id)}
                    className={`transition-all group cursor-pointer ${expandedCustomerId === c.id ? 'bg-orange-50/50' : 'hover:bg-orange-50/30'}`}
                  >
                    <td className="px-8 py-6">
                      {expandedCustomerId === c.id ? (
                        <ChevronUp size={20} className="text-orange-600" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-300 group-hover:text-orange-600 transition-colors" />
                      )}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <div className="font-black text-gray-900 text-base tracking-tight">{c.name}</div>
                        <div className="flex flex-col gap-1 mt-1.5">
                          <div className="flex items-center text-[10px] font-bold text-gray-400"><Mail size={12} className="mr-2 opacity-50" /> {c.email}</div>
                          <div className="flex items-center text-[10px] font-bold text-gray-400"><Phone size={12} className="mr-2 opacity-50" /> {c.phone}</div>
                        </div>
                        
                        {/* Dietary Restrictions - Clearly Displayed Badges */}
                        {c.dietaryRestrictions.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {c.dietaryRestrictions.map((restriction, idx) => (
                              <span key={idx} className="px-2.5 py-1 bg-red-50 text-red-600 text-[9px] font-black uppercase tracking-widest border border-red-100 rounded-lg flex items-center gap-1.5 shadow-sm">
                                <ShieldAlert size={10} /> {restriction}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest gap-2 border ${getSpiceBadge(c.spicePreference)}`}>
                        <Flame size={12} />
                        {c.spicePreference}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <div className="text-gray-900 font-black text-sm flex items-center gap-2">
                          <Heart size={14} className="text-pink-500 fill-pink-500" />
                          {c.favoriteDish}
                        </div>
                        <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">{c.visitCount} visits • <span className="text-gray-900">₹{c.totalSpend.toLocaleString()}</span></div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-2">
                        <div className="w-24 h-2 bg-orange-100/50 rounded-full overflow-hidden border border-orange-100">
                          <div className="h-full bg-orange-600 shadow-[0_0_10px_rgba(234,88,12,0.5)]" style={{ width: `${Math.min((c.loyaltyPoints / 2500) * 100, 100)}%` }} />
                        </div>
                        <span className="text-xs font-black text-orange-900 flex items-center gap-1.5 uppercase tracking-tighter">
                          <Zap size={10} className="fill-orange-600 text-orange-600" />
                          {c.loyaltyPoints} pts
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-gray-300 hover:text-orange-600 transition-colors p-2 rounded-xl hover:bg-orange-50">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                  
                  {/* Expanded Row: Last 5 Orders (Neural Log) */}
                  {expandedCustomerId === c.id && (
                    <tr className="bg-orange-50/20 animate-in slide-in-from-top-2 duration-300">
                      <td colSpan={6} className="px-8 py-10">
                        <div className="bg-white rounded-[2rem] border border-orange-100 p-8 shadow-inner relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Activity size={120} />
                          </div>
                          
                          <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-gray-900 text-white rounded-xl shadow-lg">
                              <Terminal size={18} />
                            </div>
                            <div>
                              <h4 className="font-black text-gray-900 text-sm uppercase tracking-tight">Neural Log: Last 5 Transmissions</h4>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Historical Guest Interaction Records</p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            {c.orderHistory && c.orderHistory.length > 0 ? (
                              c.orderHistory.slice(0, 5).map((order) => (
                                <div key={order.id} className="grid grid-cols-3 items-center px-6 py-4 rounded-2xl bg-orange-50/30 border border-orange-100 hover:border-orange-200 transition-all group/order">
                                  <div className="flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></div>
                                    <span className="text-xs font-black text-gray-600 uppercase tracking-tighter">{order.date}</span>
                                  </div>
                                  <div className="flex items-center justify-center font-black text-gray-900 text-sm tracking-tight tabular-nums">
                                    <IndianRupee size={12} className="mr-1 text-orange-600" />
                                    {order.total}
                                  </div>
                                  <div className="flex justify-end">
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(order.status)} shadow-sm`}>
                                      {order.status}
                                    </span>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-orange-100 rounded-[2rem]">
                                <AlertCircle className="text-orange-200 mb-2" size={32} />
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">No previous transmission logs found</p>
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-8 pt-6 border-t border-orange-50 flex justify-between items-center">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-600">
                              <Zap size={12} className="fill-orange-600" />
                              Stall Sync: Active
                            </div>
                            <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-orange-600 transition-colors flex items-center gap-1.5 underline decoration-orange-100 underline-offset-4">
                              View Full Protocol Data
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-200">
              <Search size={32} />
            </div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No guest matches found in the network</p>
          </div>
        )}
      </div>

      {/* Add Guest Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border-4 border-orange-600">
            <div className="bg-gray-900 px-8 py-6 flex justify-between items-center text-white relative">
              <div className="absolute top-0 inset-x-0 h-1 bg-orange-600"></div>
              <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                <div className="p-2 bg-orange-600 rounded-xl">
                  <User size={20} />
                </div>
                Inject New Guest Link
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddGuest} className="p-10 space-y-8 bg-[#fffdfa]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Protocol Identity (Full Name) *</label>
                  <input 
                    required
                    type="text"
                    className="w-full px-6 py-4 rounded-2xl border-2 border-orange-50 focus:border-orange-500 outline-none bg-orange-50/20 font-bold transition-all"
                    placeholder="e.g. Rahul Verma"
                    value={newGuest.name}
                    onChange={e => setNewGuest({...newGuest, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Comms Channel (Email)</label>
                  <input 
                    type="email"
                    className="w-full px-6 py-4 rounded-2xl border-2 border-orange-50 focus:border-orange-500 outline-none bg-orange-50/20 font-bold transition-all"
                    placeholder="name@example.com"
                    value={newGuest.email}
                    onChange={e => setNewGuest({...newGuest, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Signal Line (Phone) *</label>
                  <input 
                    required
                    type="tel"
                    className="w-full px-6 py-4 rounded-2xl border-2 border-orange-50 focus:border-orange-500 outline-none bg-orange-50/20 font-bold transition-all"
                    placeholder="+91 XXXXX XXXXX"
                    value={newGuest.phone}
                    onChange={e => setNewGuest({...newGuest, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Flavor Calibration</label>
                  <select 
                    className="w-full px-6 py-4 rounded-2xl border-2 border-orange-50 focus:border-orange-500 outline-none bg-orange-50/20 font-bold transition-all appearance-none cursor-pointer"
                    value={newGuest.spicePreference}
                    onChange={e => setNewGuest({...newGuest, spicePreference: e.target.value as SpiceLevel})}
                  >
                    <option value="Mild">Mild</option>
                    <option value="Medium">Medium</option>
                    <option value="Hot">Hot</option>
                    <option value="Indian Spicy">Indian Spicy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Target Dish</label>
                  <input 
                    type="text"
                    className="w-full px-6 py-4 rounded-2xl border-2 border-orange-50 focus:border-orange-500 outline-none bg-orange-50/20 font-bold transition-all"
                    placeholder="e.g. Butter Chicken"
                    value={newGuest.favoriteDish}
                    onChange={e => setNewGuest({...newGuest, favoriteDish: e.target.value})}
                  />
                </div>
                
                {/* Dietary Restrictions Input - Accepts Comma Separated Values */}
                <div className="md:col-span-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Neural Safety Protocols (Dietary Restrictions)</label>
                    <span className="text-[8px] font-black text-orange-600 uppercase bg-orange-50 px-2 py-0.5 rounded border border-orange-100">Comma Separated</span>
                  </div>
                  <textarea 
                    rows={2}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-orange-50 focus:border-orange-500 outline-none bg-orange-50/20 font-bold transition-all resize-none"
                    placeholder="e.g. No Nuts, Vegan, Gluten-Free"
                    value={newGuest.dietaryRestrictions}
                    onChange={e => setNewGuest({...newGuest, dietaryRestrictions: e.target.value})}
                  />
                  <p className="text-[9px] text-gray-400 font-bold mt-2 italic">* Stored as individual searchable safety tags.</p>
                </div>
              </div>

              <div className="pt-6 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-5 border-2 border-orange-100 text-orange-700 font-black uppercase text-xs tracking-widest rounded-[1.5rem] hover:bg-orange-50 transition-colors"
                >
                  Abort
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-5 bg-orange-600 text-white font-black uppercase text-xs tracking-widest rounded-[1.5rem] hover:bg-orange-700 transition-all shadow-xl shadow-orange-100 active:scale-95"
                >
                  Commit Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;
