import React, { useState } from 'react';
import { MenuItem, MenuCategory, KitchenStation, SpiceLevel, ViewState } from '../types';
import { ALL_MENU_ITEMS } from '../constants';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  UtensilsCrossed, 
  IndianRupee, 
  QrCode, 
  Sparkles, 
  Check, 
  Clock, 
  Flame, 
  ChefHat,
  Search
} from 'lucide-react';

interface Props {
  menu: MenuItem[];
  onUpdate: (menu: MenuItem[]) => void;
  onNavigate?: (view: ViewState) => void;
}

const MenuManager: React.FC<Props> = ({ menu, onUpdate, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const categories: MenuCategory[] = [
    'Starters & Kebabs',
    'Rich Curries & Gravies',
    'Dum Biryani & Breads',
    'Street Chaat',
    'Thalis & Combos',
    'Desserts & Sweets',
    'Beverages & Chai'
  ];

  const stations: KitchenStation[] = [
    'Tandoor Oven',
    'Curry & Gravy',
    'Biryani & Rice',
    'Chaat & Starters',
    'Beverages & Desserts'
  ];

  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    hindiName: '',
    price: 350,
    category: 'Rich Curries & Gravies',
    station: 'Curry & Gravy',
    spiceLevel: 'Medium',
    isVeg: true,
    isJainAvailable: true,
    prepTimeMinutes: 12,
    description: '',
    image: '/src/assets/images/hero_indian_thali_1790308878138.jpg',
    inStock: true
  });

  const handleToggleStock = (id: string) => {
    onUpdate(menu.map(item => item.id === id ? { ...item, inStock: !item.inStock } : item));
  };

  const handleSave = () => {
    if (!formData.name || !formData.price) return;

    if (editingId) {
      onUpdate(menu.map(item => item.id === editingId ? { ...item, ...formData } as MenuItem : item));
      setEditingId(null);
    } else {
      const newItem: MenuItem = {
        id: `dish_${Date.now()}`,
        name: formData.name || 'New Special Dish',
        hindiName: formData.hindiName,
        price: Number(formData.price),
        category: formData.category || 'Rich Curries & Gravies',
        station: formData.station || 'Curry & Gravy',
        spiceLevel: formData.spiceLevel || 'Medium',
        isVeg: Boolean(formData.isVeg),
        isJainAvailable: Boolean(formData.isJainAvailable),
        prepTimeMinutes: Number(formData.prepTimeMinutes) || 10,
        description: formData.description || 'Special culinary preparation from the chef.',
        image: formData.image || '/src/assets/images/hero_indian_thali_1790308878138.jpg',
        inStock: true,
        isBestSeller: false
      };
      onUpdate([newItem, ...menu]);
      setIsAdding(false);
    }

    setFormData({
      name: '',
      hindiName: '',
      price: 350,
      category: 'Rich Curries & Gravies',
      station: 'Curry & Gravy',
      spiceLevel: 'Medium',
      isVeg: true,
      isJainAvailable: true,
      prepTimeMinutes: 12,
      description: '',
      image: '/src/assets/images/hero_indian_thali_1790308878138.jpg',
      inStock: true
    });
  };

  const handleDelete = (id: string) => {
    onUpdate(menu.filter(item => item.id !== id));
  };

  const startEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const quickAddClassic = (classic: MenuItem) => {
    const newItem: MenuItem = {
      ...classic,
      id: `dish_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    };
    onUpdate([newItem, ...menu]);
  };

  const filteredMenu = menu.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.hindiName && item.hindiName.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <UtensilsCrossed size={20} className="text-amber-600" />
            Indian Menu Engineering & 86 Matrix
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage recipes, station routing, spice calibrations, and live ingredient availability.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button 
            onClick={() => onNavigate?.('qr-generator')}
            className="flex-1 sm:flex-none px-4 py-2 border border-stone-200 text-stone-700 hover:bg-stone-50 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <QrCode size={15} className="text-amber-600" /> Get Table QR
          </button>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex-1 sm:flex-none px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
          >
            <Plus size={15} /> Add Custom Dish
          </button>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-amber-600 text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            All Items ({menu.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input 
            type="text" 
            placeholder="Search dish or recipe..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-stone-200 text-xs bg-white focus:outline-none focus:border-amber-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Add / Edit Dish Form Modal */}
      {(isAdding || editingId) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-stone-200 pb-3">
              <h3 className="font-serif font-bold text-lg text-stone-900">
                {editingId ? 'Edit Dish Recipe' : 'Add New Indian Menu Item'}
              </h3>
              <button 
                onClick={() => { setIsAdding(false); setEditingId(null); }}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">English Name *</label>
                  <input 
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none"
                    placeholder="e.g. Kashmiri Rogan Josh"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Hindi / Regional Name</label>
                  <input 
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none"
                    placeholder="e.g. कश्मीरी रोगन जोश"
                    value={formData.hindiName}
                    onChange={e => setFormData({ ...formData, hindiName: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Price (₹) *</label>
                  <input 
                    type="number"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none font-mono"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Prep Time (mins)</label>
                  <input 
                    type="number"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none font-mono"
                    value={formData.prepTimeMinutes}
                    onChange={e => setFormData({ ...formData, prepTimeMinutes: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Spice Level</label>
                  <select 
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none"
                    value={formData.spiceLevel}
                    onChange={e => setFormData({ ...formData, spiceLevel: e.target.value as SpiceLevel })}
                  >
                    <option value="Mild">Mild</option>
                    <option value="Medium">Medium</option>
                    <option value="Teekha">Teekha</option>
                    <option value="Desi Spicy">Desi Spicy</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Menu Category</label>
                  <select 
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as MenuCategory })}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Kitchen Station Routing</label>
                  <select 
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none"
                    value={formData.station}
                    onChange={e => setFormData({ ...formData, station: e.target.value as KitchenStation })}
                  >
                    {stations.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex gap-4 p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={formData.isVeg}
                    onChange={e => setFormData({ ...formData, isVeg: e.target.checked })}
                    className="rounded text-amber-600"
                  />
                  <span>Pure Vegetarian</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={formData.isJainAvailable}
                    onChange={e => setFormData({ ...formData, isJainAvailable: e.target.checked })}
                    className="rounded text-amber-600"
                  />
                  <span>Jain Friendly (No Onion/Garlic)</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Culinary Description</label>
                <textarea 
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:border-amber-500 focus:outline-none"
                  placeholder="Describe authentic spices, dum technique, and accompaniments..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  onClick={() => { setIsAdding(false); setEditingId(null); }}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Save size={14} /> {editingId ? 'Update Item' : 'Add to Menu'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMenu.map(item => (
          <div 
            key={item.id} 
            className={`bg-white rounded-2xl border flex flex-col justify-between overflow-hidden shadow-sm transition-all ${
              item.inStock ? 'border-stone-200/80 hover:border-amber-300' : 'border-stone-200 opacity-60 bg-stone-50'
            }`}
          >
            <div>
              {/* Image & Quick Badges */}
              <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold backdrop-blur-md shadow-sm ${
                    item.isVeg ? 'bg-emerald-950/80 text-emerald-200' : 'bg-rose-950/80 text-rose-200'
                  }`}>
                    {item.isVeg ? '● Pure Veg' : '▲ Non-Veg'}
                  </span>
                  {item.isJainAvailable && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-stone-900/80 text-amber-200 backdrop-blur-md">
                      Jain Available
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 bg-stone-900/85 backdrop-blur-md px-3 py-1 rounded-xl text-white font-bold font-mono text-sm tabular-nums shadow-lg">
                  ₹{item.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-stone-900 text-base leading-snug">{item.name}</h3>
                    {item.hindiName && (
                      <p className="text-xs text-stone-500 font-medium">{item.hindiName}</p>
                    )}
                  </div>
                </div>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-stone-500">
                  <span className="flex items-center gap-1 text-amber-800 font-medium">
                    <Flame size={12} className="text-amber-600" />
                    {item.spiceLevel}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {item.prepTimeMinutes}m prep
                  </span>
                  <span>·</span>
                  <span className="text-stone-700 font-medium">{item.station}</span>
                </div>
              </div>
            </div>

            {/* Footer Control: 86 / In-Stock Switch and Actions */}
            <div className="p-4 pt-2 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => handleToggleStock(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  item.inStock 
                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' 
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${item.inStock ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                {item.inStock ? 'In Stock (Live)' : '86\'d (Out of Stock)'}
              </button>

              <div className="flex items-center gap-1">
                <button 
                  onClick={() => startEdit(item)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
                  title="Edit Dish"
                >
                  <Edit2 size={15} />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete Dish"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMenu.length === 0 && (
        <div className="py-20 bg-white rounded-2xl border border-dashed border-stone-200 text-center text-stone-400 text-sm">
          No menu items found matching the selected category or search filter.
        </div>
      )}
    </div>
  );
};

export default MenuManager;
