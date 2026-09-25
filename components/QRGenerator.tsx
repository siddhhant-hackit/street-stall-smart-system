import React, { useState } from 'react';
import { QrCode, Download, Printer, Smartphone, Store, ShieldCheck, Check, Sparkles } from 'lucide-react';

interface Props {
  restaurantName: string;
  onOpenPreview: () => void;
}

const QRGenerator: React.FC<Props> = ({ restaurantName, onOpenPreview }) => {
  const [selectedTable, setSelectedTable] = useState('Table T-04 (AC Dining)');
  const [printed, setPrinted] = useState(false);

  const tables = [
    'Table T-01 (AC Hall)',
    'Table T-02 (AC Hall)',
    'Table T-03 (AC Hall)',
    'Table T-04 (AC Dining)',
    'Table T-05 (Corner Booth)',
    'Veranda V-01 (Open Courtyard)',
    'Veranda V-02 (Open Courtyard)',
    'Cabana C-01 (Maharaja VIP)',
    'Cabana C-02 (Maharaja VIP)',
    'Mehfil Hall M-01 (Banquet)',
    'Takeaway & Counter QR'
  ];

  const handlePrint = () => {
    setPrinted(true);
    setTimeout(() => setPrinted(false), 3000);
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Header Card */}
      <div className="bg-white p-6 lg:p-8 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
            <QrCode size={22} className="text-amber-600" />
            Table Standee & Scan-to-Order QR Generator
          </h2>
          <p className="text-xs text-stone-500 mt-1 max-w-lg">
            Print branded acrylic table cards for each table. Diners scan with their phone camera to browse the live menu with spice levels, Jain options, and send orders directly to your KDS.
          </p>
        </div>

        <div className="shrink-0">
          <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
            Active Table Assignment
          </label>
          <select
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            className="px-3 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-800 bg-stone-50 focus:outline-none"
          >
            {tables.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Branded Table Standee Card Preview */}
      <div className="flex justify-center">
        <div 
          onClick={onOpenPreview}
          className="w-full max-w-sm bg-stone-900 text-white rounded-3xl p-8 border-4 border-amber-600/60 shadow-2xl relative overflow-hidden group cursor-pointer hover:border-amber-500 transition-all text-center space-y-6"
        >
          {/* Decorative Corner Ornaments */}
          <div className="flex items-center justify-center gap-2 text-xs font-serif text-amber-400 tracking-widest uppercase">
            <span>❖</span>
            <span>Atithi Devo Bhava</span>
            <span>❖</span>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold tracking-tight text-stone-100">
              {restaurantName}
            </h3>
            <div className="text-xs text-amber-300/80 font-medium mt-0.5">
              Royal Indian Cuisine & Hospitality
            </div>
            <div className="mt-2 inline-block px-3 py-1 rounded-full bg-stone-800 text-[11px] font-semibold text-amber-400 border border-stone-700">
              {selectedTable}
            </div>
          </div>

          {/* QR Box */}
          <div className="bg-white p-5 rounded-2xl mx-auto w-52 h-52 flex flex-col items-center justify-center shadow-lg relative">
            {/* SVG QR Representation */}
            <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none">
              <rect x="5" y="5" width="25" height="25" fill="#1c1917" />
              <rect x="10" y="10" width="15" height="15" fill="#ffffff" />
              <rect x="13" y="13" width="9" height="9" fill="#1c1917" />
              
              <rect x="70" y="5" width="25" height="25" fill="#1c1917" />
              <rect x="75" y="10" width="15" height="15" fill="#ffffff" />
              <rect x="78" y="13" width="9" height="9" fill="#1c1917" />
              
              <rect x="5" y="70" width="25" height="25" fill="#1c1917" />
              <rect x="10" y="75" width="15" height="15" fill="#ffffff" />
              <rect x="13" y="78" width="9" height="9" fill="#1c1917" />
              
              {/* Pattern Blocks */}
              <rect x="35" y="10" width="5" height="5" fill="#1c1917" />
              <rect x="45" y="10" width="15" height="5" fill="#1c1917" />
              <rect x="35" y="20" width="25" height="5" fill="#1c1917" />
              <rect x="10" y="40" width="25" height="5" fill="#1c1917" />
              <rect x="45" y="40" width="10" height="10" fill="#d97706" />
              <rect x="65" y="40" width="25" height="5" fill="#1c1917" />
              <rect x="35" y="55" width="15" height="5" fill="#1c1917" />
              <rect x="55" y="55" width="20" height="10" fill="#1c1917" />
              <rect x="35" y="75" width="10" height="15" fill="#1c1917" />
              <rect x="50" y="75" width="15" height="5" fill="#1c1917" />
              <rect x="70" y="75" width="20" height="20" fill="#1c1917" />
            </svg>
            <div className="text-[10px] font-bold text-stone-900 mt-1 uppercase tracking-wider">
              Scan to Dine & Order
            </div>
          </div>

          <div className="space-y-1 text-xs text-stone-300">
            <p className="font-semibold text-white">No app download required</p>
            <p className="text-[11px] text-stone-400">Open mobile camera · View photos & customize spices</p>
          </div>

          {/* Payment Icons */}
          <div className="pt-2 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-center gap-2">
            <span>Accepts:</span>
            <span className="font-semibold text-stone-200">GPay</span>
            <span>·</span>
            <span className="font-semibold text-stone-200">PhonePe</span>
            <span>·</span>
            <span className="font-semibold text-stone-200">Paytm</span>
            <span>·</span>
            <span className="font-semibold text-stone-200">UPI</span>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-stone-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
            <div className="bg-amber-600 text-stone-950 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl">
              <Smartphone size={16} /> Click to Test Guest Menu
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <button
          onClick={onOpenPreview}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <Smartphone size={16} /> Open Diner Scan Preview
        </button>

        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <Printer size={16} /> {printed ? 'Sending to Printer...' : 'Print Table Standee Card'}
        </button>
      </div>

      {/* Operational Deployment Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-sm flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-50 text-amber-700 shrink-0">
            <Store size={18} />
          </div>
          <div>
            <h4 className="font-bold text-stone-900">Table Acrylic Standee Placement</h4>
            <p className="text-stone-500 mt-0.5 leading-relaxed">
              Place the printed QR card in transparent acrylic tent holders at center table. Reduces waitstaff menu dispatch delays during weekend lunch rush.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-sm flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h4 className="font-bold text-stone-900">Seamless Digital Kitchen Dispatch</h4>
            <p className="text-stone-500 mt-0.5 leading-relaxed">
              Orders placed through this QR land directly in your Live KDS screen with exact table number, spice preference, and Jain cooking notes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
