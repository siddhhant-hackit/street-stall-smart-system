
export type SpiceLevel = 'Mild' | 'Medium' | 'Hot' | 'Indian Spicy';

export interface HistoricalOrder {
  id: string;
  date: string;
  total: number;
  status: 'Completed' | 'Cancelled' | 'Refunded';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  spicePreference: SpiceLevel;
  dietaryRestrictions: string[];
  loyaltyPoints: number;
  lastOrder: string;
  totalSpend: number;
  visitCount: number;
  favoriteDish: string;
  orderHistory?: HistoricalOrder[];
}

export interface Reservation {
  id: string;
  customerId: string;
  customerName: string;
  date: string;
  time: string;
  guests: number;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Seated';
  notes?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'Snacks' | 'Mains' | 'Drinks' | 'Desserts';
  image: string;
  description: string;
  isTrending?: boolean;
  orderCount?: number;
  prepTimeMinutes?: number; // Added for AI time estimation
}

export type PaymentMethod = 'Money' | 'Online' | 'Offline';

export interface Order {
  id: string;
  customerId?: string; 
  items: { menuItemId: string; quantity: number }[];
  totalPrice: number;
  paymentMethod: PaymentMethod;
  timestamp: string;
  status: 'Pending' | 'Preparing' | 'Completed';
  estimatedReadyAt?: number; // Unix timestamp for when it will be ready
  prepProgress?: number; // 0-100
}

export type ViewState = 'dashboard' | 'customers' | 'reservations' | 'marketing' | 'insights' | 'live-orders' | 'qr-menu' | 'menu-manager' | 'qr-generator' | 'settings';
