
import { Customer, Reservation, MenuItem } from './types';

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    spicePreference: 'Indian Spicy',
    dietaryRestrictions: [],
    loyaltyPoints: 1250,
    lastOrder: 'Chicken Dum Biryani',
    totalSpend: 15400,
    visitCount: 12,
    favoriteDish: 'Biryani',
    orderHistory: [
      { id: 'h1', date: '2024-05-15', total: 450, status: 'Completed' },
      { id: 'h2', date: '2024-05-10', total: 1200, status: 'Completed' },
      { id: 'h3', date: '2024-05-02', total: 320, status: 'Completed' },
      { id: 'h4', date: '2024-04-25', total: 850, status: 'Completed' },
      { id: 'h5', date: '2024-04-18', total: 150, status: 'Cancelled' }
    ]
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    phone: '+91 91234 56789',
    spicePreference: 'Mild',
    dietaryRestrictions: ['Vegetarian', 'Nut Allergy'],
    loyaltyPoints: 450,
    lastOrder: 'Paneer Makhani',
    totalSpend: 6200,
    visitCount: 5,
    favoriteDish: 'Paneer Butter Masala',
    orderHistory: [
      { id: 'h6', date: '2024-05-18', total: 560, status: 'Completed' },
      { id: 'h7', date: '2024-05-12', total: 420, status: 'Completed' },
      { id: 'h8', date: '2024-05-05', total: 900, status: 'Completed' },
      { id: 'h9', date: '2024-04-28', total: 150, status: 'Completed' },
      { id: 'h10', date: '2024-04-20', total: 300, status: 'Completed' }
    ]
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    phone: '+1 555-0199',
    spicePreference: 'Medium',
    dietaryRestrictions: [],
    loyaltyPoints: 300,
    lastOrder: 'Lamb Rogan Josh',
    totalSpend: 4100,
    visitCount: 3,
    favoriteDish: 'Rogan Josh',
    orderHistory: [
      { id: 'h11', date: '2024-05-14', total: 880, status: 'Completed' },
      { id: 'h12', date: '2024-05-07', total: 450, status: 'Completed' },
      { id: 'h13', date: '2024-04-30', total: 120, status: 'Refunded' }
    ]
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'r1',
    customerId: '1',
    customerName: 'Aarav Sharma',
    date: '2024-05-20',
    time: '19:30',
    guests: 4,
    status: 'Confirmed',
    notes: 'Birthday celebration.'
  }
];

export const POPULAR_STALL_ITEMS: MenuItem[] = [
  {
    id: 'p1',
    name: 'Vada Pav',
    price: 40,
    category: 'Snacks',
    description: 'The "Burger of Mumbai" - spicy potato fritter in a bun.',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=300',
    prepTimeMinutes: 5
  },
  {
    id: 'p2',
    name: 'Samosa Pav',
    price: 45,
    category: 'Snacks',
    description: 'Crispy samosa served in a soft pav with chutneys.',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb01793?auto=format&fit=crop&q=80&w=300',
    prepTimeMinutes: 5
  },
  {
    id: 'p3',
    name: 'Pani Puri',
    price: 60,
    category: 'Snacks',
    description: 'Hollow puris filled with spicy water and mash.',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb01793?auto=format&fit=crop&q=80&w=300',
    prepTimeMinutes: 3
  },
  {
    id: 'p4',
    name: 'Pav Bhaji',
    price: 120,
    category: 'Mains',
    description: 'Mashed vegetable curry served with buttered bread.',
    image: 'https://images.unsplash.com/photo-1626132646529-500637534070?auto=format&fit=crop&q=80&w=300',
    prepTimeMinutes: 12
  },
  {
    id: 'p5',
    name: 'Chole Bhature',
    price: 150,
    category: 'Mains',
    description: 'Spicy chickpeas served with fried fluffy bread.',
    image: 'https://images.unsplash.com/photo-1596797038558-b8393241ef0a?auto=format&fit=crop&q=80&w=300',
    prepTimeMinutes: 15
  },
  {
    id: 'p6',
    name: 'Bhel Puri',
    price: 50,
    category: 'Snacks',
    description: 'Puffed rice mix with tangly tamarind sauce.',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb01793?auto=format&fit=crop&q=80&w=300',
    prepTimeMinutes: 4
  },
  {
    id: 'p7',
    name: 'Masala Dosa',
    price: 90,
    category: 'Mains',
    description: 'Crispy rice crepe filled with spiced potato.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=300',
    prepTimeMinutes: 10
  },
  {
    id: 'p8',
    name: 'Momos',
    price: 80,
    category: 'Snacks',
    description: 'Steamed dumplings served with spicy red chutney.',
    image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&q=80&w=300',
    prepTimeMinutes: 8
  },
  {
    id: 'p9',
    name: 'Cutting Chai',
    price: 20,
    category: 'Drinks',
    description: 'Strong ginger cardamom tea.',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc458695d7?auto=format&fit=crop&q=80&w=300',
    prepTimeMinutes: 2
  },
  {
    id: 'p10',
    name: 'Mango Lassi',
    price: 70,
    category: 'Drinks',
    description: 'Thick yogurt drink with mango pulp.',
    image: 'https://images.unsplash.com/photo-1546173159-315724a9d86a?auto=format&fit=crop&q=80&w=300',
    prepTimeMinutes: 3
  },
  {
    id: 'p11',
    name: 'Jalebi',
    price: 50,
    category: 'Desserts',
    description: 'Sweet pretzel-shaped deep-fried batter in syrup.',
    image: 'https://images.unsplash.com/photo-1589113103503-49673cbbbd63?auto=format&fit=crop&q=80&w=300',
    prepTimeMinutes: 10
  },
  {
    id: 'p12',
    name: 'Gulab Jamun',
    price: 40,
    category: 'Desserts',
    description: 'Fried milk solids in rose-scented syrup.',
    image: 'https://images.unsplash.com/photo-1593708602431-77218225ce81?auto=format&fit=crop&q=80&w=300',
    prepTimeMinutes: 3
  }
];

export const STREET_STALL_MENU: MenuItem[] = [
  {
    id: 'm1',
    name: 'Vada Pav',
    price: 40,
    category: 'Snacks',
    description: 'The iconic Mumbai burger with spicy chutney.',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=200',
    prepTimeMinutes: 5
  },
  {
    id: 'm2',
    name: 'Pani Puri',
    price: 60,
    category: 'Snacks',
    description: 'Crispy hollow puris with tangy herb water.',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb01793?auto=format&fit=crop&q=80&w=200',
    prepTimeMinutes: 3
  },
  {
    id: 'm3',
    name: 'Cutting Chai',
    price: 20,
    category: 'Drinks',
    description: 'Strong ginger and cardamom spiced milk tea.',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc458695d7?auto=format&fit=crop&q=80&w=200',
    prepTimeMinutes: 2
  }
];
