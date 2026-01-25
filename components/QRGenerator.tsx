
import React from 'react';
import { QrCode, Download, Printer, Smartphone, Store, ShieldCheck } from 'lucide-react';

interface Props {
  restaurantName: string;
  onOpenPreview: () => void;
}

const QRGenerator: React.FC<Props> = ({ restaurantName, onOpenPreview }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-20 animate-in fade-in duration-700">
      <div className="bg-white p-12 rounded-[4rem] shadow-xl border border-orange-50 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-orange-400 via-orange-600 to-orange-400"></div>
        
        <div className="bg-orange-600 p-5 rounded-[2rem] text-white mb-8 shadow-2xl shadow-orange-200">
          <QrCode size={48} />
        </div>
        
        <div className="space-y-3 mb-12">
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight leading-none">Signal Generator</h2>
          <p className="text-gray-500 max-w-sm font-medium leading-relaxed">
            Encrypted menu transmission protocol for <span className="text-orange-600 font-bold underline underline-offset-4 decoration-orange-200">{restaurantName}</span>. 
            Print and deploy at tactical stall locations.
          </p>
        </div>

        {/* Poster Preview */}
        <div 
          className="relative p-12 bg-white border-[12px] border-gray-900 rounded-[4rem] shadow-2xl mb-12 group cursor-pointer hover:scale-[1.02] transition-all" 
          onClick={onOpenPreview}
        >
          <div className="absolute top-6 inset-x-0 flex justify-center">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-900 opacity-60">SCAN TO SYNC</span>
          </div>
          
          <div className="w-64 h-64 bg-white flex items-center justify-center border-4 border-gray-900 rounded-[2.5rem] p-8 shadow-inner relative overflow-hidden">
             {/* Complex QR Pattern */}
             <div className="grid grid-cols-6 grid-rows-6 gap-2 opacity-90 relative z-10">
                {[...Array(36)].map((_, i) => (
                  <div key={i} className={`w-6 h-6 rounded-[4px] ${Math.random() > 0.45 ? 'bg-gray-900' : 'bg-transparent'}`} />
                ))}
             </div>
             <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_center,_orange_0%,_transparent_70%)]"></div>
          </div>

          <div className="mt-8 text-center space-y-1">
             <h3 className="text-2xl font-serif font-bold text-gray-900 tracking-tight">{restaurantName}</h3>
             <div className="flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Street Smart CRM</span>
             </div>
          </div>

          <div className="absolute inset-0 bg-gray-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[3.25rem] backdrop-blur-md">
            <div className="bg-white p-6 rounded-[2rem] shadow-2xl flex flex-col items-center gap-2 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
               <Smartphone size={32} className="text-orange-600" />
               <span className="text-gray-900 font-black uppercase text-[10px] tracking-widest">Preview UI</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 w-full max-w-md">
          <button className="flex flex-col items-center justify-center gap-3 py-6 px-8 bg-gray-900 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-2xl group">
            <Download size={24} className="group-hover:translate-y-1 transition-transform" /> Save Signal
          </button>
          <button className="flex flex-col items-center justify-center gap-3 py-6 px-8 bg-white border-2 border-orange-100 text-orange-700 rounded-[2.5rem] font-black text-xs uppercase tracking-widest hover:bg-orange-50 transition-all shadow-lg group">
            <Printer size={24} className="group-hover:-translate-y-1 transition-transform" /> Print Node
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-orange-950 p-8 rounded-[3rem] text-orange-100 flex gap-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full blur-3xl group-hover:bg-orange-600/20 transition-colors"></div>
          <div className="p-4 bg-white/10 text-white rounded-[1.5rem] shadow-sm backdrop-blur-md self-start">
            <Store size={28} />
          </div>
          <div>
            <h4 className="font-black text-white text-lg uppercase tracking-tight mb-2">Deploy Tactics</h4>
            <p className="text-sm opacity-70 leading-relaxed font-medium">Place the signal poster exactly <span className="text-orange-400">45cm</span> from the order station for optimal guest eye-sync.</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[3rem] border border-orange-100 flex gap-6 shadow-xl relative overflow-hidden group">
          <div className="p-4 bg-orange-50 text-orange-600 rounded-[1.5rem] self-start shadow-inner border border-orange-100 group-hover:scale-110 transition-transform">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h4 className="font-black text-gray-900 text-lg uppercase tracking-tight mb-2">Zero-Latency Flow</h4>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">Guests bypass the manual interface (queue). Orders stream directly to your Neural Orders center.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
