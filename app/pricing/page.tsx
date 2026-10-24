"use client";

import { pricingTiers } from '@/lib/pricing';

export default function PricingPage() {
  const handleCheckout = async (priceId: string, restaurantName: string) => {
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId, restaurantName }),
    });

    const payload = await response.json();

    if (payload.url) {
      window.location.href = payload.url;
      return;
    }

    alert(payload.error || 'Something went wrong');
  };

  return (
    <main className="page-shell pricing-page">
      <section className="section-heading">
        <span className="eyebrow">Pricing</span>
        <h2>Choose a plan for your restaurant</h2>
      </section>

      <div className="pricing-grid">
        {pricingTiers.map((tier) => (
          <article key={tier.id} className={tier.popular ? 'pricing-card popular' : 'pricing-card'}>
            <div className="plan-header">
              <h3>{tier.name}</h3>
              {tier.popular ? <span className="badge success">Popular</span> : null}
            </div>
            <div className="plan-price">₹{tier.price.toLocaleString()}<small>/month</small></div>
            <p>{tier.description}</p>
            <ul>
              {tier.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button
              className={tier.popular ? 'primary-btn full' : 'secondary-btn full'}
              onClick={() => handleCheckout(tier.id, 'MasalaCraft')}
            >
              {tier.popular ? 'Start free trial' : 'Choose plan'}
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}
