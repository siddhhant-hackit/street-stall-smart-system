
import React from 'react';
import { Reservation, Customer } from '../types';
import { Plus, Check, Clock, X, User, MapPin } from 'lucide-react';

interface Props {
  reservations: Reservation[];
  onUpdate: (res: Reservation[]) => void;
  customers: Customer[];
}

const ReservationManagement: React.FC<Props> = ({ reservations, onUpdate, customers }) => {
  const handleStatusChange = (id: string, status: Reservation['status']) => {
    const updated = reservations.map(r => r.id === id ? { ...r, status } : r);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Reservation Log</h3>
        <button className="px-6 py-2 bg-orange-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-orange-700 shadow-lg shadow-orange-100">
          <Plus size={18} /> New Booking
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {reservations.map(res => {
          const customer = customers.find(c => c.id === res.customerId);
          return (
            <div key={res.id} className="bg-white p-6 rounded-2xl shadow-sm border border-orange-50 flex flex-col md:flex-row gap-6 transition-all hover:border-orange-200">
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">{res.customerName}</h4>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <User size={14} /> Guest for {res.guests} people
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    res.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 
                    res.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {res.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-orange-50">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} className="text-orange-500" />
                    <span>{res.date} @ {res.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} className="text-orange-500" />
                    <span>Table Preferred: Corner</span>
                  </div>
                </div>

                {res.notes && (
                  <div className="bg-orange-50/50 p-3 rounded-lg text-sm italic text-orange-900 border-l-2 border-orange-300">
                    "{res.notes}"
                  </div>
                )}
                
                {customer && (
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-tighter">
                    Spice Preference: {customer.spicePreference}
                  </div>
                )}
              </div>

              <div className="flex md:flex-col gap-2 justify-center">
                <button 
                  onClick={() => handleStatusChange(res.id, 'Confirmed')}
                  className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors flex-1 md:flex-none"
                  title="Confirm"
                >
                  <Check size={20} />
                </button>
                <button 
                  className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors flex-1 md:flex-none"
                  title="Seated"
                  onClick={() => handleStatusChange(res.id, 'Seated')}
                >
                  <User size={20} />
                </button>
                <button 
                  onClick={() => handleStatusChange(res.id, 'Cancelled')}
                  className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors flex-1 md:flex-none"
                  title="Cancel"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {reservations.length === 0 && (
        <div className="bg-white p-20 rounded-2xl text-center text-gray-400 border border-dashed border-orange-200">
          No bookings for today yet.
        </div>
      )}
    </div>
  );
};

export default ReservationManagement;
