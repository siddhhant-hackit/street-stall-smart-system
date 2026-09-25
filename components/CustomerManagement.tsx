import React, { useState } from 'react';
import { Customer, SpiceLevel, CustomerTier, DietaryTag } from '../types';
import { 
  Search, 
  Plus, 
  Filter, 
  Mail, 
  Phone, 
  Flame, 
  X, 
  User, 
  Heart, 
  AlertCircle,
  ChevronDown,
  ChevronUp,
  IndianRupee,
  Calendar,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Copy
} from 'lucide-react';

interface Props {
  customers: Customer[];
  onUpdate: (customers: Customer[]) => void;
  onBookReservationForGuest?: (customer: Customer) => void;
}

const CustomerManagement: React.FC<Props> = ({ 
  customers, 
  onUpdate,
  onBookReservationForGuest 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedCustomerId, setExpandedCustomerId] = useState<string | null>(null);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  // New Guest Form State
  const [newGuest, setNewGuest] = useState({
    name: '',
    email: '',
    phone: '',
    spicePreference: 'Medium' as SpiceLevel,
    dietaryTags: [] as DietaryTag[],
    tier: 'Silver' as CustomerTier,
    favoriteDish: '',
    familyNotes: '',
    initialSpend: 0
  });

  const availableDietaryTags: DietaryTag[] = [
    'Pure Veg',
    'Jain (No Onion/Garlic)',
    'Non-Veg',
    'Halal',
    'Gluten-Free',
    'Nut Allergy',
    'Eggless'
  ];

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.favoriteDish.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTier = selectedTier === 'all' || c.tier === selectedTier;
    const matchesDietary = selectedDietary === 'all' || c.dietaryTags.some(t => t.includes(selectedDietary));

    return matchesSearch && matchesTier && matchesDietary;
  });

  const handleCopyPhone = (phone: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const handleToggleDietaryTag = (tag: DietaryTag) => {
    setNewGuest(prev => ({
      ...prev,
      dietaryTags: prev.dietaryTags.includes(tag)
        ? prev.dietaryTags.filter(t => t !== tag)
        : [...prev.dietaryTags, tag]
    }));
  };

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuest.name || !newGuest.phone) return;

    const guestToAdd: Customer = {
      id: `c_${Date.now()}`,
      name: newGuest.name,
      email: newGuest.email || `${newGuest.name.toLowerCase().replace(/\s+/g, '.')}@guest.in`,
      phone: newGuest.phone,
      spicePreference: newGuest.spicePreference,
      dietaryTags: newGuest.dietaryTags,
      tier: newGuest.tier,
      loyaltyPoints: Math.round(newGuest.initialSpend * 0.1),
      lastOrder: newGuest.favoriteDish || 'New Registration',
      totalSpend: Number(newGuest.initialSpend) || 0,
      visitCount: newGuest.initialSpend > 0 ? 1 : 0,
      favoriteDish: newGuest.favoriteDish || 'Chef Special Thali',
      familyNotes: newGuest.familyNotes,
      churnRisk: 'Low',
      orderHistory: newGuest.initialSpend > 0 ? [
        {
          id: `h_${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          total: Number(newGuest.initialSpend),
          status: 'Completed',
          dishes: newGuest.favoriteDish || 'Initial dining visit'
        }
      ] : []
    };

    onUpdate([guestToAdd, ...customers]);
    setShowAddModal(false);
    setNewGuest({
      name: '',
      email: '',
      phone: '',
      spicePreference: 'Medium',
      dietaryTags: [],
      tier: 'Silver',
      favoriteDish: '',
      familyNotes: '',
      initialSpend: 0
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedCustomerId(expandedCustomerId === id ? null : id);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Search & Filter Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by patron name, phone, or dish..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Tier Filter */}
          <select 
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="px-3 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 bg-stone-50 focus:outline-none focus:border-amber-500"
          >
            <option value="all">All Tiers</option>
            <option value="Maharaja VIP">Maharaja VIP</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
          </select>

          {/* Dietary Filter */}
          <select 
            value={selectedDietary}
            onChange={(e) => setSelectedDietary(e.target.value)}
            className="px-3 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 bg-stone-50 focus:outline-none focus:border-amber-500"
          >
            <option value="all">All Dietary Preferences</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Jain">Jain Friendly</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Halal">Halal</option>
          </select>

          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-all shadow-sm flex items-center gap-1.5"
          >
            <Plus size={16} /> Add New Patron
          </button>
        </div>
      </div>

      {/* Guest Table */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-stone-50/80 text-xs font-semibold text-stone-600 border-b border-stone-200">
                <th className="px-5 py-3.5 w-8"></th>
                <th className="px-5 py-3.5">Guest & Contact</th>
                <th className="px-5 py-3.5">Spice & Dietary Profile</th>
                <th className="px-5 py-3.5">Tier & Loyalty</th>
                <th className="px-5 py-3.5">Favorite Indian Dish</th>
                <th className="px-5 py-3.5 text-right">Lifetime Spend</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredCustomers.map(customer => {
                const isExpanded = expandedCustomerId === customer.id;
                return (
                  <React.Fragment key={customer.id}>
                    <tr 
                      onClick={() => toggleExpand(customer.id)}
                      className={`cursor-pointer transition-colors ${
                        isExpanded ? 'bg-amber-50/30' : 'hover:bg-stone-50/60'
                      }`}
                    >
                      <td className="px-5 py-4 text-stone-400">
                        {isExpanded ? (
                          <ChevronUp size={16} className="text-amber-600" />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-bold text-stone-900 leading-tight">{customer.name}</div>
                        <div className="text-xs text-stone-500 mt-1 flex items-center gap-2">
                          <span className="font-mono text-stone-600">{customer.phone}</span>
                          <button 
                            onClick={(e) => handleCopyPhone(customer.phone, e)} 
                            className="text-stone-400 hover:text-amber-600" 
                            title="Copy Phone"
                          >
                            {copiedPhone === customer.phone ? <CheckCircle2 size={12} className="text-emerald-600" /> : <Copy size={12} />}
                          </button>
                          <span>·</span>
                          <span className="text-stone-400 truncate max-w-[150px]">{customer.email}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800">
                          <Flame size={13} className="text-amber-600 shrink-0" />
                          <span>{customer.spicePreference}</span>
                        </div>
                        <div className="text-xs text-stone-500 mt-1">
                          {customer.dietaryTags.length > 0 ? (
                            customer.dietaryTags.map((tag, idx) => (
                              <span key={idx}>
                                {idx > 0 && ' · '}
                                <span className={tag.includes('Jain') ? 'text-emerald-700 font-semibold' : ''}>{tag}</span>
                              </span>
                            ))
                          ) : (
                            <span>Standard Menu</span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${
                            customer.tier === 'Maharaja VIP' ? 'bg-amber-500' :
                            customer.tier === 'Gold' ? 'bg-yellow-500' : 'bg-stone-400'
                          }`}></span>
                          {customer.tier}
                        </div>
                        <div className="text-xs text-stone-500 font-mono tabular-nums mt-0.5">
                          {customer.loyaltyPoints} points · {customer.visitCount} visits
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                          <Heart size={13} className="text-rose-500 shrink-0" />
                          <span className="truncate max-w-[160px]">{customer.favoriteDish}</span>
                        </div>
                        <div className="text-xs text-stone-400 truncate max-w-[160px] mt-0.5">
                          Last: {customer.lastOrder}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="font-bold font-mono text-stone-900 tabular-nums">
                          ₹{customer.totalSpend.toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs text-stone-500">
                          ₹{customer.visitCount > 0 ? Math.round(customer.totalSpend / customer.visitCount) : 0} avg/visit
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <a 
                            href={`https://wa.me/${customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Namaste ${customer.name}, greeting from the team! We are pleased to welcome you for dinner tonight.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-stone-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare size={16} />
                          </a>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded Detail Panel */}
                    {isExpanded && (
                      <tr className="bg-stone-50/50">
                        <td colSpan={7} className="px-8 py-6 border-y border-stone-200">
                          <div className="space-y-5">
                            {/* Family & Dining Notes */}
                            {customer.familyNotes && (
                              <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200 text-stone-800 text-xs leading-relaxed">
                                <span className="font-bold text-amber-900 uppercase tracking-wide mr-2">Patron Dining Notes:</span>
                                {customer.familyNotes}
                              </div>
                            )}

                            {/* Order History */}
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                                  Recent Dining Visits & Invoices ({customer.orderHistory?.length || 0})
                                </h4>
                                <span className="text-xs text-stone-500">
                                  Churn Risk Status: <strong className={customer.churnRisk === 'High' ? 'text-rose-600' : 'text-emerald-600'}>{customer.churnRisk || 'Low'}</strong>
                                </span>
                              </div>

                              <div className="space-y-2">
                                {customer.orderHistory && customer.orderHistory.length > 0 ? (
                                  customer.orderHistory.map(order => (
                                    <div key={order.id} className="p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                                      <div className="flex items-center gap-3">
                                        <span className="font-mono text-stone-500 font-semibold">{order.date}</span>
                                        <span className="text-stone-700 font-medium">{order.dishes || 'Indian Dinner Feast'}</span>
                                      </div>
                                      <div className="flex items-center gap-4">
                                        <span className="font-bold font-mono text-stone-900 tabular-nums">₹{order.total}</span>
                                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                                          {order.status}
                                        </span>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className="text-xs text-stone-400 py-3 text-center bg-white rounded-xl border border-stone-200">
                                    No prior dining records found.
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="py-16 text-center text-stone-400 text-sm">
            No patrons found matching your search and filter criteria.
          </div>
        )}
      </div>

      {/* Add New Guest Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <h3 className="font-serif font-bold text-lg text-stone-900">Add New Guest Profile</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddGuest} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name *</label>
                <input 
                  required
                  type="text"
                  placeholder="e.g. Sanjay Verma"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none"
                  value={newGuest.name}
                  onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Phone / WhatsApp *</label>
                  <input 
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none font-mono"
                    value={newGuest.phone}
                    onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                  <input 
                    type="email"
                    placeholder="guest@example.com"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none"
                    value={newGuest.email}
                    onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Spice Preference</label>
                  <select 
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none"
                    value={newGuest.spicePreference}
                    onChange={(e) => setNewGuest({ ...newGuest, spicePreference: e.target.value as SpiceLevel })}
                  >
                    <option value="Mild">Mild</option>
                    <option value="Medium">Medium</option>
                    <option value="Teekha">Teekha (Hot)</option>
                    <option value="Desi Spicy">Desi Spicy (Extra Mirchi)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Patron Tier</label>
                  <select 
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none"
                    value={newGuest.tier}
                    onChange={(e) => setNewGuest({ ...newGuest, tier: e.target.value as CustomerTier })}
                  >
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Maharaja VIP">Maharaja VIP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">Dietary & Cultural Preferences</label>
                <div className="flex flex-wrap gap-1.5">
                  {availableDietaryTags.map(tag => {
                    const isSelected = newGuest.dietaryTags.includes(tag);
                    return (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => handleToggleDietaryTag(tag)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                          isSelected 
                            ? 'bg-amber-600 text-white border-amber-600' 
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Favorite Dish</label>
                <input 
                  type="text"
                  placeholder="e.g. Royal Hyderabadi Dum Biryani"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none"
                  value={newGuest.favoriteDish}
                  onChange={(e) => setNewGuest({ ...newGuest, favoriteDish: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Family & Hospitality Notes</label>
                <textarea 
                  rows={2}
                  placeholder="e.g. Celebrating Anniversary on Oct 14, prefers corner table, strict Jain utensils requested"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none"
                  value={newGuest.familyNotes}
                  onChange={(e) => setNewGuest({ ...newGuest, familyNotes: e.target.value })}
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-all shadow-sm"
                >
                  Save Guest Profile
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
