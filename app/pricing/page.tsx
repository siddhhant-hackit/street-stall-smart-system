const plans = [
  {
    name: 'Starter',
    price: '₹1,999',
    description: 'Perfect for small restaurant teams.',
    features: ['Dashboard overview', 'Reservation tracking', 'Menu updates', 'Campaign basics'],
  },
  {
    name: 'Growth',
    price: '₹4,499',
    description: 'Built for busy operations and multi-location teams.',
    features: ['Everything in Starter', 'Live kitchen board', 'Customer insights', 'AI-style reporting'],
    popular: true,
  },
  {
    name: 'Scale',
    price: '₹8,999',
    description: 'For high-volume hospitality businesses.',
    features: ['Everything in Growth', 'Advanced operations views', 'Custom workflows', 'Priority support'],
  },
];

export default function PricingPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#fffaf2', color: '#111827', padding: '60px 20px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ color: '#b45309', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: 12 }}>Pricing</p>
          <h1 style={{ fontSize: '2.5rem', margin: '8px 0' }}>Simple plans for restaurant teams</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {plans.map((plan) => (
            <article
              key={plan.name}
              style={{
                background: 'white',
                borderRadius: 20,
                padding: 24,
                border: plan.popular ? '2px solid #f59e0b' : '1px solid #e5e7eb',
                boxShadow: '0 10px 28px rgba(0,0,0,0.04)',
              }}
            >
              <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{plan.name}</h2>
              <div style={{ margin: '18px 0', fontSize: '2rem', fontWeight: 800 }}>{plan.price}<small style={{ fontSize: 14, fontWeight: 500 }}> / month</small></div>
              <p style={{ color: '#4b5563', minHeight: 48 }}>{plan.description}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '18px 0 0', display: 'grid', gap: 10 }}>
                {plan.features.map((feature) => (
                  <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#374151' }}>• {feature}</li>
                ))}
              </ul>
              <button
                style={{
                  width: '100%',
                  marginTop: 24,
                  border: 'none',
                  borderRadius: 12,
                  padding: '12px 18px',
                  background: plan.popular ? '#f59e0b' : '#111827',
                  color: 'white',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {plan.popular ? 'Most popular' : 'Choose plan'}
              </button>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
