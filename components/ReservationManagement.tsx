import React, { useState } from 'react';
import { Reservation, Customer, TableArea, DiningOccasion } from '../types';
import { 
  Plus, 
  Check, 
  Clock, 
  X, 
  User, 
  MapPin, 
  Phone, 
  Calendar as CalendarIcon, 
  MessageSquare,
  Sparkles,
  Users,
  CheckCircle2
} from 'lucide-react';

interface Props {
  reservations: Reservation[];
  onUpdate: (res: Reservation[]) => void;
  customers: Customer[];
}

const ReservationManagement: React.FC<Props> = ({ reservations, onUpdate, customers }) => {
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Booking State
  const [newRes, setNewRes] = useState({
    customerName: '',
    phone: '',
    date: 'Today',
    time: '20:00',
    guests: 4,
    tableArea: 'Main AC Dining' as TableArea,
    tableNumber: 'Table T-05',
    occasion: 'Regular Dining' as DiningOccasion,
    notes: ''
  });

  const areas: TableArea[] = [
    'Main AC Dining',
    'Courtyard Veranda',
    'Maharaja VIP Cabana',
    'Mehfil Banquet Hall'
  ];

  const occasions: DiningOccasion[] = [
    'Regular Dining',
    'Birthday',
    'Anniversary',
    'Kitty Party',
    'Corporate Dinner',
    'Family Get-Together'
  ];

  const handleStatusChange = (id: string, status: Reservation['status']) => {
    onUpdate(reservations.map(r => r.id === id ? { ...r, status } : r));
  };

  const handleCreateReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRes.customerName || !newRes.phone) return;

    const matchedCustomer = customers.find(c => 
      c.name.toLowerCase() === newRes.customerName.toLowerCase() || 
      c.phone.replace(/[^0-9]/g, '') === newRes.phone.replace(/[^0-9]/g, '')
    );

    const booking: Reservation = {
      id: `r_${Date.now()}`,
      customerId: matchedCustomer ? matchedCustomer.id : 'walk_in',
      customerName: newRes.customerName,
      phone: newRes.phone,
      date: newRes.date,
      time: newRes.time,
      guests: Number(newRes.guests),
      tableArea: newRes.tableArea,
      tableNumber: newRes.tableNumber,
      occasion: newRes.occasion,
      status: 'Confirmed',
      notes: newRes.notes
    };

    onUpdate([booking, ...reservations]);
    setShowAddModal(false);
    setNewRes({
      customerName: '',
      phone: '',
      date: 'Today',
      time: '20:00',
      guests: 4,
      tableArea: 'Main AC Dining',
      tableNumber: 'Table T-05',
      occasion: 'Regular Dining',
      notes: ''
    });
  };

  const filteredReservations = reservations.filter(r => {
    const matchesArea = selectedArea === 'all' || r.tableArea === selectedArea;
    const matchesStatus = selectedStatus === 'all' || r.status === selectedStatus;
    return matchesArea && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {/* Area Filter Buttons */}
          <button
            onClick={() => setSelectedArea('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              selectedArea === 'all' 
                ? 'bg-amber-600 text-white' 
                : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            All Areas ({reservations.length})
          </button>
          {areas.map(area => (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedArea === area 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {area}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold text-xs transition-all shadow-sm flex items-center gap-1.5 shrink-0"
        >
          <Plus size={16} /> New Table Booking
        </button>
      </div>

      {/* Reservation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredReservations.map(res => {
          const customer = customers.find(c => c.id === res.customerId);
          
          return (
            <div 
              key={res.id} 
              className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col justify-between hover:border-amber-300 transition-all space-y-4"
            >
              <div className="space-y-3">
                {/* Card Header: Guest name, party size, occasion */}
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-stone-900 leading-tight">{res.customerName}</h4>
                      {customer?.tier && (
                        <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                          {customer.tier}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                      <Users size={13} className="text-stone-400" />
                      <span>{res.guests} Guests</span>
                      <span>·</span>
                      <span className="font-semibold text-stone-700">{res.occasion}</span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                    res.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                    res.status === 'Seated' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                    res.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                    'bg-stone-100 text-stone-600'
                  }`}>
                    {res.status}
                  </span>
                </div>

                {/* Table details and timing */}
                <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-100 text-xs">
                  <div className="space-y-0.5">
                    <span className="text-stone-400 font-medium">Table & Area</span>
                    <div className="font-bold text-stone-800 flex items-center gap-1">
                      <MapPin size={12} className="text-amber-600" />
                      {res.tableNumber}
                    </div>
                    <div className="text-stone-500 text-[11px]">{res.tableArea}</div>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-stone-400 font-medium">Date & Time</span>
                    <div className="font-bold text-stone-800 flex items-center gap-1">
                      <Clock size={12} className="text-amber-600" />
                      {res.time} ({res.date})
                    </div>
                    <div className="text-stone-500 text-[11px] font-mono">{res.phone}</div>
                  </div>
                </div>

                {/* Hospitality / Dietary Notes */}
                {res.notes && (
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs text-stone-700 leading-relaxed">
                    <strong className="text-stone-900 mr-1.5">Special Instructions:</strong>
                    {res.notes}
                  </div>
                )}

                {customer && (
                  <div className="text-xs text-stone-500 flex items-center gap-2">
                    <span>Spice: <strong className="text-amber-800">{customer.spicePreference}</strong></span>
                    {customer.dietaryTags.length > 0 && (
                      <>
                        <span>·</span>
                        <span>Dietary: <strong className="text-emerald-700">{customer.dietaryTags.join(', ')}</strong></span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="pt-2 flex items-center justify-between gap-2 border-t border-stone-100">
                <a
                  href={`https://wa.me/${res.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Namaste ${res.customerName}, your table reservation for ${res.guests} guests is confirmed at ${res.tableArea} (${res.tableNumber}) for ${res.time} today. We look forward to serving you an authentic dining experience!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 hover:text-emerald-700 flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare size={13} className="text-emerald-600" />
                  WhatsApp Confirmation
                </a>

                <div className="flex items-center gap-1.5">
                  {res.status === 'Pending' && (
                    <button 
                      onClick={() => handleStatusChange(res.id, 'Confirmed')}
                      className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-1"
                    >
                      <Check size={13} /> Confirm
                    </button>
                  )}
                  {res.status === 'Confirmed' && (
                    <button 
                      onClick={() => handleStatusChange(res.id, 'Seated')}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1"
                    >
                      <User size={13} /> Mark Seated
                    </button>
                  )}
                  {res.status === 'Seated' && (
                    <button 
                      onClick={() => handleStatusChange(res.id, 'Completed')}
                      className="px-3 py-1.5 bg-stone-800 text-white rounded-lg text-xs font-semibold hover:bg-stone-900 transition-colors flex items-center gap-1"
                    >
                      <CheckCircle2 size={13} /> Completed
                    </button>
                  )}
                  {res.status !== 'Cancelled' && res.status !== 'Completed' && (
                    <button 
                      onClick={() => handleStatusChange(res.id, 'Cancelled')}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Cancel Booking"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredReservations.length === 0 && (
        <div className="py-20 bg-white rounded-2xl border border-dashed border-stone-200 text-center text-stone-400 text-sm">
          No table bookings found for the selected area.
        </div>
      )}

      {/* Add New Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <h3 className="font-serif font-bold text-lg text-stone-900">New Table Reservation</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateReservation} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Guest Full Name *</label>
                  <input 
                    required
                    type="text"
                    placeholder="e.g. Ramesh Chandra"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none"
                    value={newRes.customerName}
                    onChange={(e) => setNewRes({ ...newRes, customerName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Phone / WhatsApp *</label>
                  <input 
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none font-mono"
                    value={newRes.phone}
                    onChange={(e) => setNewRes({ ...newRes, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Date</label>
                  <select 
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none"
                    value={newRes.date}
                    onChange={(e) => setNewRes({ ...newRes, date: e.target.value })}
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Time Slot</label>
                  <input 
                    type="text"
                    placeholder="20:00"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none font-mono"
                    value={newRes.time}
                    onChange={(e) => setNewRes({ ...newRes, time: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Guests</label>
                  <input 
                    type="number"
                    min={1}
                    max={50}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none font-mono"
                    value={newRes.guests}
                    onChange={(e) => setNewRes({ ...newRes, guests: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Dining Area</label>
                  <select 
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none"
                    value={newRes.tableArea}
                    onChange={(e) => setNewRes({ ...newRes, tableArea: e.target.value as TableArea })}
                  >
                    {areas.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Table Number</label>
                  <input 
                    type="text"
                    placeholder="Table T-05"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none"
                    value={newRes.tableNumber}
                    onChange={(e) => setNewRes({ ...newRes, tableNumber: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Dining Occasion</label>
                <select 
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none"
                  value={newRes.occasion}
                  onChange={(e) => setNewRes({ ...newRes, occasion: e.target.value as DiningOccasion })}
                >
                  {occasions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Special Hospitality Requests</label>
                <textarea 
                  rows={2}
                  placeholder="e.g. Birthday cake arrangement, anniversary flowers, Jain preparation, high chair for toddler"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none"
                  value={newRes.notes}
                  onChange={(e) => setNewRes({ ...newRes, notes: e.target.value })}
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
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationManagement;
