export type SpiceLevel = 'Mild' | 'Medium' | 'Teekha' | 'Desi Spicy';

export type DietaryTag = 
  | 'Pure Veg' 
  | 'Jain (No Onion/Garlic)' 
  | 'Non-Veg' 
  | 'Halal' 
  | 'Gluten-Free' 
  | 'Nut Allergy' 
  | 'Eggless';

export type CustomerTier = 'Silver' | 'Gold' | 'Maharaja VIP';

export interface HistoricalOrder {
  id: string;
  date: string;
  total: number;
  status: 'Completed' | 'Cancelled' | 'Refunded';
  dishes?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  spicePreference: SpiceLevel;
  dietaryTags: DietaryTag[];
  tier: CustomerTier;
  loyaltyPoints: number;
  lastOrder: string;
  totalSpend: number;
  visitCount: number;
  favoriteDish: string;
  familyNotes?: string;
  churnRisk?: 'Low' | 'Medium' | 'High';
  orderHistory?: HistoricalOrder[];
}

export type TableArea = 'Main AC Dining' | 'Courtyard Veranda' | 'Maharaja VIP Cabana' | 'Mehfil Banquet Hall';

export type DiningOccasion = 
  | 'Regular Dining' 
  | 'Birthday' 
  | 'Anniversary' 
  | 'Kitty Party' 
  | 'Corporate Dinner' 
  | 'Family Get-Together';

export interface Reservation {
  id: string;
  customerId: string;
  customerName: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tableArea: TableArea;
  tableNumber: string;
  occasion: DiningOccasion;
  status: 'Pending' | 'Confirmed' | 'Seated' | 'Completed' | 'Cancelled';
  notes?: string;
}

export type KitchenStation = 
  | 'Tandoor Oven' 
  | 'Curry & Gravy' 
  | 'Biryani & Rice' 
  | 'Chaat & Starters' 
  | 'Beverages & Desserts';

export type MenuCategory = 
  | 'Starters & Kebabs' 
  | 'Rich Curries & Gravies' 
  | 'Dum Biryani & Breads' 
  | 'Street Chaat' 
  | 'Thalis & Combos' 
  | 'Desserts & Sweets' 
  | 'Beverages & Chai';

export interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  price: number;
  category: MenuCategory;
  station: KitchenStation;
  spiceLevel: SpiceLevel;
  isVeg: boolean;
  isJainAvailable: boolean;
  image: string;
  description: string;
  prepTimeMinutes: number;
  isBestSeller?: boolean;
  inStock: boolean;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  spicePreference?: SpiceLevel;
  isJain?: boolean;
  cookingNote?: string;
}

export type OrderType = 'Dine-In' | 'Takeaway' | 'QR Table Order';

export type PaymentMethod = 'UPI / QR' | 'Cash' | 'Card';
export type PaymentStatus = 'Pending' | 'Paid' | 'Refunded';

export interface Order {
  id: string;
  orderNumber: number;
  customerId?: string; 
  customerName?: string;
  customerPhone?: string;
  tableNumber?: string;
  orderType: OrderType;
  items: OrderItem[];
  subtotal: number;
  gst: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  timestamp: string;
  status: 'Pending' | 'Preparing' | 'Ready' | 'Completed' | 'Cancelled';
  estimatedReadyAt?: number;
  prepProgress?: number;
  specialInstructions?: string;
}

export type ViewState = 
  | 'dashboard' 
  | 'customers' 
  | 'reservations' 
  | 'marketing' 
  | 'insights' 
  | 'live-orders' 
  | 'qr-menu' 
  | 'menu-manager' 
  | 'qr-generator' 
  | 'settings';
