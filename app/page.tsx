import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#fffaf2', color: '#111827' }}>
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 20px 60px' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '12px 0 26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, display: 'grid', placeItems: 'center', background: '#facc15', fontWeight: 800, color: '#111827' }}>SS</div>
            <div>
              <strong style={{ display: 'block', fontSize: '1.1rem' }}>Street Stall Smart System</strong>
              <small style={{ color: '#6b7280' }}>Restaurant operations showcase</small>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/todo" style={{ textDecoration: 'none', color: '#111827', background: '#f3f4f6', padding: '10px 14px', borderRadius: 10, fontWeight: 600 }}>To-do app</Link>
            <Link href="/dashboard" style={{ textDecoration: 'none', color: '#fff', background: '#111827', padding: '10px 14px', borderRadius: 10, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Open app <ArrowRight size={16} />
            </Link>
          </div>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 28, alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-block', background: '#fef3c7', color: '#b45309', padding: '8px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Portfolio project
            </span>
            <h1 style={{ fontSize: 'clamp(2.6rem, 5vw, 4.6rem)', lineHeight: 1.05, margin: '20px 0 18px' }}>
              Smart restaurant operations, made visible.
            </h1>
            <p style={{ fontSize: '1.08rem', lineHeight: 1.7, color: '#374151', maxWidth: 620 }}>
              This project showcases a customer-facing restaurant dashboard with live kitchen tracking, booking visibility, menu management, and product-style insights built for portfolio presentation.
            </p>

            <div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
              <Link href="/dashboard" style={{ textDecoration: 'none', background: '#111827', color: '#fff', padding: '14px 20px', borderRadius: 12, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Open dashboard <ArrowRight size={16} />
              </Link>
              <Link href="/pricing" style={{ textDecoration: 'none', background: '#f3f4f6', color: '#111827', padding: '14px 20px', borderRadius: 12, fontWeight: 700 }}>
                Pricing demo
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(100px, 1fr))', gap: 16, marginTop: 30 }}>
              <div style={{ background: '#ffffff', borderRadius: 18, padding: '18px 16px', border: '1px solid #f3f4f6' }}>
                <strong style={{ display: 'block', fontSize: '1.5rem' }}>24/7</strong>
                <span style={{ color: '#6b7280', fontSize: 13 }}>overview</span>
              </div>
              <div style={{ background: '#ffffff', borderRadius: 18, padding: '18px 16px', border: '1px solid #f3f4f6' }}>
                <strong style={{ display: 'block', fontSize: '1.5rem' }}>14+</strong>
                <span style={{ color: '#6b7280', fontSize: 13 }}>modules</span>
              </div>
              <div style={{ background: '#ffffff', borderRadius: 18, padding: '18px 16px', border: '1px solid #f3f4f6' }}>
                <strong style={{ display: 'block', fontSize: '1.5rem' }}>100%</strong>
                <span style={{ color: '#6b7280', fontSize: 13 }}>showcase</span>
              </div>
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: 28, padding: 24, border: '1px solid #f3f4f6', boxShadow: '0 30px 60px rgba(15, 23, 42, 0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ color: '#6b7280', fontWeight: 600 }}>Live performance</span>
              <span style={{ background: '#dcfce7', color: '#166534', padding: '6px 10px', borderRadius: 999, fontWeight: 700, fontSize: 12 }}>+18.2%</span>
            </div>
            <div style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: 20 }}>₹84,260</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(110px, 1fr))', gap: 16 }}>
              <div style={{ background: '#f9fafb', borderRadius: 14, padding: 14 }}>
                <small style={{ color: '#6b7280', display: 'block' }}>Bookings</small>
                <strong style={{ fontSize: '1.5rem' }}>148</strong>
              </div>
              <div style={{ background: '#f9fafb', borderRadius: 14, padding: 14 }}>
                <small style={{ color: '#6b7280', display: 'block' }}>Orders</small>
                <strong style={{ fontSize: '1.5rem' }}>63</strong>
              </div>
              <div style={{ background: '#f9fafb', borderRadius: 14, padding: 14 }}>
                <small style={{ color: '#6b7280', display: 'block' }}>VIP guests</small>
                <strong style={{ fontSize: '1.5rem' }}>22</strong>
              </div>
              <div style={{ background: '#f9fafb', borderRadius: 14, padding: 14 }}>
                <small style={{ color: '#6b7280', display: 'block' }}>Avg value</small>
                <strong style={{ fontSize: '1.5rem' }}>₹1,320</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
