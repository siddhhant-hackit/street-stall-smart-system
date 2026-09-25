import React, { useState } from 'react';
import { Save, Store, ShieldCheck, IndianRupee, Phone, CheckCircle2, QrCode } from 'lucide-react';

interface Props {
  restaurantName: string;
  setRestaurantName: (name: string) => void;
}

const Settings: React.FC<Props> = ({ restaurantName, setRestaurantName }) => {
  const [name, setName] = useState(restaurantName);
  const [gstin, setGstin] = useState('27AABCM8291Q1ZP');
  const [fssai, setFssai] = useState('11521018000492');
  const [upiId, setUpiId] = useState('masalacraft@okaxis');
  const [whatsapp, setWhatsapp] = useState('+91 98201 44521');
  const [city, setCity] = useState('Mumbai, Maharashtra');
  const [gstRate, setGstRate] = useState('5');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setRestaurantName(name);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16 animate-in fade-in duration-300">
      <div className="bg-white p-6 lg:p-8 rounded-2xl border border-stone-200/80 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-stone-100 pb-5">
          <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl">
            <Store size={24} />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-stone-900">
              Restaurant Profile & Legal Billing Setup
            </h2>
            <p className="text-xs text-stone-500">
              Configure Indian business credentials, FSSAI compliance, GST tax rates, and UPI billing IDs.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5 text-xs">
          {/* Restaurant Identity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Eatery & Brand Name *</label>
              <input 
                type="text"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. MasalaCraft"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">City / Location</label>
              <input 
                type="text"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Connaught Place, New Delhi"
              />
            </div>
          </div>

          {/* Legal Compliance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">GSTIN Number (for Tax Invoices)</label>
              <input 
                type="text"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none font-mono uppercase"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                placeholder="27AABCM8291Q1ZP"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">FSSAI License Registration</label>
              <input 
                type="text"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none font-mono"
                value={fssai}
                onChange={(e) => setFssai(e.target.value)}
                placeholder="14-digit FSSAI number"
              />
            </div>
          </div>

          {/* Payments & WhatsApp Comms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">UPI ID / VPA (GPay / PhonePe / Paytm)</label>
              <input 
                type="text"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none font-mono"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="restaurant@okaxis"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">WhatsApp Business Line</label>
              <input 
                type="tel"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none font-mono"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+91 98201 44521"
              />
            </div>
          </div>

          {/* Tax Rates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Restaurant GST Rate</label>
              <select 
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none"
                value={gstRate}
                onChange={(e) => setGstRate(e.target.value)}
              >
                <option value="5">5% GST (Standard standalone eateries / cloud kitchens)</option>
                <option value="18">18% GST (Hotel restaurants with room tariff &gt; ₹7,500)</option>
                <option value="0">0% (Composite exemption)</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Currency Symbol</label>
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-sm font-semibold text-stone-700 flex items-center gap-1.5">
                <IndianRupee size={15} /> INR (Indian Rupee - ₹)
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            {saved ? (
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 size={16} /> Restaurant credentials saved successfully!
              </span>
            ) : <span></span>}

            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5"
            >
              <Save size={15} /> Save Credentials
            </button>
          </div>
        </form>
      </div>

      {/* Compliance Information Card */}
      <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-3">
        <ShieldCheck size={20} className="text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold">Indian Dining Regulatory Compliance</h4>
          <p className="text-stone-600 leading-relaxed">
            Your bills automatically append 5% Restaurant GST (CGST 2.5% + SGST 2.5%) and display your FSSAI registration on digital receipts as mandated by food safety guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
