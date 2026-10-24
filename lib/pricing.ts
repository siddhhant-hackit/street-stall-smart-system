export const pricingTiers = [
  {
    id: 'starter',
    name: 'Starter',
    price: 1499,
    description: 'For single-location restaurant operations',
    features: ['Orders & reservations', 'Customer records', 'Basic menu management', 'Monthly reporting'],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 3999,
    description: 'For growing multi-service restaurants',
    features: ['Everything in Starter', 'Marketing campaign tools', 'Guest insights dashboard', 'Priority support'],
    popular: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 8999,
    description: 'For premium dining and multi-location operations',
    features: ['Everything in Growth', 'Advanced analytics', 'Multi-location access', 'Dedicated onboarding'],
  },
];
