import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <nav className="topbar">
          <div className="brand">
            <div className="brand-mark">RS</div>
            <div>
              <strong>RestaurantOS</strong>
              <small>Hospitality SaaS</small>
            </div>
          </div>
          <div className="nav-actions">
            <Link href="/todo" className="secondary-btn">To-do app</Link>
            <Link href="/dashboard" className="primary-btn">Get started <ArrowRight size={16} /></Link>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Built for modern restaurant operators</span>
            <h1>Manage your restaurant like a real SaaS product.</h1>
            <p>
              Turn your restaurant CRM into a secure, deployable, and sellable product with live kitchen tracking,
              reservation workflows, marketing tools, and customer intelligence.
            </p>
            <div className="cta-row">
              <Link href="/dashboard" className="primary-btn">Open app <ArrowRight size={16} /></Link>
              <Link href="/todo" className="secondary-btn">Open to-do list</Link>
            </div>
            <div className="mini-stats">
              <div>
                <strong>₹42.8k</strong>
                <span>avg monthly uplift</span>
              </div>
              <div>
                <strong>4.8x</strong>
                <span>campaign conversion lift</span>
              </div>
              <div>
                <strong>2.3x</strong>
                <span>faster guest follow-up</span>
              </div>
            </div>
          </div>

          <div className="hero-panel">
            <div className="panel-card">
              <div className="panel-header">
                <span>Live revenue snapshot</span>
                <span className="badge success">+18.2%</span>
              </div>
              <div className="revenue-number">₹84,260</div>
              <div className="sparkline" aria-hidden="true">
                <span></span><span></span><span></span><span></span><span></span><span></span>
              </div>
              <div className="panel-grid">
                <div>
                  <small>Bookings</small>
                  <strong>148</strong>
                </div>
                <div>
                  <small>Orders</small>
                  <strong>63</strong>
                </div>
                <div>
                  <small>VIP guests</small>
                  <strong>22</strong>
                </div>
                <div>
                  <small>Avg value</small>
                  <strong>₹1,320</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-section">
        <div className="section-heading">
          <span className="eyebrow">SaaS-ready capability</span>
          <h2>Everything your restaurant team needs to run profitably</h2>
        </div>
        <div className="feature-grid">
          {[{ title: 'Restaurant operations', text: 'Track orders, reservations, staff workflow, and guest engagement in one place.' }, { title: 'Revenue analytics', text: 'Measure order value, repeat visits, and high-value guest patterns.' }, { title: 'Campaign engine', text: 'Create festival promos, WhatsApp offers, and loyalty campaigns in minutes.' }, { title: 'Secure & scalable', text: 'Built with a SaaS-ready architecture for auth, billing, and multi-tenant access.' }].map((feature) => (
            <article key={feature.title} className="feature-card">
              <div className="feature-icon">✦</div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bottom-banner">
        <div>
          <span className="eyebrow">Launch-ready stack</span>
          <h3>Next.js + Supabase + Stripe + Vercel</h3>
        </div>
        <Link href="/todo" className="primary-btn">Try to-do app</Link>
      </section>
    </main>
  );
}
