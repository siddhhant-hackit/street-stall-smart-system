
import React, { useState } from 'react';
import { MenuItem } from '../types';
import { POPULAR_STALL_ITEMS } from '../constants';
import { Plus, Trash2, Edit2, Save, X, UtensilsCrossed, IndianRupee, QrCode, Sparkles } from 'lucide-react';

interface Props {
  menu: MenuItem[];
  onUpdate: (menu: MenuItem[]) => void;
  onNavigate?: (view: any) => void;
}

const MenuManager: React.FC<Props> = ({ menu, onUpdate, onNavigate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    price: 0,
    category: 'Snacks',
    description: '',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb01793?auto=format&fit=crop&q=80&w=200'
  });

  const handleSave = () => {
    if (!formData.name || !formData.price) return;

    if (editingId) {
      onUpdate(menu.map(item => item.id === editingId ? { ...item, ...formData } as MenuItem : item));
      setEditingId(null);
    } else {
      const newItem: MenuItem = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
      } as MenuItem;
      onUpdate([...menu, newItem]);
      setIsAdding(false);
    }
    setFormData({ name: '', price: 0, category: 'Snacks', description: '', image: 'https://images.unsplash.com/photo-1601050690597-df056fb01793?auto=format&fit=crop&q=80&w=200' });
  };

  const handleDelete = (id: string) => {
    onUpdate(menu.filter(item => item.id !== id));
  };

  const startEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const quickAdd = (item: MenuItem) => {
    const newItem: MenuItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
    };
    onUpdate([...menu, newItem]);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <UtensilsCrossed className="text-orange-600" />
          Stall Menu Manager
        </h3>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={() => onNavigate?.('qr-generator')}
            className="flex-1 md:flex-none px-4 py-2 border-2 border-orange-100 text-orange-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-50 transition-all"
          >
            <QrCode size={18} /> Get QR Code
          </button>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex-1 md:flex-none px-6 py-2 bg-orange-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-700 shadow-md shadow-orange-100"
          >
            <Plus size={18} /> Custom Item
          </button>
        </div>
      </div>

      {/* Quick Add Section */}
      <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-orange-500" size={20} />
          <h4 className="font-black text-gray-800 uppercase tracking-widest text-sm">Popular Street Food - Quick Add</h4>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {POPULAR_STALL_ITEMS.filter(pi => !menu.some(mi => mi.name === pi.name)).map(item => (
            <div key={item.id} className="flex-shrink-0 w-32 group">
              <div className="relative mb-2">
                <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-2xl group-hover:scale-105 transition-transform" />
                <button 
                  onClick={() => quickAdd(item)}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl"
                >
                  <Plus className="text-white" size={32} />
                </button>
              </div>
              <p className="text-xs font-bold text-gray-800 text-center line-clamp-1">{item.name}</p>
              <p className="text-[10px] text-orange-600 text-center font-bold">₹{item.price}</p>
            </div>
          ))}
          {POPULAR_STALL_ITEMS.filter(pi => !menu.some(mi => mi.name === pi.name)).length === 0 && (
            <p className="text-sm text-gray-400 italic py-4">You've added all popular street food classics!</p>
          )}
        </div>
      </div>

      {/* Manual Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-orange-100 animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-gray-800">{editingId ? 'Edit Item' : 'New Custom Stall Item'}</h4>
            <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-gray-400 hover:text-red-500">
              <X size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Item Name</label>
              <input 
                className="w-full px-4 py-2 rounded-xl border border-orange-100 focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="e.g. Special Pav Bhaji"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price (₹)</label>
              <input 
                type="number"
                className="w-full px-4 py-2 rounded-xl border border-orange-100 focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="0"
                value={formData.price}
                onChange={e => setFormData({...formData, price: Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
              <select 
                className="w-full px-4 py-2 rounded-xl border border-orange-100 focus:ring-2 focus:ring-orange-500 outline-none"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as any})}
              >
                <option value="Snacks">Snacks</option>
                <option value="Mains">Mains</option>
                <option value="Drinks">Drinks</option>
                <option value="Desserts">Desserts</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Image URL</label>
              <input 
                className="w-full px-4 py-2 rounded-xl border border-orange-100 focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="https://..."
                value={formData.image}
                onChange={e => setFormData({...formData, image: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
              <textarea 
                className="w-full px-4 py-2 rounded-xl border border-orange-100 focus:ring-2 focus:ring-orange-500 outline-none"
                rows={2}
                placeholder="Tell guests what makes this special..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>
          <button 
            onClick={handleSave}
            className="mt-6 w-full py-3 bg-green-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 shadow-lg shadow-green-100"
          >
            <Save size={18} /> {editingId ? 'Update Item' : 'Add to Menu'}
          </button>
        </div>
      )}

      {/* Current Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {menu.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border border-orange-50 shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md hover:border-orange-200">
            <img src={item.image} alt={item.name} className="h-40 w-full object-cover" />
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-gray-800">{item.name}</h4>
                <span className="text-orange-600 font-bold flex items-center"><IndianRupee size={14} />{item.price}</span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2 mb-4">{item.description}</p>
              <div className="mt-auto flex justify-between items-center">
                <span className="px-2 py-1 bg-orange-50 text-orange-700 text-[10px] font-bold uppercase rounded-md">
                  {item.category}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {menu.length === 0 && !isAdding && (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-orange-100 text-gray-400">
          <UtensilsCrossed size={48} className="mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium">Your stall's menu is empty.</p>
          <p className="text-sm">Street Smart tip: Use the "Quick Add" classics above or add a custom item!</p>
        </div>
      )}
    </div>
  );
};

export default MenuManager;
