import Link from 'next/link';
import { ArrowRight, BarChart3, ShieldCheck, Sparkles, Store, TrendingUp } from 'lucide-react';

const features = [
  { icon: Store, title: 'Restaurant operations', text: 'Track orders, reservations, staff workflow, and guest engagement in one place.' },
  { icon: BarChart3, title: 'Revenue analytics', text: 'Measure order value, repeat visits, and high-value guest patterns.' },
  { icon: Sparkles, title: 'Campaign engine', text: 'Create festival promos, WhatsApp offers, and loyalty campaigns in minutes.' },
  { icon: ShieldCheck, title: 'Secure & scalable', text: 'Built with a SaaS-ready architecture for auth, billing, and multi-tenant access.' },
];

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
            <Link href="/dashboard" className="secondary-btn">Dashboard</Link>
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
              <Link href="/dashboard" className="secondary-btn">View demo</Link>
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
          {features.map(({ icon: Icon, title, text }) => (
            <article key={title} className="feature-card">
              <div className="feature-icon"><Icon size={18} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bottom-banner">
        <div>
          <span className="eyebrow">Launch-ready stack</span>
          <h3>Next.js + Supabase + Stripe + Vercel</h3>
        </div>
        <Link href="/dashboard" className="primary-btn">Go to dashboard</Link>
      </section>
    </main>
  );
}
